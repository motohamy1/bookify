import { BookCardProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
  return (
    <Link href={`/books/${slug}`} className="group">
      <article className="book-card">
        <div className="book-card-3d">
          <div className="book-card-cover-wrapper">
            <Image
              src={coverURL}
              alt={title}
              width={200}
              height={300}
              className="book-card-cover"
              priority
            />
          </div>
        </div>
        <div className="book-card-meta">
          <h3 className="book-card-title">{title}</h3>
          <p className="book-card-author">{author}</p>
        </div>
      </article>
    </Link>
  );
};

export default BookCard