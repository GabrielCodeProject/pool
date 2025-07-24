import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { generateMetadata as generateMetadataUtil } from "@/lib/metadata";
import { generatePageStructuredData } from "@/lib/schema-generator";
import { BusinessLogoImage } from "@/components/ui/image-seo";
import { PromotionsSection } from "@/components/ui/promotions-section";
import { ServicesSection } from "@/components/ui/services-section";
import { ContentSection } from "@/components/ui/content-section";

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

// Utility function to read and parse home page content
function getHomePageData() {
  const filePath = path.join(process.cwd(), "content/pages/home.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return matter(fileContent);
}

// Generate metadata for this page using our SEO utilities
export async function generateMetadata() {
  const { data } = getHomePageData();
  const frontmatter = data as Frontmatter;
  return generateMetadataUtil(frontmatter);
}


export default function Home() {
  // Read markdown at build time
  const { content, data } = getHomePageData();
  const frontmatter = data as Frontmatter;

  // Get promotions and services from frontmatter
  const promotions = frontmatter.promotions || [];
  const services = frontmatter.services || [];

  // Generate structured data for SEO
  const structuredData = generatePageStructuredData({
    includeLocalBusiness: true,
    includeWebsite: true,
  });

  return (
    <>
      {/* Modern Pool-Inspired Background */}
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 dark:from-slate-900 dark:via-blue-950 dark:to-cyan-950">
        {/* Floating geometric elements for depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-blue-300/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-teal-200/20 to-cyan-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-200/15 to-teal-200/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>

        <main className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Main Container with Modern Glass Effect */}
          <div className="w-full max-w-6xl mx-auto">
            <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-2xl shadow-cyan-500/10 dark:shadow-cyan-400/5">
              {/* Hero Section */}
              <CardHeader className="text-center space-y-8 p-8 sm:p-12 lg:p-16 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-slate-800/50 rounded-t-xl">
                <div className="space-y-6">
                  {/* Logo with enhanced styling */}
                  <div className="flex justify-center mb-6">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                      <BusinessLogoImage
                        src="/pool/images/uploads/logo.jpg"
                        width={180}
                        height={120}
                        alt="Business logo"
                        className="relative rounded-xl shadow-xl border-2 border-white/50 dark:border-slate-700/50"
                      />
                    </div>
                  </div>
                  
                  {/* Title with gradient text */}
                  <TypographyH1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 dark:from-cyan-400 dark:via-blue-400 dark:to-teal-400 bg-clip-text text-transparent leading-tight">
                    {frontmatter.title || "Home"}
                  </TypographyH1>
                </div>
                
                {frontmatter.description && (
                  <TypographyP className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto font-light">
                    {frontmatter.description}
                  </TypographyP>
                )}
              </CardHeader>
              
              {/* Content Sections with Enhanced Spacing */}
              <CardContent className="p-8 sm:p-12 lg:p-16 space-y-16">
                {/* Promotions with modern styling */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-2xl -m-4"></div>
                  <div className="relative">
                    <PromotionsSection promotions={promotions} />
                  </div>
                </div>

                {/* Services with enhanced container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-50/50 to-cyan-50/50 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-2xl -m-4"></div>
                  <div className="relative">
                    <ServicesSection services={services} />
                  </div>
                </div>

                {/* Content section with modern styling */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-teal-50/30 dark:from-blue-950/20 dark:to-teal-950/20 rounded-2xl -m-4"></div>
                  <div className="relative">
                    <ContentSection content={content} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Action Elements */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-4">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full animate-pulse delay-300"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-pulse delay-700"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
    </>
  );
}
