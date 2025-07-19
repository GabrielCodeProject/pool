/**
 * Test suite for schema generation utilities
 * This file provides basic test functions for JSON-LD structured data generation
 * To run tests: import { runAllSchemaTests } from './schema-generator.test' and call runAllSchemaTests()
 */

import {
  generateLocalBusinessSchema,
  generateOfferCatalog,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateAggregateRatingSchema,
  generatePageStructuredData,
  generateStructuredDataScript,
} from "./schema-generator";

// Test assertion helpers
function logTest(testName: string, passed: boolean, details?: string): void {
  if (passed) {
    console.log(`✓ ${testName}: PASSED`);
  } else {
    console.error(`✗ ${testName}: FAILED`);
    if (details) {
      console.error(`  ${details}`);
    }
  }
}

function validateJSONString(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

// Test functions for local business schema generation
export function testLocalBusinessSchema(): void {
  console.log("\n--- Testing Local Business Schema Generation ---");

  try {
    const schema = generateLocalBusinessSchema();

    // Test basic schema structure
    logTest(
      "Schema context is correct",
      schema["@context"] === "https://schema.org"
    );
    logTest("Business name is correct", schema.name === "Piscine Azur");
    logTest(
      "Description contains business focus",
      schema.description.includes("pool maintenance")
    );

    // Test schema types
    const schemaTypes = Array.isArray(schema["@type"])
      ? schema["@type"]
      : [schema["@type"]];
    logTest(
      "Contains LocalBusiness type",
      schemaTypes.includes("LocalBusiness")
    );
    logTest(
      "Contains HomeAndConstructionBusiness subtype",
      schemaTypes.includes("HomeAndConstructionBusiness")
    );

    // Test contact information
    logTest("Schema has telephone", "telephone" in schema);
    logTest("Schema has email", "email" in schema);
    logTest("Website URL is absolute", schema.url.includes("https://"));

    // Test geographic information
    logTest("Schema has address", "address" in schema);
    logTest("Schema has geographic coordinates", "geo" in schema);
    logTest("Schema has service area", "areaServed" in schema);

    // Test business operations
    logTest("Schema has opening hours", "openingHours" in schema);
    logTest("Schema has price range", "priceRange" in schema);
    logTest("Schema has offer catalog", "hasOfferCatalog" in schema);

    console.log("✓ Local business schema generation tests completed");
  } catch (error) {
    console.error("✗ Local business schema generation tests failed:", error);
  }
}

// Test functions for offer catalog generation
export function testOfferCatalogGeneration(): void {
  console.log("\n--- Testing Offer Catalog Generation ---");

  try {
    const catalog = generateOfferCatalog();

    // Test catalog structure
    logTest("Catalog has correct type", catalog["@type"] === "OfferCatalog");
    logTest(
      "Catalog has correct name",
      catalog.name === "Pool Maintenance Services"
    );
    logTest("Catalog has item list", "itemListElement" in catalog);

    // Test catalog items
    const items = catalog.itemListElement;
    logTest(
      "Catalog contains offers",
      Array.isArray(items) && items.length > 0
    );

    if (Array.isArray(items) && items.length > 0) {
      const firstOffer = items[0];
      logTest("First offer has correct type", firstOffer["@type"] === "Offer");
      logTest("Offer has item offered", "itemOffered" in firstOffer);
      logTest("Offer has price", "price" in firstOffer);
      logTest("Offer has price currency", "priceCurrency" in firstOffer);
    }

    console.log("✓ Offer catalog generation tests completed");
  } catch (error) {
    console.error("✗ Offer catalog generation tests failed:", error);
  }
}

// Test functions for website schema generation
export function testWebsiteSchemaGeneration(): void {
  console.log("\n--- Testing Website Schema Generation ---");

  try {
    const schema = generateWebsiteSchema();

    // Test website schema structure
    logTest(
      "Website schema context is correct",
      schema["@context"] === "https://schema.org"
    );
    logTest("Website schema type is correct", schema["@type"] === "WebSite");
    logTest("Website schema has proper ID", schema["@id"].includes("#website"));

    // Test website properties
    logTest("Website has name", "name" in schema);
    logTest("Website has URL", "url" in schema);
    logTest("Website has search action", "potentialAction" in schema);
    logTest("Website has language", "inLanguage" in schema);
    logTest("Website has publisher", "publisher" in schema);

    console.log("✓ Website schema generation tests completed");
  } catch (error) {
    console.error("✗ Website schema generation tests failed:", error);
  }
}

// Test functions for breadcrumb schema generation
export function testBreadcrumbSchemaGeneration(): void {
  console.log("\n--- Testing Breadcrumb Schema Generation ---");

  try {
    const breadcrumbs = [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Pool Cleaning", url: "/services/pool-cleaning" },
    ];

    const schema = generateBreadcrumbSchema(breadcrumbs);

    // Test breadcrumb schema structure
    logTest(
      "Breadcrumb schema context is correct",
      schema["@context"] === "https://schema.org"
    );
    logTest(
      "Breadcrumb schema type is correct",
      schema["@type"] === "BreadcrumbList"
    );
    logTest("Breadcrumb has item list", "itemListElement" in schema);

    // Test breadcrumb items
    const items = schema.itemListElement;
    logTest(
      "Breadcrumb has correct number of items",
      Array.isArray(items) && items.length === 3
    );

    if (Array.isArray(items) && items.length > 0) {
      const firstItem = items[0];
      logTest(
        "Breadcrumb item has correct type",
        firstItem["@type"] === "ListItem"
      );
      logTest("First breadcrumb item has position 1", firstItem.position === 1);
      logTest(
        "First breadcrumb item has correct name",
        firstItem.name === "Home"
      );
    }

    console.log("✓ Breadcrumb schema generation tests completed");
  } catch (error) {
    console.error("✗ Breadcrumb schema generation tests failed:", error);
  }
}

// Test functions for FAQ schema generation
export function testFAQSchemaGeneration(): void {
  console.log("\n--- Testing FAQ Schema Generation ---");

  try {
    const faqs = [
      {
        question: "How often should I clean my pool?",
        answer:
          "We recommend weekly cleaning during pool season for optimal water quality.",
      },
      {
        question: "What is included in pool opening service?",
        answer:
          "Pool opening includes equipment inspection, chemical balancing, and system startup.",
      },
    ];

    const schema = generateFAQSchema(faqs);

    // Test FAQ schema structure
    logTest(
      "FAQ schema context is correct",
      schema["@context"] === "https://schema.org"
    );
    logTest("FAQ schema type is correct", schema["@type"] === "FAQPage");
    logTest("FAQ has main entity", "mainEntity" in schema);

    // Test FAQ items
    const questions = schema.mainEntity;
    logTest(
      "FAQ has correct number of questions",
      Array.isArray(questions) && questions.length === 2
    );

    if (Array.isArray(questions) && questions.length > 0) {
      const firstQuestion = questions[0];
      logTest(
        "FAQ item has correct type",
        firstQuestion["@type"] === "Question"
      );
      logTest(
        "FAQ question text is correct",
        firstQuestion.name === faqs[0].question
      );
      logTest(
        "FAQ question has accepted answer",
        "acceptedAnswer" in firstQuestion
      );
    }

    console.log("✓ FAQ schema generation tests completed");
  } catch (error) {
    console.error("✗ FAQ schema generation tests failed:", error);
  }
}

// Test functions for aggregate rating schema generation
export function testAggregateRatingSchemaGeneration(): void {
  console.log("\n--- Testing Aggregate Rating Schema Generation ---");

  try {
    const rating = generateAggregateRatingSchema(4.5, 23, 5, 1);

    // Test rating schema structure
    logTest(
      "Rating schema type is correct",
      rating["@type"] === "AggregateRating"
    );
    logTest("Rating value is correct", rating.ratingValue === 4.5);
    logTest("Review count is correct", rating.reviewCount === 23);
    logTest("Best rating is correct", rating.bestRating === 5);
    logTest("Worst rating is correct", rating.worstRating === 1);

    console.log("✓ Aggregate rating schema generation tests completed");
  } catch (error) {
    console.error("✗ Aggregate rating schema generation tests failed:", error);
  }
}

// Test functions for page structured data generation
export function testPageStructuredDataGeneration(): void {
  console.log("\n--- Testing Page Structured Data Generation ---");

  try {
    // Test with default options (local business only)
    const basicStructuredData = generatePageStructuredData();
    logTest(
      "Basic structured data is valid JSON",
      validateJSONString(basicStructuredData)
    );

    // Test with multiple schemas
    const breadcrumbs = [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
    ];

    const faqs = [{ question: "Test question?", answer: "Test answer." }];

    const complexStructuredData = generatePageStructuredData({
      includeWebsite: true,
      breadcrumbs,
      faqs,
    });

    logTest(
      "Complex structured data is valid JSON",
      validateJSONString(complexStructuredData)
    );

    const complexParsed = JSON.parse(complexStructuredData);
    logTest("Complex structured data is array", Array.isArray(complexParsed));

    if (Array.isArray(complexParsed)) {
      logTest(
        "Complex data contains multiple schemas",
        complexParsed.length > 1
      );
    }

    console.log("✓ Page structured data generation tests completed");
  } catch (error) {
    console.error("✗ Page structured data generation tests failed:", error);
  }
}

// Test functions for structured data script generation
export function testStructuredDataScriptGeneration(): void {
  console.log("\n--- Testing Structured Data Script Generation ---");

  try {
    const script = generateStructuredDataScript();

    // Test script format
    logTest(
      "Script has correct opening tag",
      script.includes('<script type="application/ld+json">')
    );
    logTest("Script has closing tag", script.includes("</script>"));

    // Extract JSON from script tags
    const jsonStart = script.indexOf(">") + 1;
    const jsonEnd = script.lastIndexOf("<");
    const jsonContent = script.substring(jsonStart, jsonEnd);

    logTest("Script contains valid JSON", validateJSONString(jsonContent));

    console.log("✓ Structured data script generation tests completed");
  } catch (error) {
    console.error("✗ Structured data script generation tests failed:", error);
  }
}

// Test functions for edge cases
export function testEdgeCases(): void {
  console.log("\n--- Testing Edge Cases ---");

  try {
    // Test empty breadcrumbs
    const emptyBreadcrumbs = generateBreadcrumbSchema([]);
    logTest(
      "Empty breadcrumbs handling",
      Array.isArray(emptyBreadcrumbs.itemListElement) &&
        emptyBreadcrumbs.itemListElement.length === 0
    );

    // Test empty FAQs
    const emptyFAQs = generateFAQSchema([]);
    logTest(
      "Empty FAQs handling",
      Array.isArray(emptyFAQs.mainEntity) && emptyFAQs.mainEntity.length === 0
    );

    // Test structured data with no additional options
    const minimalData = generatePageStructuredData({
      includeLocalBusiness: false,
      includeWebsite: false,
    });
    logTest(
      "Minimal structured data is valid JSON",
      validateJSONString(minimalData)
    );

    // Test rating with default parameters
    const defaultRating = generateAggregateRatingSchema(4.0, 10);
    logTest("Default best rating is 5", defaultRating.bestRating === 5);
    logTest("Default worst rating is 1", defaultRating.worstRating === 1);

    console.log("✓ Edge case tests completed");
  } catch (error) {
    console.error("✗ Edge case tests failed:", error);
  }
}

// Main test runner function
export function runAllSchemaTests(): void {
  console.log("Starting schema generation tests...\n");

  testLocalBusinessSchema();
  testOfferCatalogGeneration();
  testWebsiteSchemaGeneration();
  testBreadcrumbSchemaGeneration();
  testFAQSchemaGeneration();
  testAggregateRatingSchemaGeneration();
  testPageStructuredDataGeneration();
  testStructuredDataScriptGeneration();
  testEdgeCases();

  console.log("\n✓ All schema generation tests completed!");
}

// Note: This test file is compatible with multiple test frameworks
// To run with Node.js: import { runAllSchemaTests } from './schema-generator.test' and call runAllSchemaTests()
// Individual test functions can also be imported and run separately
