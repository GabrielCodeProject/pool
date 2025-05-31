# Active Context

## Current Work Focus

- Ensuring Netlify CMS is accessible at `/admin` locally and on GitHub Pages, with correct config and image paths.
- Verifying all CMS config and static files are correct.
- Enabling non-developers to manage services (name, description, price) and promotions (image, text) via CMS by updating markdown frontmatter and config.
- Ensuring markdown content (from # heading onward) is rendered with custom typography components for a consistent, modern UI.

## Recent Changes

- `/admin` now works locally for Netlify CMS access and editing.
- CMS UI allows editing for both services and promotions (dynamic arrays in frontmatter).
- Removed custom admin panel (`src/app/admin/page.tsx`).
- Migrated to Netlify CMS with the GitHub backend (no serverless functions).
- Updated documentation and Memory Bank to reflect new architecture.
- Added `services` array to home page frontmatter.
- Added `promotions` array to home page frontmatter and refactored React code to render a dynamic carousel from this list.
- Updated React code to render markdown content using custom typography components (TypographyH1, TypographyP, etc.) for all markdown body content.
- Updated Netlify CMS config to use a `promotions` list (array of objects with image and text) instead of individual promo fields.
- Fixed YAML config for Netlify CMS: block style required for nested fields.

## Next Steps

- Ensure all CMS config and static files are correct.
- Document the services and promotions frontmatter pattern and YAML block style requirement in .cursorrules.
- Document the pure-static workflow and image path conventions.

## Active Decisions

- Use Netlify CMS (GitHub backend) for all admin/content management.
- No serverless backend or custom API endpoints.
- Prioritize clear, user-friendly admin UI and safe content editing workflows.
- Require block style YAML for nested fields in config.yml.
- Use custom React components for markdown rendering to ensure consistent, branded UI.
