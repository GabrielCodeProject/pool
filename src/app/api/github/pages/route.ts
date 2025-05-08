import { NextResponse } from "next/server";
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

// TODO: Implement logic to list markdown files in /content/pages via GitHub API
export async function GET() {
  try {
    const token = await getGitHubToken();
    await assertAllowedUser(token);

    // List files in /content/pages via GitHub API
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/content/pages`;
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }
    const files: Array<{ name: string; type: string }> = await res.json();
    // files is an array of objects with 'name' and 'type'
    const markdownFiles = files
      .filter((f) => f.type === "file" && f.name.endsWith(".md"))
      .map((f) => ({
        name: f.name,
        slug: f.name.replace(/\.md$/, ""),
      }));
    return NextResponse.json({ files: markdownFiles });
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
