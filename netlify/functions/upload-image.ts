import type { Handler, HandlerResponse } from "@netlify/functions";
import { Octokit } from "@octokit/core";

const GITHUB_REPO_OWNER = "GabrielCodeProject";
const GITHUB_REPO_NAME = "pool";
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,x-admin-secret",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Content-Type": "application/json",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Simple admin check
  const reqSecret = event.headers["x-admin-secret"];
  if (!ADMIN_SECRET || reqSecret !== ADMIN_SECRET) {
    return {
      statusCode: 401,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  if (!GITHUB_TOKEN) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Missing GITHUB_TOKEN" }),
    };
  }

  // Parse multipart form data
  const contentType =
    event.headers["content-type"] || event.headers["Content-Type"];
  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        error: "Content-Type must be multipart/form-data",
      }),
    };
  }

  // Use dynamic import for busboy
  const busboy = (await import("busboy")).default;
  const bb = busboy({ headers: { "content-type": contentType } });
  const fileBuffer: Buffer[] = [];
  let fileName = "";
  let fileMime = "";
  let fileFound = false;

  return new Promise<HandlerResponse>((resolve) => {
    bb.on("file", (_fieldname: string, file: unknown, info: unknown) => {
      fileFound = true;
      const typedInfo = info as { filename: string; mimeType: string };
      fileName = typedInfo.filename;
      fileMime = typedInfo.mimeType;
      (file as { on: (event: string, cb: (data: Buffer) => void) => void }).on(
        "data",
        (data: Buffer) => fileBuffer.push(data)
      );
    });
    bb.on("finish", async () => {
      if (!fileFound || !fileName) {
        resolve({
          statusCode: 400,
          headers: { "Access-Control-Allow-Origin": "*" },
          body: JSON.stringify({ error: "No file uploaded" }),
        });
        return;
      }
      const buffer = Buffer.concat(fileBuffer);
      const octokit = new Octokit({ auth: GITHUB_TOKEN });
      const path = `public/images/uploads/${fileName}`;
      // Get SHA if file exists (for update)
      let sha: string | undefined = undefined;
      try {
        const { data } = await octokit.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          {
            owner: GITHUB_REPO_OWNER,
            repo: GITHUB_REPO_NAME,
            path,
          }
        );
        sha = (data as { sha?: string }).sha;
      } catch {
        // Not found is fine (new file)
      }
      // Commit file
      await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
        owner: GITHUB_REPO_OWNER,
        repo: GITHUB_REPO_NAME,
        path,
        message: `Upload image ${fileName} via CMS`,
        content: buffer.toString("base64"),
        branch: "main",
        ...(sha ? { sha } : {}),
      });
      resolve({
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          url: `/images/uploads/${fileName}`,
          fileName,
          mimeType: fileMime,
        }),
      });
    });
    bb.end(
      Buffer.from(event.body!, event.isBase64Encoded ? "base64" : undefined)
    );
  });
};
