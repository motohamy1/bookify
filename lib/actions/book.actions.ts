"use server";
import { connectToDatabase } from "@/database/mongoose";
import { CreateBook, TextSegment } from "@/types";
import { generateSlug, serializeData } from "../utils";
import { Book } from "@/database/models/book.model";
import { BookSegment } from "@/database/models/book-segment.model";

export const getAllBooks = async () => {
  try {
    await connectToDatabase();

    const books = await Book.find().sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: serializeData(books),
    }
  } catch (e) {
    console.error("Error fetching books", e);
    return {
      success: false,
      error: e,
    };
  }
};

export const checkBookExists = async (title: string) => {
  try {
    await connectToDatabase();

    const slug = generateSlug(title);

    const existingBook = await Book.findOne({ slug }).lean();

    if (existingBook) {
      return {
        exists: true,
        book: serializeData(existingBook),
      };
    }
  } catch (e) {
    console.error("Error checking book exists", e);
    return {
      exists: false,
    };
  }
};

export const getBookBySlug = async (slug: string) => {
  try {
    await connectToDatabase();

    const book = await Book.findOne({ slug }).lean();

    if (!book) {
      return {
        success: false,
        error: "Book not found",
      };
    }

    return {
      success: true,
      data: serializeData(book),
    };
  } catch (e) {
    console.error("Error fetching book by slug", e);
    return {
      success: false,
      error: e,
    };
  }
};

export const createBook = async (data: CreateBook) => {
  try {
    await connectToDatabase();

    const slug = generateSlug(data.title);

    const existingBook = await Book.findOne({ slug }).lean();

    if (existingBook) {
      return {
        success: true,
        data: serializeData(existingBook),
        alreadyExists: true,
      };
    }

    const newBook = await Book.create({
      clerkId: data.clerkId,
      title: data.title,
      author: data.author,
      persona: data.persona,
      fileURL: data.fileURL,
      fileBlobKey: data.fileBlobKey,
      coverURL: data.coverURL,
      coverBlobKey: data.coverBlobKey,
      fileSize: data.fileSize,
      totalSegments: 0,
      slug,
    });

    return {
      success: true,
      data: serializeData(newBook),
      alreadyExists: false,
    };
  } catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      error: "Failed to create book",
    };
  }
};
export const saveBookSegments = async (
  bookId: string,
  clerkId: string,
  segments: TextSegment[],
) => {
  try {
    await connectToDatabase();

    const segmentsToInsert = segments.map(
      ({ text, segmentIndex, pageNumber, wordCount }) => ({
        clerkId,
        bookId,
        content: text,
        segmentIndex,
        pageNumber,
        wordCount,
      }),
    );

    await BookSegment.insertMany(segmentsToInsert);

    await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });

    console.log("Book segments saved successfully.");
    return {
      success: true,
      data: { segmentsCreated: segments.length },
    };
  } catch (e) {
    console.error("Error saving book segments", e);
    return {
      success: false,
      error: e,
    };
  }
};
