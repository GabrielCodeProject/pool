# Product Requirements Document: SEO Improvements for Pool Maintenance Website

## Introduction/Overview

This feature implements essential SEO elements for the Piscine Azur pool maintenance website to increase website visibility in search engines, improve local search rankings in the Montreal/Quebec area, and enhance social media sharing appearance. The solution provides smart defaults with automated SEO content generation while allowing manual overrides through the CMS for maximum flexibility.

## Goals

1. **Increase organic search traffic** by implementing proper meta tags, structured data, and local SEO optimization
2. **Improve local search rankings** for pool maintenance services in Montreal/Quebec area
3. **Enhance social media sharing** with proper Open Graph and Twitter Card metadata
4. **Optimize images for SEO** with proper alt tags, sizing, and schema markup
5. **Provide non-developer friendly SEO management** through CMS integration with smart defaults

## User Stories

### Primary Users: Website Visitors & Search Engines

- **As a potential customer**, I want to find Piscine Azur when searching for "pool maintenance Montreal" so that I can contact them for services
- **As a social media user**, I want to see attractive previews when sharing the website so that the content looks professional and informative
- **As a search engine crawler**, I want to understand the business information and services so that I can properly index and rank the website

### Secondary Users: Content Managers

- **As a non-technical content manager**, I want to optionally customize SEO titles and descriptions through the CMS so that I can optimize for specific campaigns without coding
- **As a business owner**, I want search engines to automatically understand our business location, services, and contact information so that we appear in local search results

## Functional Requirements

### 1. Dynamic Metadata Generation

1.1. The system must automatically generate SEO-optimized page titles using the pattern: `[Page Content Title] | Piscine Azur - Pool Maintenance Montreal`
1.2. The system must auto-generate meta descriptions based on page content, limited to 155 characters, with fallback to business description
1.3. The system must allow manual override of auto-generated titles and descriptions through CMS fields
1.4. The system must generate location-specific keywords automatically (e.g., "Montreal", "Quebec", "pool maintenance")

### 2. CMS Integration for SEO Control

2.1. The system must add an optional "SEO Settings" section to the Netlify CMS configuration
2.2. The system must include fields for: SEO Title (optional), Meta Description (optional), Keywords (optional), Featured Image (optional)
2.3. The system must provide helpful hints and character limits for each SEO field
2.4. The system must fall back to smart defaults when CMS fields are empty

### 3. Local Business SEO Optimization

3.1. The system must implement local business structured data (JSON-LD) with Montreal/Quebec location information
3.2. The system must include business contact information (phone, email, address) in structured data
3.3. The system must add geographic coordinates for Montreal area in schema markup
3.4. The system must specify service area radius and locations served

### 4. Service-Specific Schema Markup

4.1. The system must generate structured data for each service offering (pool opening, cleaning, maintenance)
4.2. The system must include service prices, descriptions, and categories in schema markup
4.3. The system must mark up the business as a "LocalBusiness" type with "HomeAndConstructionBusiness" subtype
4.4. The system must create an offer catalog with all pool services

### 5. Image SEO Optimization

5.1. The system must automatically generate descriptive alt text for images based on context
5.2. The system must optimize social sharing images (1200x630px recommended)
5.3. The system must include image structured data for key business photos
5.4. The system must implement proper image loading optimization (lazy loading, responsive images)

### 6. Social Media Integration

6.1. The system must generate Open Graph meta tags for Facebook/LinkedIn sharing
6.2. The system must create Twitter Card metadata for Twitter sharing
6.3. The system must use appropriate featured images for social previews
6.4. The system must include business logo and branding in social meta tags

### 7. Technical SEO Elements

7.1. The system must add canonical URLs to prevent duplicate content issues
7.2. The system must implement proper robots meta tags for search engine crawling
7.3. The system must add language declaration (lang="en") to HTML tag
7.4. The system must include viewport and mobile-friendly meta tags

## Non-Goals (Out of Scope)

- Multi-language SEO support (French translations)
- Advanced analytics integration beyond basic setup
- Sitemap generation (will be handled separately)
- SEO optimization for pages other than the home page
- Automated content generation or AI-powered SEO writing
- Competitor analysis or keyword research tools
- A/B testing for SEO elements

## Design Considerations

### CMS Interface Design

- SEO fields should be grouped in a collapsible "SEO Settings" section
- Field hints should provide clear guidance on character limits and best practices
- Preview functionality to show how titles/descriptions will appear in search results (future enhancement)

### Performance Considerations

- Structured data should be minimal and focused on essential business information
- Image optimization should not significantly impact page load times
- Smart defaults should be computed at build time, not runtime

## Technical Considerations

### Dependencies

- Existing Netlify CMS setup for content management
- Next.js metadata API for dynamic SEO tag generation
- Current gray-matter setup for frontmatter parsing

### Integration Points

- Must work with existing static site generation (output: "export")
- Should integrate seamlessly with current build process
- Must maintain compatibility with GitHub Pages deployment

### Data Structure

- SEO data should be stored in markdown frontmatter
- Business information should be centralized and reusable
- Schema markup should be generated from existing content structure

## Success Metrics

### Primary Success Metric

- **Increase in organic website traffic**: Target 25% increase in organic search traffic within 3 months of implementation

### Supporting Metrics

- Improved search engine rankings for target keywords ("pool maintenance Montreal", "piscine entretien Montreal")
- Increased social media click-through rates from shared links
- Better search result appearance with rich snippets
- Improved Google Search Console performance scores

### Measurement Tools

- Google Analytics 4 for traffic monitoring
- Google Search Console for search performance
- Social media analytics for sharing performance
- Manual testing of search result appearance

## Open Questions

1. **Business Contact Information**: What are the exact business phone number, email, and service address for schema markup?

2. **Service Area Definition**: What is the specific geographic radius Piscine Azur serves around Montreal?

3. **Business Hours**: What are the current business operating hours for structured data?

4. **Google My Business**: Is there an existing Google My Business listing to coordinate with?

5. **Seasonal Services**: How should we handle seasonal availability of pool opening/closing services in schema markup?

6. **Pricing Display**: Should service prices be included in public schema markup, or kept private?

7. **Future Pages**: What additional pages (About, Services, Contact) should be planned for in the SEO architecture?
