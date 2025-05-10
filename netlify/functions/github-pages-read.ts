import type { Handler } from "@netlify/functions";

const GITHUB_REPO_OWNER = "GabrielCodeProject";
const GITHUB_REPO_NAME = "pool";

const handler: Handler = async (event) => {
  try {
    const slug = event.queryStringParameters?.slug;
    if (!slug) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing slug parameter" }),
      };
    }
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/content/pages/${slug}.md`;
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
    const file = await res.json();
    const content = Buffer.from(file.content, "base64").toString("utf-8");
    return {
      statusCode: 200,
      body: JSON.stringify({ name: file.name, sha: file.sha, content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (err as Error).message }),
    };
  }
};

export { handler };
