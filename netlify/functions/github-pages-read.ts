import type { Handler } from "@netlify/functions";

const GITHUB_REPO_OWNER = "GabrielCodeProject";
const GITHUB_REPO_NAME = "pool";

const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,x-admin-secret",
        "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
        "Content-Type": "application/json",
      },
      body: "",
    };
  }

  try {
    const slug = event.queryStringParameters?.slug;
    if (!slug) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Missing slug parameter" }),
      };
    }
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/content/pages/${slug}.md`;
    const headers: Record<string, string> = {};
    const token = process.env.GITHUB_TOKEN;
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(apiUrl, { headers });
    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: `GitHub API error: ${res.status}` }),
      };
    }
    const file = await res.json();
    const content = Buffer.from(file.content, "base64").toString("utf-8");
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "",
        "Access-Control-Allow-Methods": "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: file.name, sha: file.sha, content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "",
        "Access-Control-Allow-Methods": "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: (err as Error).message }),
    };
  }
};

export { handler };
