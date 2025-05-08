import { cookies } from "next/headers";
import { ALLOWED_USERS } from "@/config/allowedUsers";

const GITHUB_TOKEN_COOKIE = "github_token";

export async function getGitHubToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get(GITHUB_TOKEN_COOKIE)?.value;
  if (!token) throw new Error("Missing GitHub token");
  return token;
}

export async function assertAllowedUser(token: string) {
  const res = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub user");
  const user = await res.json();
  if (!ALLOWED_USERS.includes(user.login)) {
    throw new Error("User not allowed");
  }
  return user;
}
