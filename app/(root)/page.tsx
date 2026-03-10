import Hero from "@/components/Hero";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";
import Search from "@/components/Search";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const params = await searchParams;
  const searchQuery = typeof params.search === "string" ? params.search : undefined;

  const bookResults = await getAllBooks(searchQuery);
  const books = bookResults.success ? bookResults.data ?? [] : [];

  return (
    <main className="wrapper container min-h-screen bg-[#FAFAF8] pt-[74px]">
      <Hero />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="section-title">Recent Books</h2>
          <Search />
        </div>

        {books.length > 0 ? (
          <div className="library-books-grid">
            {books.map((book) => (
              <BookCard
                key={book._id}
                title={book.title}
                author={book.author}
                coverURL={book.coverURL}
                slug={book.slug}
              />
            ))}
          </div>
        ) : (
          <div className="library-empty-card text-center py-20">
            <p className="text-xl font-medium text-[var(--text-secondary)]">
              No books found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
