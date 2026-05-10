export default function Loading() {
  return (
    <main className="wrapper container min-h-screen bg-[#FAFAF8] pt-[74px]">
      <div className="mb-8 h-[400px] animate-pulse rounded-2xl bg-[#E8E8E4]" />
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-[#E8E8E4]" />
        <div className="library-books-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[300px] animate-pulse rounded-xl bg-[#E8E8E4]"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
