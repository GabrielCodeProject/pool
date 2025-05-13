# Project Brief

## Overview

This project is a static Next.js site deployed to GitHub Pages, with content managed as markdown files in the repository. It features a GitHub-based CMS for editing content, using Netlify Functions as a serverless backend for admin and API operations.

## Core Requirements

- **Static Site Generation:** The main site is built with Next.js static export and deployed to GitHub Pages.
- **Content Management:** Content is stored as markdown files in `content/pages/` within the GitHub repository.
- **Admin UI:** A web-based admin panel allows invited users to edit markdown content, including frontmatter, with live preview.
- **Backend/API:** All dynamic/admin features are handled by Netlify Functions, which interact with the GitHub API to read and update content.
- **Authentication:** Only invited users can edit content, authenticated via a secret or GitHub OAuth.
- **CORS:** Robust CORS and preflight handling for all Netlify Functions to support cross-origin requests from GitHub Pages.
- **Environment Variables:** Secrets (GitHub token, admin secret) are managed via Netlify environment variables.

## Goals

- Provide a user-friendly, modern CMS experience for non-technical users.
- Ensure secure, reliable content editing and publishing workflows.
- Maintain a clear separation between static site and dynamic backend.
