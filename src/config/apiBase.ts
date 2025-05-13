export const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://zingy-gnome-ade060.netlify.app/.netlify/functions"
    : "/.netlify/functions";
