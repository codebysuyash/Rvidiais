import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { PrismaClient } from "@prisma/client";
import {
  generateJWT,
  setTokenCookie,
  createSecureCookieOptions,
} from "@/lib/auth-utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Create clients lazily to avoid side-effects during build time
    const prisma = new PrismaClient();

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID || "",
      process.env.GOOGLE_CLIENT_SECRET || "",
      process.env.GOOGLE_REDIRECT_URI || ""
    );
    console.log("=== Google OAuth callback initiated ===");
    console.log("Request URL:", request.url);

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const state = searchParams.get("state");

    console.log("Received parameters:");
    console.log(
      "- code:",
      code ? "Present (" + code.substring(0, 10) + "...)" : "Missing"
    );
    console.log("- error:", error || "None");
    console.log("- state:", state || "None");

    // Parse the state parameter to get the role
    let userRole = "USER"; // Default role
    if (state) {
      try {
        const stateData = JSON.parse(state);
        userRole = stateData.role || "USER";
        console.log("Parsed role from state:", userRole);
      } catch (e) {
        console.log("Could not parse state parameter, using default role USER");
      }
    }

    if (error) {
      console.error("Google OAuth error:", error);
      return NextResponse.redirect(
        new URL(
          `/signin?error=google_auth_failed&details=${encodeURIComponent(
            error
          )}`,
          request.url
        )
      );
    }

    if (!code) {
      console.error("No authorization code received");
      return NextResponse.redirect(
        new URL("/signin?error=no_code", request.url)
      );
    }

    console.log("Exchanging code for tokens...");
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log("Getting user info from Google...");
    // Get user info from Google
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data: googleUser } = await oauth2.userinfo.get();

    console.log("Google user data:", {
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
    });

    if (!googleUser.email) {
      console.error("No email received from Google");
      return NextResponse.redirect(
        new URL("/signin?error=no_email", request.url)
      );
    }

    // Check if user exists
    console.log("Checking if user exists...");
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (!user) {
      console.log("Creating new user...");
      // Create new user with unique username
      let username = googleUser.email.split("@")[0];

      // Check if username exists and make it unique
      const existingUser = await prisma.user.findUnique({
        where: { username: username },
      });

      if (existingUser) {
        username = username + "_" + Math.random().toString(36).substring(7);
      }

      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          username: username,
          name: googleUser.name || googleUser.email.split("@")[0],
          googleId: googleUser.id,
          role: userRole, // Use the role from OAuth state
          password: "", // Empty password for Google users
        },
      });

      console.log("New user created with role:", userRole, "User ID:", user.id);
    } else if (!user.googleId) {
      console.log("Linking existing account with Google...");
      // Link existing account with Google
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId: googleUser.id },
      });
    }

    // Generate JWT token
    const token = generateJWT({
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      name: user.name || user.username || "User",
    });

    // Create response and set cookie
    const redirectUrl =
      user.role === "ADMIN"
        ? new URL("/admin", request.url)
        : new URL("/dashboard", request.url);

    console.log("Redirecting to:", redirectUrl.toString());

    const response = NextResponse.redirect(redirectUrl);
    setTokenCookie(response, token);

    // Also set legacy cookie for backward compatibility
    response.cookies.set("auth-token", token, createSecureCookieOptions());

    console.log("Google OAuth: Set auth cookies for user:", user.email);
    console.log("=== Google OAuth callback completed successfully ===");

    return response;
  } catch (error) {
    console.error("=== Google OAuth callback error ===", error);
    return NextResponse.redirect(
      new URL(
        `/signin?error=google_auth_error&details=${encodeURIComponent(
          String(error)
        )}`,
        request.url
      )
    );
  }
}
