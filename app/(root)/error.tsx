"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAF8]">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#212a3b]">Something went wrong</h2>
        <p className="mt-2 text-sm text-[#3d485e]">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={reset}
          className="mt-4 rounded-lg bg-[#212a3b] px-4 py-2 text-sm font-medium text-white hover:bg-[#3d485e]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
