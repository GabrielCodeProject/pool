export const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://your-netlify-site.netlify.app/.netlify/functions"
    : "/.netlify/functions";
