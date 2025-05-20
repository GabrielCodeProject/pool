# Tech Context

## Technologies Used

- Next.js (static export)
- React (frontend)
- Shadcn UI (UI components)
- Netlify CMS (GitHub backend, served at /admin)
- GitHub API (content storage and versioning, via Netlify CMS)
- Markdown (content format)
- TypeScript (where applicable)

## Development Setup

- Static site code in `src/`.
- Markdown content in `content/pages/`.
- Netlify CMS config in `public/admin/config.yml`.
- Images uploaded via CMS to `public/images/uploads/`.
- Deployed static site to GitHub Pages.

## Technical Constraints

- No dynamic Next.js API routes (static export only).
- No serverless backend or Netlify Functions.
- All admin/content management is client-side via Netlify CMS and the GitHub API.
- Secrets are managed by Netlify CMS OAuth; no backend secrets required.

## Dependencies

- next, react, react-dom
- gray-matter (markdown frontmatter parsing)
- react-markdown (markdown rendering)
- shadcn/ui (UI components)
- netlify-cms-app (CMS)
