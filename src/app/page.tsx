"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import { API_BASE } from "@/config/apiBase";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

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
    fetch(`${API_BASE}/github-pages-read?slug=home`)
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

  if (loading)
    return (
      <main className="max-w-3xl mx-auto p-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-10 w-1/2 mb-2" />
            <Skeleton className="h-6 w-2/3 mb-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-5/6 mb-2" />
            <Skeleton className="h-6 w-4/6 mb-2" />
            <Skeleton className="h-6 w-3/6" />
          </CardContent>
        </Card>
      </main>
    );
  if (error)
    return (
      <main className="max-w-3xl mx-auto p-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </main>
    );

  return (
    <main className="max-w-3xl mx-auto p-8">
      <Card>
        <CardHeader>
          <TypographyH1 className="mb-2">
            {frontmatter.title || "Home"}
          </TypographyH1>
          {frontmatter.description && (
            <TypographyP className="mb-4 text-gray-600 dark:text-gray-300">
              {frontmatter.description}
            </TypographyP>
          )}
        </CardHeader>
        <Separator />
        <CardContent>
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        </CardContent>
      </Card>
    </main>
  );
}
