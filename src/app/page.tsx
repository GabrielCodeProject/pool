"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";

type Frontmatter = {
  title?: string;
  description?: string;
};

export default function Home() {
  const [content, setContent] = useState("");
  const [frontmatter, setFrontmatter] = useState<Frontmatter>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/.netlify/functions/github-pages-read?slug=home")
      .then((res) => res.json())
      .then((data) => {
        if (!data.content) throw new Error("No content");
        const parsed = matter(data.content);
        setContent(parsed.content);
        setFrontmatter(parsed.data as Frontmatter);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load homepage content.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{frontmatter.title || "Home"}</h1>
      {frontmatter.description && (
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
          {frontmatter.description}
        </p>
      )}
      <article className="prose prose-lg dark:prose-invert">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </main>
  );
}
