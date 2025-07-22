import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { generateMetadata as generateMetadataUtil } from "@/lib/metadata";
import { generatePageStructuredData } from "@/lib/schema-generator";
import { BusinessLogoImage, PromotionImage } from "@/components/ui/image-seo";

type Frontmatter = {
  title?: string;
  description?: string;
  promo_1_image?: string;
  promo_1_text?: string;
  promo_2_image?: string;
  promo_2_text?: string;
  promo_3_image?: string;
  promo_3_text?: string;
  promotions?: { image: string; text: string }[];
  services?: { name: string; description: string; price: string }[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
  };
};

// Generate metadata for this page using our SEO utilities
export async function generateMetadata() {
  // Read markdown file to get frontmatter data
  const filePath = path.join(process.cwd(), "content/pages/home.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContent);
  const frontmatter = data as Frontmatter;

  // Use our metadata utility to generate complete metadata
  return generateMetadataUtil(frontmatter);
}

export default function Home() {
  // Read markdown at build time
  const filePath = path.join(process.cwd(), "content/pages/home.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);
  const frontmatter = data as Frontmatter;

  // Get promotions from frontmatter
  const promotions = frontmatter.promotions || [];

  // Get services from frontmatter
  const services = frontmatter.services || [];

  // Generate structured data for SEO
  const structuredData = generatePageStructuredData({
    includeLocalBusiness: true,
    includeWebsite: true,
  });

  return (
    <main className="parallax-bg min-h-screen flex items-center justify-center p-2 sm:p-6">
      <Card className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl bg-white/50 dark:bg-gray-900/50 shadow-lg backdrop-blur-md rounded-lg sm:rounded-xl mx-auto">
        <CardHeader>
          <TypographyH1 className="mb-2 text-center text-2xl sm:text-3xl md:text-4xl">
            {frontmatter.title || "Home"}
            <div className="flex justify-center">
              <BusinessLogoImage
                src="/pool/images/uploads/logo.jpg"
                width={150}
                height={100}
              />
            </div>
          </TypographyH1>
          {frontmatter.description && (
            <TypographyP className="mb-4 text-gray-600 dark:text-gray-300 text-center text-base sm:text-lg">
              {frontmatter.description}
            </TypographyP>
          )}
        </CardHeader>
        <Separator />
        <CardContent>
          {/* Promotions Carousel Section */}
          {promotions.length > 0 && (
            <section className="mb-8">
              <TypographyH1 className="text-xl sm:text-2xl mb-4 text-center">
                Promotions
              </TypographyH1>
              <Carousel className="w-full max-w-xs sm:max-w-lg md:max-w-2xl mx-auto">
                <CarouselContent>
                  {promotions.map((promo, idx) => (
                    <CarouselItem
                      key={idx}
                      className="flex flex-col items-center justify-center"
                    >
                      <PromotionImage
                        src={promo.image}
                        alt={promo.text}
                        width={350}
                        height={120}
                      />
                      <div className="text-lg sm:text-xl font-bold text-center">
                        {promo.text}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </section>
          )}

          {/* Services Section */}
          {services.length > 0 && (
            <section className="mb-8">
              <TypographyH1 className="text-xl sm:text-2xl mb-4 text-center">
                Nos services
              </TypographyH1>
              <div className="grid gap-4">
                {services.map((service, idx) => (
                  <Card key={idx} className="border shadow-sm">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                        <span className="font-bold text-base sm:text-lg">
                          {service.name}
                        </span>
                        <span className="text-primary font-semibold text-base sm:text-lg">
                          {service.price}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <TypographyP className="text-sm sm:text-base">
                        {service.description}
                      </TypographyP>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <article className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: (props) => (
                  <TypographyH1 {...props} className="mb-4 text-center" />
                ),
                h2: (props) => (
                  <TypographyH2 {...props} className="mb-3 text-center" />
                ),
                p: (props) => <TypographyP {...props} className="mb-2" />,
                ul: (props) => (
                  <ul {...props} className="list-disc pl-6 mb-2" />
                ),
                ol: (props) => (
                  <ol {...props} className="list-decimal pl-6 mb-2" />
                ),
                li: (props) => <li {...props} className="mb-1" />,
                a: (props) => (
                  <a {...props} className="text-primary underline" />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </CardContent>
      </Card>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
    </main>
  );
}
