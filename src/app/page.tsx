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
  promo_1_image?: string;
  promo_1_text?: string;
  promo_2_image?: string;
  promo_2_text?: string;
  promo_3_image?: string;
  promo_3_text?: string;
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
        console.log("frontmatter", parsed.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load homepage content.");
        setLoading(false);
      });
  }, []);

  // Build promos array from frontmatter
  const promos = [
    {
      image: frontmatter.promo_1_image,
      text: frontmatter.promo_1_text,
    },
    {
      image: frontmatter.promo_2_image,
      text: frontmatter.promo_2_text,
    },
    {
      image: frontmatter.promo_3_image,
      text: frontmatter.promo_3_text,
    },
  ].filter((p) => p.image && p.text);
  console.log(promos);
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
          {promos.length > 0 && (
            <div className="mb-8">
              <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent>
                  {promos.map((promo, idx) => (
                    <CarouselItem
                      key={idx}
                      className="flex flex-col items-center justify-center"
                    >
                      <Image
                        src={promo.image as string}
                        alt={promo.text as string}
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
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        </CardContent>
      </Card>
    </main>
  );
}
