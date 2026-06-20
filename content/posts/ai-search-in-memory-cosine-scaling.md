---
title: "Why In-Memory Cosine Similarity Fails at Scale (and How to Fix It)"
date: "2026-06-18"
summary: "An in-depth analysis of in-memory vector calculations for semantic search. Learn how V8 memory heap limits break calculations at 1,000,000 files, and how to scale dynamically using scoped MongoDB filtering."
tags: ["AI", "Vector Search", "System Design", "Node.js", "MongoDB"]
---

When building AI-powered features, developers often choose in-memory arrays to calculate vector embeddings similarity. This approach works beautifully for small-scale prototypes, but quickly collapses under production volumes. 

Let's dissect the numbers and constraints behind scaling in-memory cosine similarity and explore the architectural optimizations needed to solve it.

---

### The Mathematical Formula

Cosine similarity calculates the cosine of the angle between two multi-dimensional vectors. Given query vector $A$ and document vector $B$, it is calculated as:

$$\text{Similarity}(A, B) = \frac{A \cdot B}{\|A\| \|B\|} = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A_i^2} \sqrt{\sum_{i=1}^{n} B_i^2}}$$

In Node.js, we compute this as:

```javascript
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
```

---

### The Bottleneck: V8 Heap Limits and Memory Footprint

Most modern embedding models (such as OpenAI's `text-embedding-3-small` or standard HuggingFace sentence-transformers) generate vectors with **1,536 dimensions**.

In Javascript, a single Float32 number consumes **4 bytes** of memory.

* **1 Vector Memory Size**: $1536 \times 4 \text{ bytes} = 6,144 \text{ bytes}$ (~6 KB).
* **100,000 Files**: $100,000 \times 6 \text{ KB} = 600,000 \text{ KB}$ (~600 MB).
* **1,000,000 Files**: $1,000,000 \times 6 \text{ KB} = 6,000,000 \text{ KB}$ (~6.0 GB).

The default Node.js V8 memory heap limit is typically set to **1.5 GB**. When storing 1,000,000 vectors in-memory, the engine will crash with an `Out of Memory (OOM)` error.

Additionally, performing a linear loop search on 1M files requires $1.536 \text{ billion}$ operations. This completely blocks the Node.js single-threaded event loop, spiking search response times to over 5 seconds.

---

### The Architecture Fix: Scoped Database Filtering

Rather than pulling all embeddings into a flat in-memory array to perform global similarity checks, we must enforce **hierarchical namespace scoping** directly at the database queries layer.

In multi-tenant file management systems like **CloudVault**, files are isolated inside specific Workspaces. Since users only search within one Workspace at any given time, we can query only the files associated with the active `workspaceId` first:

```javascript
// Step 1: Restrict search space at the MongoDB layer
const activeWorkspaceFiles = await File.find({
  workspaceId: activeWorkspaceId,
  deletedAt: null
});

// Step 2: Extract active version IDs and load corresponding AIResult embeddings
const fileVersionIds = activeWorkspaceFiles.map(f => f.currentVersionId);
const embeddingsList = await AIResult.find({
  fileVersionId: { $in: fileVersionIds }
});

// Step 3: Run Cosine Similarity ONLY on the filtered subset
const searchResults = embeddingsList.map(item => {
  const score = cosineSimilarity(queryEmbedding, item.embedding);
  return { fileVersionId: item.fileVersionId, score };
}).sort((a, b) => b.score - a.score);
```

### The Impact
If a workspace contains an average of $1,000$ files, the calculation footprint is reduced from $1,000,000$ items to just $1,000$. 
This slashes calculation overhead by **99.9%**, keeping search response times under **15ms** and memory consumption negligible.

---

### Summary
For prototypes and single-tenant applications, workspace-filtered in-memory calculations are highly efficient, avoiding the cost and operational overhead of dedicated vector databases (like Pinecone, pgvector, or Milvus). However, once global workspace scopes exceed 100,000 documents, migrating to an indexed database solution is essential to maintain responsive query pipelines.
