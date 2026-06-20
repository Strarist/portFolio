import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-6">
      <h1 className="text-4xl font-bold">404 — Not Found</h1>
      <p className="mt-4 text-zinc-400 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e8390d] text-white text-sm font-semibold hover:shadow-[0_4px_20px_rgba(232,57,13,0.4)] transition-shadow"
      >
        Back to Portfolio
      </Link>
    </div>
  );
}
