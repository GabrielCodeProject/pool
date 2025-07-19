import {
  BUSINESS_INFO,
  getBusinessName,
  getBusinessDescription,
  getBusinessLocation,
  getBusinessContact,
  getBusinessServices,
} from "./business-data";

// Types for structured data
interface LocalBusinessSchema {
  "@context": string;
  "@type": string | string[];
  "@id": string;
  name: string;
  legalName: string;
  description: string;
  url: string;
  image: string | string[];
  logo: string;
  telephone: string;
  email: string;
  address: PostalAddress;
  geo: GeoCoordinates;
  areaServed: ServiceArea;
  openingHours: string;
  priceRange: string;
  hasOfferCatalog: OfferCatalog;
  serviceArea: ServiceArea;
  aggregateRating?: AggregateRating;
}

interface PostalAddress {
  "@type": string;
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface GeoCoordinates {
  "@type": string;
  latitude: number;
  longitude: number;
}

interface ServiceArea {
  "@type": string;
  geoMidpoint: GeoCoordinates;
  geoRadius: string;
  name?: string;
}

interface OfferCatalog {
  "@type": string;
  name: string;
  itemListElement: Offer[];
}

interface Offer {
  "@type": string;
  itemOffered: Service;
  price?: string;
  priceCurrency: string;
  availability?: string;
  eligibleRegion: ServiceArea;
}

interface Service {
  "@type": string;
  name: string;
  description: string;
  category?: string;
  provider: Organization;
}

interface Organization {
  "@type": string;
  name: string;
}

interface AggregateRating {
  "@type": string;
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

/**
 * Generate complete local business JSON-LD schema
 */
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  const businessInfo = BUSINESS_INFO;
  const location = getBusinessLocation();
  const contact = getBusinessContact();

  return {
    "@context": "https://schema.org",
    "@type": [businessInfo.schemaType.main, businessInfo.schemaType.subtype],
    "@id": `${contact.website}#business`,

    // Basic business information
    name: getBusinessName(),
    legalName: businessInfo.legalName,
    description: getBusinessDescription(),
    url: contact.website,
    image: [
      `${contact.website}${businessInfo.branding.logo}`,
      `${contact.website}${businessInfo.branding.primaryImage}`,
    ],
    logo: `${contact.website}${businessInfo.branding.logo}`,

    // Contact information
    telephone: contact.phone,
    email: contact.email,

    // Address information
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.province,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },

    // Geographic coordinates
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    },

    // Service area
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
      },
      geoRadius: `${businessInfo.serviceArea.radius}000`, // Convert km to meters
    },

    // Business hours
    openingHours: formatOpeningHours(businessInfo.businessHours.schedule),

    // Price range
    priceRange: generatePriceRange(),

    // Service offerings
    hasOfferCatalog: generateOfferCatalog(),

    // Service area (additional format)
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
      },
      geoRadius: `${businessInfo.serviceArea.radius}000`,
      name: businessInfo.serviceArea.primary,
    },
  };
}

/**
 * Generate offer catalog with all services
 */
export function generateOfferCatalog(): OfferCatalog {
  const services = getBusinessServices();
  const location = getBusinessLocation();

  const offers: Offer[] = services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.name,
      description: service.description,
      category: service.category,
      provider: {
        "@type": "LocalBusiness",
        name: getBusinessName(),
      },
    },
    price: service.price.amount.toString(),
    priceCurrency: service.price.currency,
    availability: service.seasonal ? "SeasonallyAvailable" : "InStock",
    eligibleRegion: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
      },
      geoRadius: `${BUSINESS_INFO.serviceArea.radius}000`,
    },
  }));

  return {
    "@type": "OfferCatalog",
    name: "Pool Maintenance Services",
    itemListElement: offers,
  };
}

/**
 * Generate website schema
 */
export function generateWebsiteSchema(): object {
  const contact = getBusinessContact();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${contact.website}#website`,
    name: getBusinessName(),
    url: contact.website,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${contact.website}?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-CA",
    copyrightYear: new Date().getFullYear(),
    publisher: {
      "@type": "LocalBusiness",
      name: getBusinessName(),
      url: contact.website,
    },
  };
}

/**
 * Generate breadcrumb schema (for future multi-page use)
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): object {
  const contact = getBusinessContact();

  const itemListElement = breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: crumb.url.startsWith("http")
      ? crumb.url
      : `${contact.website}${crumb.url}`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

/**
 * Generate FAQ schema (for future FAQ content)
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): object {
  const mainEntity = faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

/**
 * Generate review/rating schema (when reviews are available)
 */
export function generateAggregateRatingSchema(
  ratingValue: number,
  reviewCount: number,
  bestRating: number = 5,
  worstRating: number = 1
): AggregateRating {
  return {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount,
    bestRating,
    worstRating,
  };
}

/**
 * Generate complete structured data for a page
 */
export function generatePageStructuredData(
  options: {
    includeLocalBusiness?: boolean;
    includeWebsite?: boolean;
    breadcrumbs?: Array<{ name: string; url: string }>;
    faqs?: Array<{ question: string; answer: string }>;
    rating?: { value: number; count: number };
  } = {}
): string {
  const schemas: object[] = [];

  // Always include local business schema
  if (options.includeLocalBusiness !== false) {
    schemas.push(generateLocalBusinessSchema());
  }

  // Include website schema
  if (options.includeWebsite) {
    schemas.push(generateWebsiteSchema());
  }

  // Include breadcrumbs if provided
  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(options.breadcrumbs));
  }

  // Include FAQs if provided
  if (options.faqs && options.faqs.length > 0) {
    schemas.push(generateFAQSchema(options.faqs));
  }

  // Return as JSON string for script tag
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2);
}

/**
 * Helper function to format opening hours for schema.org
 */
function formatOpeningHours(schedule: string): string {
  // Convert "Monday-Friday 8AM-6PM" to schema.org format
  // This is a simplified version - could be enhanced for more complex schedules
  if (schedule.includes("Monday-Friday")) {
    const timeRange = schedule.split(" ").pop() || "8AM-6PM";
    const [startTime, endTime] = timeRange.split("-");
    const start = convertTo24Hour(startTime);
    const end = convertTo24Hour(endTime);

    return `Mo-Fr ${start}-${end}`;
  }

  return schedule;
}

/**
 * Helper function to convert 12-hour time to 24-hour format
 */
function convertTo24Hour(time: string): string {
  const match = time.match(/(\d+)(AM|PM)/i);
  if (!match) return time;

  let hour = parseInt(match[1]);
  const period = match[2].toUpperCase();

  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, "0")}:00`;
}

/**
 * Helper function to generate price range from services
 */
function generatePriceRange(): string {
  const services = getBusinessServices();
  const prices = services.map((service) => service.price.amount);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return `$${minPrice}-$${maxPrice}`;
}

/**
 * Generate structured data script tag content for HTML
 */
export function generateStructuredDataScript(options?: {
  includeLocalBusiness?: boolean;
  includeWebsite?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  rating?: { value: number; count: number };
}): string {
  const jsonLd = generatePageStructuredData(options);
  return `<script type="application/ld+json">${jsonLd}</script>`;
}
