import React from "react";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";

async function fetchHomeContent() {
  // This fetches from the local API, which proxies to GitHub in production
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_PATH || ""
    }/.netlify/functions/github-pages-read?slug=home`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to load home content");
  const data = await res.json();
  return data.content;
}

type Frontmatter = {
  title?: string;
  description?: string;
};

export default async function Home() {
  let content = "";
  let frontmatter: Frontmatter = {};
  try {
    const raw = await fetchHomeContent();
    const parsed = matter(raw);
    content = parsed.content;
    frontmatter = parsed.data as Frontmatter;
  } catch {
    return (
      <div className="p-8 text-red-600">Failed to load homepage content.</div>
    );
  }

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
