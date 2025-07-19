/**
 * Test suite for metadata generation utilities
 * This file provides test functions that can be run with various test frameworks
 * To run tests: import and call the test functions
 */

import {
  generatePageTitle,
  generateMetaDescription,
  generateKeywords,
  generateSocialImage,
  generateMetadata,
  generateBasicMetadata,
  generateServiceMetadata,
  generateBasicStructuredData,
} from "./metadata";

// Test data interfaces
interface TestPageData {
  title?: string;
  description?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
  };
  [key: string]: unknown;
}

// Test assertion helper
function assertEqual(
  actual: unknown,
  expected: unknown,
  testName: string
): void {
  if (actual === expected) {
    console.log(`✓ ${testName}: PASSED`);
  } else {
    console.error(`✗ ${testName}: FAILED`);
    console.error(`  Expected: ${expected}`);
    console.error(`  Actual: ${actual}`);
  }
}

function assertContains(
  actual: string,
  expected: string,
  testName: string
): void {
  if (actual.includes(expected)) {
    console.log(`✓ ${testName}: PASSED`);
  } else {
    console.error(`✗ ${testName}: FAILED`);
    console.error(`  Expected "${actual}" to contain "${expected}"`);
  }
}

function assertLengthLimit(
  actual: string,
  maxLength: number,
  testName: string
): void {
  if (actual.length <= maxLength) {
    console.log(`✓ ${testName}: PASSED`);
  } else {
    console.error(`✗ ${testName}: FAILED`);
    console.error(`  Expected length <= ${maxLength}, got ${actual.length}`);
  }
}

// Test functions for page title generation
export function testPageTitleGeneration(): void {
  console.log("\n--- Testing Page Title Generation ---");

  // Test with SEO override
  const pageDataWithSEO: TestPageData = {
    title: "Home Page",
    seo: {
      title: "Professional Pool Services",
    },
  };
  const titleWithSEO = generatePageTitle(pageDataWithSEO);
  assertContains(
    titleWithSEO,
    "Professional Pool Services",
    "Title with SEO override"
  );
  assertContains(titleWithSEO, "Piscine Azur", "Title contains business name");

  // Test with page title only
  const pageDataWithTitle: TestPageData = {
    title: "About Us",
  };
  const titleWithPageTitle = generatePageTitle(pageDataWithTitle);
  assertContains(titleWithPageTitle, "About Us", "Title with page title");
  assertContains(
    titleWithPageTitle,
    "Piscine Azur",
    "Page title contains business name"
  );

  // Test with empty data
  const emptyPageData: TestPageData = {};
  const defaultTitle = generatePageTitle(emptyPageData);
  assertContains(
    defaultTitle,
    "Piscine Azur",
    "Default title contains business name"
  );
  assertContains(defaultTitle, "Montreal", "Default title contains location");
}

// Test functions for meta description generation
export function testMetaDescriptionGeneration(): void {
  console.log("\n--- Testing Meta Description Generation ---");

  // Test with SEO override
  const pageDataWithSEO: TestPageData = {
    description: "Page description",
    seo: {
      description: "Custom SEO description for better search results",
    },
  };
  const descWithSEO = generateMetaDescription(pageDataWithSEO);
  assertEqual(
    descWithSEO,
    "Custom SEO description for better search results",
    "Description with SEO override"
  );

  // Test with page description
  const pageDataWithDesc: TestPageData = {
    description: "This is the page description",
  };
  const descWithPageDesc = generateMetaDescription(pageDataWithDesc);
  assertEqual(
    descWithPageDesc,
    "This is the page description",
    "Description with page description"
  );

  // Test character limit
  const longDescription =
    "This is a very long description that exceeds the maximum character limit for meta descriptions and should be truncated properly at word boundaries to maintain readability and SEO best practices for search engines.";
  const pageDataWithLongDesc: TestPageData = {
    seo: {
      description: longDescription,
    },
  };
  const truncatedDesc = generateMetaDescription(pageDataWithLongDesc);
  assertLengthLimit(truncatedDesc, 155, "Description character limit");

  // Test default description
  const emptyPageData: TestPageData = {};
  const defaultDesc = generateMetaDescription(emptyPageData);
  assertContains(
    defaultDesc,
    "Montreal",
    "Default description contains location"
  );
}

