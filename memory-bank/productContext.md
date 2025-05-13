# Product Context

## Why This Project Exists

- To provide a simple, user-friendly CMS for static sites, enabling non-technical users to manage content without direct GitHub or code access.
- To leverage GitHub as a single source of truth for content, with a modern editing UI and secure workflow.

## Problems It Solves

- Non-technical users struggle to edit markdown or manage content in GitHub directly.
- Static site generators lack easy, secure, and user-friendly content management for non-developers.
- Need for a workflow that separates static site delivery (GitHub Pages) from dynamic admin/API logic (Netlify Functions).

## How It Should Work

- Users visit the static site for content.
- Admins log in to a web UI to edit markdown files, with live preview and safe frontmatter editing.
- Changes are committed to GitHub, triggering a new static build.

## User Experience Goals

- Intuitive, modern UI for editing and previewing content.
- Safe editing of frontmatter and markdown body.
- Fast, reliable publishing with clear feedback.
