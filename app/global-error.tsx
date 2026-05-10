"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-[#FAFAF8]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#212a3b]">Application Error</h1>
            <p className="mt-2 text-sm text-[#3d485e]">
              {error.message || "A critical error occurred. Please refresh the page."}
            </p>
            <button
              onClick={reset}
              className="mt-4 rounded-lg bg-[#212a3b] px-4 py-2 text-sm font-medium text-white hover:bg-[#3d485e]"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
