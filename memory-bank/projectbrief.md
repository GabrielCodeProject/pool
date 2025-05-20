# Project Brief

## Overview

This project is a static Next.js site deployed to GitHub Pages, with content managed as markdown files in the repository. It features a GitHub-based CMS (Netlify CMS) for editing content, using the GitHub backend (no serverless functions or custom API endpoints).

## Core Requirements

- **Static Site Generation:** The main site is built with Next.js static export and deployed to GitHub Pages.
- **Content Management:** Content is stored as markdown files in `content/pages/` within the GitHub repository.
- **Admin UI:** Netlify CMS is served at `/admin`, allowing invited users to edit markdown content, including frontmatter and images, with live preview.
- **Backend/API:** All admin features are handled client-side via the GitHub API (Netlify CMS GitHub backend). No serverless functions or custom API endpoints are used.
- **Authentication:** Only invited users can edit content, authenticated via GitHub OAuth through Netlify CMS.
- **Image Uploads:** Images are uploaded via the CMS and stored in `public/images/uploads/`.
- **Environment Variables:** GitHub authentication is handled by Netlify CMS; no backend secrets are required.

## Goals

- Provide a user-friendly, modern CMS experience for non-technical users.
- Ensure secure, reliable content editing and publishing workflows.
- Maintain a clear separation between static site and client-side admin logic.
