import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical articles on software engineering, AI systems, and cloud-native development.",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen text-foreground relative z-10 bg-transparent">
      <BlogHero
        variant="list"
        title="From the desk"
        summary="Thoughts, post-mortems, and engineering breakdowns from building AI-powered and cloud-native products."
      />

      <div className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#e8390d] transition-colors group mb-10"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to portfolio
        </Link>

        {posts.length === 0 ? (
          <p className="text-zinc-500 py-12">No articles yet.</p>
        ) : (
          <div>
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
