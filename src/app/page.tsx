import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
  // Read markdown at build time
  const filePath = path.join(process.cwd(), "content/pages/home.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);
  const frontmatter = data as Frontmatter;

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
                        className="rounded-lg w-full max-w-xl h-auto object-contain mb-4"
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
