import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCopyUrl } from "@/components/blog/BlogCopyUrl";
import { formatDate, readingTime } from "@/components/blog/BlogPostCard";
import { ArrowLeft, Clock } from "lucide-react";
import { jetbrainsMono } from "@/app/font";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const rt = readingTime(post.content);

  return (
    <div className="min-h-screen text-foreground relative z-10 bg-transparent">
      <BlogHero title={post.title} summary={post.summary} />

      {/* Metadata bar */}
      <div className={`border-b border-white/[0.06] bg-black/20 ${jetbrainsMono.className}`}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {rt}
            </span>
            <BlogCopyUrl />
          </div>
          <span>Updated {formatDate(post.date)}</span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#e8390d] transition-colors group mb-10"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to articles
        </Link>

        {post.tags.length > 0 && (
          <div className={`flex flex-wrap gap-2 mb-10 ${jetbrainsMono.className}`}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/8 text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <MarkdownRenderer content={post.content} variant="blog" />

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row gap-4 items-center sm:items-start text-sm text-zinc-400">
          <div className="h-11 w-11 rounded-full bg-[#e8390d]/10 flex items-center justify-center text-[#e8390d] font-bold border border-[#e8390d]/20 shrink-0">
            AG
          </div>
          <div className="text-center sm:text-left space-y-1">
            <p className="font-semibold text-zinc-200">Aditya Gupta</p>
            <p>Software engineer building AI-powered and cloud-native applications with React, FastAPI, PostgreSQL, and AWS.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
