# System Patterns

## System Architecture

- Static Next.js site exported and deployed to GitHub Pages.
- Content stored as markdown in `content/pages/` in the GitHub repo.
- Netlify Functions provide all dynamic/admin API endpoints, interacting with the GitHub API.
- Admin UI is part of the static site, but all admin actions go through Netlify Functions.

## Key Technical Decisions

- Use of static export for maximum compatibility with GitHub Pages.
- All dynamic logic (read/write content, authentication) handled by Netlify Functions, not Next.js API routes.
- CORS and preflight handling for all cross-origin API calls.
- Environment variables for secrets (GitHub token, admin secret) managed in Netlify.

## Design Patterns

- Separation of static and dynamic concerns (static site vs. serverless backend).
- Form-based frontmatter editing to prevent YAML errors.
- Live markdown preview for better UX.

## Component Relationships

- Static site fetches content from Netlify Functions.
- Admin UI interacts with Netlify Functions for all content management.
- Netlify Functions interact with GitHub API for content CRUD.
