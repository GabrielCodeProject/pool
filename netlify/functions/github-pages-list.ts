import type { Handler } from "@netlify/functions";

const GITHUB_REPO_OWNER = "GabrielCodeProject"; // Update as needed
const GITHUB_REPO_NAME = "pool"; // Update as needed

const handler: Handler = async (event, context) => {
  try {
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/content/pages`;
    const headers: Record<string, string> = {};
    const token = process.env.GITHUB_TOKEN;
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(apiUrl, { headers });
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `GitHub API error: ${res.status}` }),
      };
    }
    const files: Array<{ name: string; type: string }> = await res.json();
    const markdownFiles = files
      .filter((f) => f.type === "file" && f.name.endsWith(".md"))
      .map((f) => ({
        name: f.name,
        slug: f.name.replace(/\.md$/, ""),
      }));
    return {
      statusCode: 200,
      body: JSON.stringify({ files: markdownFiles }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (err as Error).message }),
    };
  }
};

export { handler };
