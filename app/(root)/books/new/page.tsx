import UploadForm from "@/components/UploadForm";
import React from "react";

const page = () => {
  return (
    <main className="wrapper container">
      <div className="new-book-wrapper">
        <section className="flex flex-col gap-5 text-center mb-8">
          <h1 className="page-title-xl">Add New Book</h1>
          <p className="subtitle">
            Upload a PDF to generate your interactive reading experience
          </p>
        </section>

        <UploadForm />
      </div>
    </main>
  );
};

export default page;
