# Progress

## What Works

- Homepage UI/UX refactored to use Shadcn UI components (Card, Skeleton, Alert, Typography) for a modern, user-friendly experience.
- Netlify CMS integrated for editing markdown content (with live preview and safe frontmatter editing).
- All content and images are managed via markdown and the `public/images/uploads/` directory.
- Memory Bank updated to reflect new architecture.

## What's Left to Build

- Resolve the `/admin` 404 issue locally (current blocker).
- Ensure all CMS config and static files are correct.
- Optional: Enhance admin authentication (e.g., GitHub OAuth, user management UI).
- Optional: Add more content types or richer markdown features.

## Current Status

- Static site and CMS are working as intended except for the `/admin` 404 issue locally.
- All major cross-origin, API, and UI issues resolved except for CMS access.

## Known Issues

- `/admin` returns 404 locally despite correct files/config (current blocker).
