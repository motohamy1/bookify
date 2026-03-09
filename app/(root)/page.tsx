import Hero from "@/components/Hero";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";



const Home = async () => {

  const bookResults = await getAllBooks();
  const books = bookResults.success ? bookResults.data ?? [] : []


  return (
    <main className="wrapper container min-h-screen bg-[#FAFAF8] pt-[74px]">
      <Hero />
      <div className="library-books-grid">
        {books.map((book) => (
          <BookCard key={book._id} title={book.title} author={book.author} 
          coverURL={book.coverURL} slug={book.slug} />
        ))}
      </div>
    </main>
  );
}

export default Home
