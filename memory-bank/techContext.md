# Tech Context

## Technologies Used

- Next.js (static export)
- React (frontend)
- Shadcn UI (UI components)
- Netlify Functions (serverless backend)
- GitHub API (content storage and versioning)
- Markdown (content format)
- TypeScript (where applicable)

## Development Setup

- Static site code in `src/`.
- Markdown content in `content/pages/`.
- Netlify Functions in `netlify/functions/`.
- Environment variables managed via `.env` (local) and Netlify dashboard (prod).
- Deployed static site to GitHub Pages; backend to Netlify.

## Technical Constraints

- No dynamic Next.js API routes (static export only).
- All dynamic/admin features must use Netlify Functions.
- CORS must be handled for all API endpoints.
- Secrets must not be exposed in the static build.

## Dependencies

- next, react, react-dom
- gray-matter (markdown frontmatter parsing)
- react-markdown (markdown rendering)
- shadcn/ui (UI components)
