import { auth } from "@clerk/nextjs/server";
import { getBookBySlug } from "@/lib/actions/book.actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mic, MicOff } from "lucide-react";
import { getVoice } from "@/lib/utils";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    return (await auth()).redirectToSignIn();
  }

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    redirect("/");
  }

  const book = result.data;
  const voiceName = getVoice(book.persona).name;

  return (
    <div className="book-page-container">
      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="size-6 text-[#212a3b]" />
      </Link>

      <div className="vapi-main-container">
        {/* Header Card */}
        <div className="vapi-header-card w-full">
          <div className="vapi-cover-wrapper">
            <Image
              src={book.coverURL || "/assets/book-cover.svg"}
              alt={book.title}
              width={162}
              height={240}
              className="vapi-cover-image"
              priority
            />
            <div className="vapi-mic-wrapper">
              <button className="vapi-mic-btn">
                <MicOff className="size-6 text-[#212a3b]" />
              </button>
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#212a3b]">
              {book.title}
            </h1>
            <p className="text-xl text-[#3d485e] mt-1">by {book.author}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {/* Status Indicator */}
              <div className="vapi-status-indicator">
                <span className="vapi-status-dot vapi-status-dot-ready" />
                <span className="vapi-status-text">Ready</span>
              </div>

              {/* Voice Badge */}
              <div className="vapi-badge-ai">
                <span className="vapi-badge-ai-text">Voice: {voiceName}</span>
              </div>

              {/* Timer Badge */}
              <div className="vapi-badge-ai">
                <span className="vapi-badge-ai-text">0:00/15:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transcript Area */}
        <div className="transcript-container mt-6">
          <div className="transcript-empty min-h-[400px]">
            <Mic className="size-12 text-gray-300 mb-4" />
            <p className="transcript-empty-text">No conversation yet</p>
            <p className="transcript-empty-hint">
              Click the mic button above to start talking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
