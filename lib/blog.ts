import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content/posts");

// A lightweight, dependency-free Markdown front-matter parser
function parseFrontMatter(fileContent: string): { data: Record<string, any>; content: string } {
  const data: Record<string, any> = {};
  let content = "";

  if (fileContent.startsWith("---")) {
    const parts = fileContent.split("---");
    if (parts.length >= 3) {
      const frontMatterText = parts[1];
      content = parts.slice(2).join("---").trim();

      const lines = frontMatterText.split("\n");
      for (const line of lines) {
        const colonIdx = line.indexOf(":");
        if (colonIdx !== -1) {
          const key = line.substring(0, colonIdx).trim();
          let valText = line.substring(colonIdx + 1).trim();

          // Strip surrounding quotes
          if (valText.startsWith('"') && valText.endsWith('"')) {
            valText = valText.substring(1, valText.length - 1);
          } else if (valText.startsWith("'") && valText.endsWith("'")) {
            valText = valText.substring(1, valText.length - 1);
          }

          // Parse tags array if it looks like ["a", "b"]
          if (valText.startsWith("[") && valText.endsWith("]")) {
            try {
              // Replace single quotes with double quotes for valid JSON
              const jsonStr = valText.replace(/'/g, '"');
              data[key] = JSON.parse(jsonStr);
            } catch {
              data[key] = valText
                .substring(1, valText.length - 1)
                .split(",")
                .map(s => s.trim().replace(/^["']|["']$/g, ""));
            }
          } else {
            data[key] = valText;
          }
        }
      }
    } else {
      content = fileContent;
    }
  } else {
    content = fileContent;
  }

  return { data, content };
}

export function getAllPosts(): BlogPost[] {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith(".md"))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = parseFrontMatter(fileContents);

      return {
        slug,
        title: data.title || "Untitled Post",
        date: data.date || "",
        summary: data.summary || "",
        tags: data.tags || [],
        content,
      };
    });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = parseFrontMatter(fileContents);

  return {
    slug,
    title: data.title || "Untitled Post",
    date: data.date || "",
    summary: data.summary || "",
    tags: data.tags || [],
    content,
  };
}
