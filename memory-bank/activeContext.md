# Active Context

## Current Work Focus

- Ensuring Netlify CMS is accessible at `/admin` locally and on GitHub Pages, with correct config and image paths.
- Debugging the 404 error when accessing `/admin` locally.
- Verifying all CMS config and static files are correct.
- Enabling non-developers to manage services (name, description, price) via CMS by updating markdown frontmatter and config.

## Recent Changes

- Removed custom admin panel (`src/app/admin/page.tsx`).
- Migrated to Netlify CMS with the GitHub backend (no serverless functions).
- Updated documentation and Memory Bank to reflect new architecture.
- Added `services` array to home page frontmatter.
- Updated React code to render services as cards below the carousel.
- Fixed YAML config for Netlify CMS: block style required for nested fields.

## Next Steps

- Resolve the `/admin` 404 issue locally.
- Ensure all CMS config and static files are correct.
- Verify CMS UI allows editing of services.
- Document the services frontmatter pattern and YAML block style requirement in .cursorrules.
- Document the pure-static workflow and image path conventions.

## Active Decisions

- Use Netlify CMS (GitHub backend) for all admin/content management.
- No serverless backend or custom API endpoints.
- Prioritize clear, user-friendly admin UI and safe content editing workflows.
- Require block style YAML for nested fields in config.yml.
