import type { Handler } from "@netlify/functions";

const GITHUB_REPO_OWNER = "GabrielCodeProject";
const GITHUB_REPO_NAME = "pool";
const ADMIN_SECRET = process.env.ADMIN_SECRET;

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
    if (event.httpMethod !== "PUT") {
      return {
        statusCode: 405,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "",
          "Content-Type": "application/json",
        },
        body: "Method Not Allowed",
      };
    }
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
    // Simple admin check
    const reqSecret = event.headers["x-admin-secret"];
    if (!ADMIN_SECRET || reqSecret !== ADMIN_SECRET) {
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Unauthorized" }),
      };
    }
    const { content, sha } = JSON.parse(event.body || "{}");
    if (!content || !sha) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Missing content or sha" }),
      };
    }
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/content/pages/${slug}.md`;
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Missing GITHUB_TOKEN" }),
      };
    }
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Update ${slug}.md via CMS`,
        content: Buffer.from(content, "utf-8").toString("base64"),
        sha,
        branch: "main",
      }),
    });
    if (!res.ok) {
      const error = await res.json();
      return {
        statusCode: res.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: error.message || `GitHub API error: ${res.status}`,
        }),
      };
    }
    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "",
        "Access-Control-Allow-Methods": "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: data.content }),
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
