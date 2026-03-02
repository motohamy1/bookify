import Hero from "@/components/Hero";
import { sampleBooks } from "@/lib/constants";
import BookCard from "@/components/BookCard";

export default function Home() {
  return (
    <main className="wrapper container min-h-screen bg-[#FAFAF8] pt-[74px]">
      <Hero />
      <div className="library-books-grid">
        {sampleBooks.map((book) => (
          <BookCard key={book._id} title={book.title} author={book.author} 
          coverURL={book.coverURL} slug={book.slug} />
        ))}
      </div>
    </main>
  );
}
