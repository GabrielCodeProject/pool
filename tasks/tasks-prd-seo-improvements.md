## Relevant Files

- `src/lib/metadata.ts` - Core utility functions for generating dynamic SEO metadata and structured data
- `src/lib/metadata.test.ts` - Unit tests for metadata generation utilities
- `public/admin/config.yml` - Updated Netlify CMS configuration with SEO fields
- `src/app/layout.tsx` - Updated root layout with global SEO meta tags and language declaration
- `src/app/page.tsx` - Updated home page with dynamic metadata generation and structured data
- `content/pages/home.md` - Updated content file with SEO frontmatter fields
- `src/components/ui/image-seo.tsx` - SEO-optimized image component with context-aware alt text generation and responsive sizing
- `src/components/ui/image-seo.test.tsx` - Unit tests for SEO image component
- `src/lib/business-data.ts` - Centralized business information for reuse across SEO implementations
- `src/lib/schema-generator.ts` - Utility functions for generating JSON-LD structured data
- `src/lib/schema-generator.test.ts` - Unit tests for schema generation

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npm test` to run the full test suite
- SEO improvements should be tested using Google's Rich Results Test and Social Media Debuggers
- Structured data should be validated using Google's Structured Data Testing Tool

## Tasks

- [x] 1.0 Set up SEO Infrastructure and Utility Functions

  - [x] 1.1 Create `src/lib/business-data.ts` with centralized business information (name, location, contact info, services)
  - [x] 1.2 Create `src/lib/metadata.ts` with functions for generating page titles, meta descriptions, and keywords
  - [x] 1.3 Create `src/lib/schema-generator.ts` with functions for generating JSON-LD structured data
  - [x] 1.4 Add unit tests for metadata generation utilities in `src/lib/metadata.test.ts`
  - [x] 1.5 Add unit tests for schema generation utilities in `src/lib/schema-generator.test.ts`

- [x] 2.0 Update CMS Configuration with SEO Fields

  - [x] 2.1 Add SEO Settings section to `public/admin/config.yml` with optional fields (title, description, keywords, image)
  - [x] 2.2 Add helpful hints and character limits to each SEO field in CMS configuration
  - [x] 2.3 Update `content/pages/home.md` with sample SEO frontmatter data
  - [x] 2.4 Test CMS interface to ensure SEO fields display correctly and are optional

- [x] 3.0 Implement Dynamic Metadata Generation and Technical SEO

  - [x] 3.1 Update `src/app/layout.tsx` to add global meta tags (viewport, theme-color, language declaration)
  - [x] 3.2 Remove static metadata from layout.tsx and add global head elements
  - [x] 3.3 Add `generateMetadata` function to `src/app/page.tsx` using metadata utilities
  - [x] 3.4 Implement Open Graph meta tags for social media sharing (Facebook/LinkedIn)
  - [x] 3.5 Implement Twitter Card metadata for Twitter sharing
  - [x] 3.6 Add canonical URLs and proper robots meta tags
  - [x] 3.7 Ensure all meta tags work with static site generation (output: "export")

- [x] 4.0 Add Structured Data for Local Business and Services

  - [x] 4.1 Implement local business JSON-LD schema with Montreal/Quebec location data
  - [x] 4.2 Add business contact information (phone, email, address) to structured data
  - [x] 4.3 Include geographic coordinates and service area radius in schema markup
  - [x] 4.4 Generate service offerings schema with prices, descriptions, and categories
  - [x] 4.5 Add structured data script tag to page component using schema generator
  - [x] 4.6 Mark up business as "LocalBusiness" with "HomeAndConstructionBusiness" subtype

- [x] 5.0 Implement Image SEO Optimization

  - [x] 5.1 Create `src/components/ui/image-seo.tsx` component for SEO-optimized image rendering
  - [x] 5.2 Add automatic alt text generation based on image context and business focus
  - [x] 5.3 Optimize social sharing image dimensions (1200x630px) and format
  - [x] 5.4 Update existing Image components to use SEO-optimized version with proper alt text
  - [x] 5.5 Add unit tests for image SEO component in `src/components/ui/image-seo.test.tsx`

- [x] 6.0 Testing and Validation
  - [x] 6.1 Test structured data using Google's Rich Results Test tool
  - [x] 6.2 Validate Open Graph tags using Facebook's Sharing Debugger
  - [x] 6.3 Test Twitter Card metadata using Twitter's Card Validator
  - [x] 6.4 Verify mobile-friendliness using Google's Mobile-Friendly Test (via PageSpeed Insights/Lighthouse)
  - [x] 6.5 Check page speed and Core Web Vitals with PageSpeed Insights
  - [x] 6.6 Manually test search result appearance and social media previews
