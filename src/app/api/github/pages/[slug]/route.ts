import { NextRequest, NextResponse } from "next/server";
import { getGitHubToken, assertAllowedUser } from "@/lib/githubAuth";
import { GITHUB_REPO_OWNER, GITHUB_REPO_NAME } from "@/config/githubRepo";

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (
    typeof err === "object" &&
    err &&
    "message" in err &&
    typeof (err as { message?: unknown }).message === "string"
  ) {
    return (err as { message: string }).message;
  }
  return String(err);
}

function extractSlug(pathname: string) {
  // /api/github/pages/[slug] => slug
  const parts = pathname.split("/");
  return parts[parts.length - 1];
}

// GET: Fetch file content (public access allowed)
export async function GET(request: NextRequest) {
  try {
    const slug = extractSlug(request.nextUrl.pathname);
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/content/pages/${slug}.md`;
    let token: string | undefined = undefined;
    try {
      token = await getGitHubToken();
    } catch {}
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(apiUrl, { headers });
    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }
    const file = await res.json();
    // file.content is base64-encoded
    const content = Buffer.from(file.content, "base64").toString("utf-8");
    return NextResponse.json({ name: file.name, sha: file.sha, content });
  } catch (err: unknown) {
    const message = getErrorMessage(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT: Update file content (admin only)
export async function PUT(request: NextRequest) {
  try {
    const token = await getGitHubToken();
    await assertAllowedUser(token);
    const slug = extractSlug(request.nextUrl.pathname);
    const { content, sha } = await request.json();
    if (!content || !sha) {
      return NextResponse.json(
        { error: "Missing content or sha" },
        { status: 400 }
      );
    }
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/content/pages/${slug}.md`;
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
      throw new Error(error.message || `GitHub API error: ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json({ content: data.content });
  } catch (err: unknown) {
    const message = getErrorMessage(err);
    if (message === "Missing GitHub token") {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    if (message === "User not allowed") {
      return NextResponse.json({ error: message }, { status: 403 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
