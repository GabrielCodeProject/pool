# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (faster builds)
- `npm run build` - Build the application for production (static export)
- `npm start` - Start production server (requires build first)
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is a Next.js 15+ application configured for static export with GitHub Pages deployment.

### Key Configuration
- **Static Export**: Configured with `output: "export"` in next.config.ts
- **Base Path**: Uses `/pool` as base path for GitHub Pages
- **Image Optimization**: Disabled (`unoptimized: true`) for static hosting
- **TypeScript**: Strict mode enabled with path aliases (`@/*` -> `./src/*`)

### Content Management System
- **Markdown-based CMS**: Content stored in `content/pages/` directory
- **Frontmatter Structure**: Pages use YAML frontmatter with:
  - `title`, `description` - Basic page metadata
  - `promotions[]` - Array of promotional content with image/text
  - `services[]` - Business services with name/description/price
  - `seo{}` - SEO optimization data (title, description, keywords, image)
- **Gray-matter**: Used for parsing markdown frontmatter in components

### SEO Architecture
- **Dynamic Metadata Generation**: Each page generates metadata at build time using `generateMetadata()`
- **SEO Utilities**: Centralized in `src/lib/metadata.ts` with functions for:
  - Page title generation with business branding
  - Meta description optimization (155 char limit)
  - Social sharing image URLs
  - Open Graph and Twitter Card metadata
- **Business Data**: Centralized business information in `src/lib/business-data.ts`
- **Structured Data**: Schema.org JSON-LD generation capabilities

### UI Components
- **Shadcn/ui**: Component library built on Radix UI primitives
  - Registry configuration in `components.json` with "new-york" style
  - Default registry: `https://ui.shadcn.com/r`
  - Component aliases: `@/components/ui` for UI components
  - Supports custom registries following registry.json schema
- **Tailwind CSS**: Utility-first styling with custom design system
- **Responsive Design**: Mobile-first approach with breakpoint-specific classes
- **Typography System**: Consistent typography components in `src/components/ui/typography.tsx`
- **Card-based Layout**: Main content wrapped in semi-transparent cards with backdrop blur

### Component Structure
- `src/app/` - App Router pages and layouts
- `src/components/ui/` - Reusable UI components (buttons, cards, carousels, etc.)
- `src/lib/` - Utility functions and business logic
- `public/` - Static assets including images and admin config

### Static Asset Handling
- **Images**: Stored in `public/images/uploads/` directory
- **Next.js Image**: Used with `unoptimized: true` for static export compatibility
- **Base Path**: All internal links and images must include `/pool` prefix

### Development Workflow
1. Content changes: Edit markdown files in `content/pages/`
2. UI changes: Modify components in `src/components/`
3. SEO changes: Update `src/lib/metadata.ts` or business data
4. Build and test: Run `npm run build` to generate static export in `out/` directory
5. Deployment: Static files in `out/` directory ready for GitHub Pages

### Key Dependencies
- **Next.js 15+**: React framework with App Router
- **React 19**: Latest React version
- **TypeScript**: Type safety throughout
- **Tailwind CSS 4**: Styling framework
- **Gray-matter**: Markdown frontmatter parsing
- **React-markdown**: Markdown rendering
- **Embla Carousel**: Image carousel functionality
- **Lucide React**: Icon library

### Shadcn/ui Registry System
The project uses Shadcn/ui's registry system for component management:

**Registry Configuration** (`components.json`):
- Schema: `https://ui.shadcn.com/schema.json`
- Style: "new-york" variant
- TSX/RSC enabled
- Default registry: `https://ui.shadcn.com/r`

**Registry Structure** supports:
- `registry:component` - Individual UI components
- `registry:block` - Complete component blocks
- `registry:ui` - UI-specific components
- `registry:lib` - Utility libraries
- `registry:hook` - Custom React hooks

**Adding Components**:
```bash
npx shadcn@latest add [component-name]
```

Custom registries can be added to `components.json` following the registry.json schema format with fields: `$schema`, `name`, `homepage`, and `items` array.