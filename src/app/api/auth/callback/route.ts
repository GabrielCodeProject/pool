import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const client_id = process.env.GITHUB_CLIENT_ID!;
  const client_secret = process.env.GITHUB_CLIENT_SECRET!;

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams({
      client_id,
      client_secret,
      code: code || "",
    }),
  });

  const data = await res.json();
  const token = data.access_token;

  // Save token to cookie (for example) or redirect with token in query
  return NextResponse.redirect(
    `https://gabrielcodeproject.github.io/pool/admin?token=${token}`
  );
}
