import Link from 'next/link';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { jetbrainsMono } from '@/app/font';
import type { BlogPost } from '@/lib/blog';

function formatDate(date: string) {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return date;
  }
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 225))} min read`;
}

export function BlogPostCard({ post }: { post: BlogPost }) {
  const rt = readingTime(post.content);

  return (
    <article className="group relative">
      <Link
        href={`/blog/${post.slug}`}
        className="block py-8 border-b border-white/[0.06] transition-colors hover:border-white/10"
      >
        <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 mb-3 ${jetbrainsMono.className}`}>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3" /> {rt}
          </span>
          <span className="text-zinc-700">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3 w-3" /> {formatDate(post.date)}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 group-hover:text-[#e8390d] transition-colors pr-8">
          {post.title}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed line-clamp-2">
          {post.summary}
        </p>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/8 text-zinc-500 ${jetbrainsMono.className}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <ArrowUpRight className="absolute top-8 right-0 h-4 w-4 text-zinc-600 group-hover:text-[#e8390d] transition-colors" />
      </Link>
    </article>
  );
}

export { formatDate, readingTime };
