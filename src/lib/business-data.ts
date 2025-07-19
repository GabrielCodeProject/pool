/**
 * Centralized business information for Piscine Azur
 * Used across SEO implementations for consistency
 */

export const BUSINESS_INFO = {
  // Core Business Information
  name: "Piscine Azur",
  legalName: "Piscine Azur Inc.",
  description:
    "Professional pool maintenance and cleaning services with over 10 years of experience in Montreal and surrounding areas.",

  // Location & Contact
  location: {
    city: "Montreal",
    province: "Quebec",
    country: "Canada",
    postalCode: "H1A 0A1", // Placeholder - update with real address
    fullAddress: "Montreal, QC, Canada",
    coordinates: {
      latitude: 45.5017,
      longitude: -73.5673,
    },
  },

  contact: {
    phone: "+1-514-XXX-XXXX", // Placeholder - update with real phone
    email: "contact@piscineazur.com", // Placeholder - update with real email
    website: "https://gabrielcodeproject.github.io/pool/",
  },

  // Business Operations
  serviceArea: {
    primary: "Montreal, QC",
    radius: 50, // kilometers
    regions: [
      "Montreal",
      "Laval",
      "Longueuil",
      "Brossard",
      "South Shore",
      "North Shore",
    ],
  },

  businessHours: {
    timezone: "America/Toronto",
    schedule: "Monday-Friday 8AM-6PM",
    seasonal: "May to October (Pool Season)",
  },

  // Services Information
  services: [
    {
      id: "pool-opening-closing",
      name: "Pool Opening & Closing",
      description:
        "Seasonal pool preparation and winterization with complete equipment check",
      category: "Seasonal Service",
      price: {
        amount: 300,
        currency: "CAD",
        unit: "service",
      },
      seasonal: true,
    },
    {
      id: "first-cleaning",
      name: "First Cleaning",
      description:
        "Complete pool restoration for season start - crystal clear water guaranteed",
      category: "Cleaning Service",
      price: {
        amount: 400,
        currency: "CAD",
        unit: "service",
      },
      seasonal: false,
    },
    {
      id: "regular-maintenance",
      name: "Regular Maintenance",
      description:
        "Weekly or bi-weekly pool maintenance tailored to your needs",
      category: "Maintenance Service",
      price: {
        amount: 1600,
        currency: "CAD",
        unit: "season",
      },
      seasonal: false,
      frequency: "Weekly/Bi-weekly",
    },
  ],

  // SEO & Marketing
  keywords: [
    "pool maintenance Montreal",
    "swimming pool cleaning",
    "pool service Quebec",
    "piscine entretien Montreal",
    "pool opening closing",
    "pool care specialist",
    "residential pool service",
    "Montreal pool company",
  ],

  // Social Media & Branding
  branding: {
    logo: "/pool/images/uploads/logo.jpg",
    primaryImage: "/pool/images/uploads/pool-image.jpg",
    colors: {
      primary: "#0066cc",
      secondary: "#ffffff",
    },
  },

  // Schema.org Business Type
  schemaType: {
    main: "LocalBusiness",
    subtype: "HomeAndConstructionBusiness",
    additionalTypes: ["PoolService", "MaintenanceService"],
  },
} as const;

// Helper functions for accessing business data
export const getBusinessName = () => BUSINESS_INFO.name;
export const getBusinessDescription = () => BUSINESS_INFO.description;
export const getServiceArea = () => BUSINESS_INFO.serviceArea.primary;
export const getBusinessKeywords = () => BUSINESS_INFO.keywords.join(", ");
export const getBusinessServices = () => BUSINESS_INFO.services;
export const getBusinessContact = () => BUSINESS_INFO.contact;
export const getBusinessLocation = () => BUSINESS_INFO.location;
