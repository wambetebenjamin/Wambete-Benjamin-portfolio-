import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-hero-glow bg-grid-fade bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      <div className="relative text-center">
        <p className="font-heading text-[7rem] font-extrabold leading-none gradient-text sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 font-heading text-2xl font-bold text-white">
          This page wandered off the grid.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist — but my work,
          blog and inbox are one click away.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/blog" className="btn-outline">
            Read the Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
