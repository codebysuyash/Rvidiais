import { NextResponse } from "next/server";
import { google } from "googleapis";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    console.log("Google OAuth initiation started");
    console.log("Client ID:", process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set");
    console.log("Redirect URI:", process.env.GOOGLE_REDIRECT_URI);

    // Parse URL to get role parameter
    const url = new URL(request.url);
    const role = url.searchParams.get("role") || "user"; // Default to 'user' if no role specified

    console.log("Requested role:", role);

    const scopes = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
      state: JSON.stringify({ role: role.toUpperCase() }), // Pass role in state parameter
    });

    console.log("Generated auth URL with role:", role);
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("Google OAuth initiation error:", error);
    return NextResponse.json(
      { error: "Failed to initiate Google OAuth" },
      { status: 500 }
    );
  }
}
