import { NextResponse } from "next/server";

export async function GET() {
  const client_id = process.env.GITHUB_CLIENT_ID!;
  const redirect_uri =
    "https://gabrielcodeproject.github.io/pool/auth/callback";

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo`
  );
}
