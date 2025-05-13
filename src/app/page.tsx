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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

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

  // Helper to extract promotion blocks from markdown
  function extractPromotions(md: string) {
    // Split by --- (horizontal rule)
    const blocks = md.split(/\n---+\n/);
    // Promotion blocks are those that start with an image and have bold text
    return blocks
      .map((block) => {
        const imgMatch = block.match(/!\[[^\]]*\]\(([^)]+)\)/);
        const boldMatch = block.match(/\*\*([^*]+)\*\*/);
        if (imgMatch && boldMatch) {
          return {
            image: imgMatch[1],
            text: boldMatch[1],
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  const promotions = extractPromotions(content) as {
    image: string;
    text: string;
  }[];
  // Remove promotion blocks from markdown for the rest of the content
  function removePromotions(md: string) {
    return md
      .split(/\n---+\n/)
      .filter(
        (block) =>
          !block.match(/!\[[^\]]*\]\(([^)]+)\)/) ||
          !block.match(/\*\*([^*]+)\*\*/)
      )
      .join("\n\n---\n\n");
  }
  const mainContent = promotions.length ? removePromotions(content) : content;

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
          {promotions.length > 0 && (
            <div className="mb-8">
              <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent>
                  {promotions.map((promo, idx) => (
                    <CarouselItem
                      key={idx}
                      className="flex flex-col items-center justify-center"
                    >
                      <Image
                        src={promo.image}
                        alt={promo.text}
                        width={600}
                        height={200}
                        className="rounded-lg w-full max-w-xl h-auto object-cover mb-4"
                      />
                      <div className="text-xl font-bold text-center">
                        {promo.text}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown>{mainContent}</ReactMarkdown>
          </article>
        </CardContent>
      </Card>
    </main>
  );
}