// Test functions for keywords generation
export function testKeywordsGeneration(): void {
  console.log("\n--- Testing Keywords Generation ---");

  // Test with custom keywords
  const pageDataWithKeywords: TestPageData = {
    seo: {
      keywords: "pool cleaning, maintenance service",
    },
  };
  const keywordsWithCustom = generateKeywords(pageDataWithKeywords);
  assertContains(
    keywordsWithCustom,
    "pool cleaning",
    "Custom keywords included"
  );
  assertContains(
    keywordsWithCustom,
    "pool maintenance Montreal",
    "Business keywords included"
  );

  // Test default keywords
  const emptyPageData: TestPageData = {};
  const defaultKeywords = generateKeywords(emptyPageData);
  assertContains(
    defaultKeywords,
    "pool maintenance Montreal",
    "Default keywords contain business terms"
  );
}

// Test functions for social image generation
export function testSocialImageGeneration(): void {
  console.log("\n--- Testing Social Image Generation ---");

  // Test with custom image
  const pageDataWithImage: TestPageData = {
    seo: {
      image: "/custom-image.jpg",
    },
  };
  const customImage = generateSocialImage(pageDataWithImage);
  assertContains(
    customImage,
    "/custom-image.jpg",
    "Custom image path included"
  );
  assertContains(customImage, "https://", "Image URL is absolute");

  // Test default image
  const emptyPageData: TestPageData = {};
  const defaultImage = generateSocialImage(emptyPageData);
  assertContains(defaultImage, "pool-image.jpg", "Default image path included");
}

// Test functions for complete metadata generation
export function testCompleteMetadataGeneration(): void {
  console.log("\n--- Testing Complete Metadata Generation ---");

  const pageData: TestPageData = {
    title: "Test Page",
    description: "Test description",
    seo: {
      keywords: "test keywords",
      image: "/test-image.jpg",
    },
  };

  const metadata = generateMetadata(pageData);

  // Basic checks
  if (
    typeof metadata.title === "string" &&
    metadata.title.includes("Test Page")
  ) {
    console.log("✓ Metadata title generation: PASSED");
  } else {
    console.error("✗ Metadata title generation: FAILED");
  }

  if (
    typeof metadata.description === "string" &&
    metadata.description === "Test description"
  ) {
    console.log("✓ Metadata description generation: PASSED");
  } else {
    console.error("✗ Metadata description generation: FAILED");
  }

  if (metadata.openGraph && typeof metadata.openGraph === "object") {
    console.log("✓ Open Graph metadata generation: PASSED");
  } else {
    console.error("✗ Open Graph metadata generation: FAILED");
  }

  if (metadata.twitter && typeof metadata.twitter === "object") {
    console.log("✓ Twitter Card metadata generation: PASSED");
  } else {
    console.error("✗ Twitter Card metadata generation: FAILED");
  }
}

// Test functions for utility functions
export function testUtilityFunctions(): void {
  console.log("\n--- Testing Utility Functions ---");

  // Test basic metadata generation
  const basicMetadata = generateBasicMetadata(
    "Basic Page",
    "Basic description"
  );
  if (
    typeof basicMetadata.title === "string" &&
    basicMetadata.title.includes("Basic Page")
  ) {
    console.log("✓ Basic metadata generation: PASSED");
  } else {
    console.error("✗ Basic metadata generation: FAILED");
  }

  // Test service metadata generation
  const serviceMetadata = generateServiceMetadata(
    "Pool Cleaning",
    "Professional service",
    400
  );
  if (
    typeof serviceMetadata.title === "string" &&
    serviceMetadata.title.includes("Pool Cleaning")
  ) {
    console.log("✓ Service metadata generation: PASSED");
  } else {
    console.error("✗ Service metadata generation: FAILED");
  }

  // Test structured data generation
  const pageData: TestPageData = {
    title: "Home",
    description: "Welcome to Piscine Azur",
  };
  const structuredData = generateBasicStructuredData(pageData);
  if (typeof structuredData === "object" && structuredData !== null) {
    console.log("✓ Structured data generation: PASSED");
  } else {
    console.error("✗ Structured data generation: FAILED");
  }
}

// Main test runner function
export function runAllMetadataTests(): void {
  console.log("Starting metadata generation tests...\n");

  testPageTitleGeneration();
  testMetaDescriptionGeneration();
  testKeywordsGeneration();
  testSocialImageGeneration();
  testCompleteMetadataGeneration();
  testUtilityFunctions();

  console.log("\n✓ All metadata tests completed!");
}

// Note: This test file is compatible with multiple test frameworks
// To run with Node.js: import { runAllMetadataTests } from './metadata.test' and call runAllMetadataTests()
// Individual test functions can also be imported and run separately
