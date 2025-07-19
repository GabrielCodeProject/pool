import { Metadata } from "next";
import {
  BUSINESS_INFO,
  getBusinessName,
  getBusinessDescription,
  getServiceArea,
  getBusinessKeywords,
} from "./business-data";

// Types for page data coming from CMS
interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

interface PageData {
  title?: string;
  description?: string;
  seo?: SEOData;
  [key: string]: unknown;
}

/**
 * Generate SEO-optimized page title
 * Pattern: [Page Content Title] | Piscine Azur - Pool Maintenance Montreal
 */
export function generatePageTitle(pageData: PageData): string {
  const businessName = getBusinessName();
  const serviceArea = getServiceArea();

  // Use SEO title override first, then page title, then default pattern
  const contentTitle = pageData.seo?.title || pageData.title;

  if (contentTitle) {
    return `${contentTitle} | ${businessName}`;
  }

  // Default pattern for pages without specific titles
  return `${businessName} - Pool Maintenance & Cleaning Services in ${serviceArea}`;
}

/**
 * Generate SEO-optimized meta description (max 155 characters)
 */
export function generateMetaDescription(pageData: PageData): string {
  const businessDescription = getBusinessDescription();
  const serviceArea = getServiceArea();

  // Use SEO description override first, then page description, then smart default
  const seoDescription = pageData.seo?.description;
  if (seoDescription) {
    return truncateDescription(seoDescription, 155);
  }

  const pageDescription = pageData.description;
  if (pageDescription) {
    return truncateDescription(pageDescription, 155);
  }

  // Smart default based on business info
  const defaultDescription = `Professional pool maintenance in ${serviceArea}. ${
    businessDescription.split(".")[0]
  }. Contact us today!`;
  return truncateDescription(defaultDescription, 155);
}

/**
 * Generate location-specific keywords
 */
export function generateKeywords(pageData: PageData): string {
  const baseKeywords = getBusinessKeywords();
  const customKeywords = pageData.seo?.keywords;

  if (customKeywords) {
    return `${customKeywords}, ${baseKeywords}`;
  }

  return baseKeywords;
}

/**
 * Generate social sharing image URL
 */
export function generateSocialImage(pageData: PageData): string {
  const baseUrl = BUSINESS_INFO.contact.website;
  const customImage = pageData.seo?.image;
  const defaultImage = BUSINESS_INFO.branding.primaryImage;

  const imagePath = customImage || defaultImage;
  return `${baseUrl}${imagePath}`;
}

/**
 * Generate complete metadata object for Next.js
 */
export function generateMetadata(pageData: PageData): Metadata {
  const title = generatePageTitle(pageData);
  const description = generateMetaDescription(pageData);
  const keywords = generateKeywords(pageData);
  const imageUrl = generateSocialImage(pageData);
  const canonicalUrl = BUSINESS_INFO.contact.website;

  return {
    title,
    description,
    keywords,

    // Open Graph for Facebook/LinkedIn
    openGraph: {
      title,
      description,
      type: "website",
      siteName: getBusinessName(),
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${getBusinessName()} - Pool Maintenance Services in ${getServiceArea()}`,
        },
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: `${getBusinessName()} - Pool Maintenance Services in ${getServiceArea()}`,
        },
      ],
      locale: "en_CA",
      countryName: "Canada",
      emails: [BUSINESS_INFO.contact.email],
      phoneNumbers: [BUSINESS_INFO.contact.phone],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@piscineazur", // Update with real Twitter handle if available
    },

    // Additional metadata
    alternates: {
      canonical: canonicalUrl,
    },

    // Robots and crawling directives
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // App metadata
    applicationName: getBusinessName(),

    // Language and locale
    other: {
      "og:locale": "en_CA",
      "og:region": "CA-QC",
      "og:street-address": BUSINESS_INFO.location.fullAddress,
      "og:locality": BUSINESS_INFO.location.city,
      "og:postal-code": BUSINESS_INFO.location.postalCode,
      "og:country-name": "Canada",
      "business:contact_data:street_address":
        BUSINESS_INFO.location.fullAddress,
      "business:contact_data:locality": BUSINESS_INFO.location.city,
      "business:contact_data:region": BUSINESS_INFO.location.province,
      "business:contact_data:postal_code": BUSINESS_INFO.location.postalCode,
      "business:contact_data:country_name": "Canada",
      "business:contact_data:email": BUSINESS_INFO.contact.email,
      "business:contact_data:phone_number": BUSINESS_INFO.contact.phone,
      "business:contact_data:website": BUSINESS_INFO.contact.website,
    },

    // Verification tags (to be added when available)
    verification: {
      // google: 'your-google-verification-code',
      // bing: 'your-bing-verification-code',
    },

    // App-specific metadata
    metadataBase: new URL(BUSINESS_INFO.contact.website),

    // Contact information for schema
    authors: [{ name: getBusinessName() }],
    category: "Pool Maintenance Services",
  };
}

/**
 * Generate basic metadata for pages without CMS data
 */
export function generateBasicMetadata(
  title: string,
  description?: string
): Metadata {
  const pageData: PageData = {
    title,
    description: description || getBusinessDescription(),
  };

  return generateMetadata(pageData);
}

/**
 * Generate metadata specifically for service pages
 */
export function generateServiceMetadata(
  serviceName: string,
  serviceDescription: string,
  price?: number
): Metadata {
  const serviceArea = getServiceArea();
  const priceText = price ? ` - $${price} CAD` : "";

  const pageData: PageData = {
    title: `${serviceName} in ${serviceArea}${priceText}`,
    description: `${serviceDescription} Professional ${serviceName.toLowerCase()} services in ${serviceArea}.`,
  };

  return generateMetadata(pageData);
}

/**
 * Utility function to truncate description to specified length
 */
function truncateDescription(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  // Truncate at word boundary
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated.substring(0, maxLength - 3) + "...";
}

/**
 * Generate JSON-LD structured data script content
 * This function coordinates with schema-generator.ts for full structured data
 */
export function generateBasicStructuredData(pageData: PageData): object {
  const businessName = getBusinessName();
  const description = generateMetaDescription(pageData);
  const imageUrl = generateSocialImage(pageData);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: generatePageTitle(pageData),
    description: description,
    url: BUSINESS_INFO.contact.website,
    image: imageUrl,
    inLanguage: "en-CA",
    isPartOf: {
      "@type": "WebSite",
      name: businessName,
      url: BUSINESS_INFO.contact.website,
    },
  };
}
