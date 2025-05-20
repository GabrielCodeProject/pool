# System Patterns

## System Architecture

- Static Next.js site exported and deployed to GitHub Pages.
- Content stored as markdown in `content/pages/` in the GitHub repo.
- Netlify CMS (served at `/admin`) provides all admin/content management, interacting directly with the GitHub API via the browser.
- No serverless backend or custom API endpoints.

## Key Technical Decisions

- Use of static export for maximum compatibility with GitHub Pages.
- All admin/content management logic handled client-side by Netlify CMS (GitHub backend).
- No dynamic Next.js API routes or serverless functions.
- Image uploads and markdown edits are committed directly to the GitHub repo via the CMS UI.

## Design Patterns

- Separation of static site and client-side admin logic.
- Form-based frontmatter editing to prevent YAML errors.
- Live markdown preview for better UX.

## Component Relationships

- Static site fetches content from markdown files in the repo.
- Admin UI (Netlify CMS) interacts with the GitHub API for all content management.
