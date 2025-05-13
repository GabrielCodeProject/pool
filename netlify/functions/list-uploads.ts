import type { Handler } from "@netlify/functions";
import { Octokit } from "@octokit/core";

const GITHUB_REPO_OWNER = "GabrielCodeProject";
const GITHUB_REPO_NAME = "pool";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const handler: Handler = async () => {
  if (!GITHUB_TOKEN) {
    return { statusCode: 500, body: "Missing GITHUB_TOKEN" };
  }
  const octokit = new Octokit({ auth: GITHUB_TOKEN });
  const res = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: GITHUB_REPO_OWNER,
      repo: GITHUB_REPO_NAME,
      path: "public/images/uploads",
    }
  );
  const files = (res.data as Array<{ name: string; type: string }>)
    .filter((f) => f.type === "file")
    .map((f) => f.name);
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(files),
  };
};
