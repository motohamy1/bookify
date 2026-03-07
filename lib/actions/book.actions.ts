"use server";
import { connectToDatabase } from "@/database/mongoose";
import { CreateBook, TextSegment } from "@/types";
import { generateSlug, serializeData } from "../utils";
import { Book } from "@/database/models/book.model";
import { success } from "zod";
import { BookSegment } from "@/database/models/book-segment.model";

export const checkBookExists = async (title: string) => {
    try {
        await connectToDatabase();

        const slug = generateSlug(title);

        const existingBook = await Book.findOne({ slug }).lean();

        if (existingBook) {
            return {
                exists: true,
                book: serializeData(existingBook)
            }
        }
    } catch (e) {
        console.error('Error checking book exists', e)
        return {
            exists: false,
        }
    }
}
export const createBook = async (data: CreateBook) => {
  try {
    await connectToDatabase();

    const slug = generateSlug(data.title);

    const existingBook = await Book.findOne({ slug }).lean();

    if (existingBook) {
      return {
        success: true,
        data: serializeData(existingBook),
        alreadyExist: true,
      };
    }
  } catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      message: "Failed to create book",
    };
  }
};

export const saveBookSegement = async (
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
