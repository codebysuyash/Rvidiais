import { NextRequest, NextResponse } from "next/server";
import { verifyJWT, clearTokenCookie } from "@/lib/auth-utils";
import { getUserById } from "@/lib/user";

const AUTH_COOKIE_NAME = "auth_token";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Get all cookies for debugging
    const allCookies = request.cookies.getAll();
    console.log(
      "API /auth: All cookies:",
      Object.fromEntries(allCookies.map((c) => [c.name, c.value]))
    );
    console.log("API /auth: Cookie count:", allCookies.length);

    // Also log individual cookie access attempts
    console.log("API /auth: Checking for auth_token cookie...");
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    console.log(
      "API /auth: auth_token value:",
      token ? "present" : "not found"
    );

    // Also check for auth-token for backward compatibility
    console.log("API /auth: Checking for auth-token cookie...");
    const legacyToken = request.cookies.get("auth-token")?.value;
    console.log(
      "API /auth: auth-token value:",
      legacyToken ? "present" : "not found"
    );

    if (legacyToken && !token) {
      console.log("API /auth: Found legacy token but not new token");
    }

    const finalToken = token || legacyToken;

    if (!finalToken) {
      console.log("API /auth: No auth token found");
      return NextResponse.json(
        { error: "No authentication token found" },
        { status: 401 }
      );
    }

    console.log("API /auth: Verifying token...");
    // Verify JWT token
    const decoded = verifyJWT(finalToken);

    if (!decoded) {
      console.log("API /auth: Invalid token");

      // Return response with cleared cookies
      const response = NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );

      // Clear both cookie types
      response.cookies.set(AUTH_COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      });

      response.cookies.set("auth-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      });

      return response;
    }

    console.log("API /auth: Token decoded, userId:", decoded.userId);

    // Get fresh user data from database
    const user = await getUserById(decoded.userId);

    if (!user) {
      console.log("API /auth: User not found for ID:", decoded.userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("API /auth: User found:", user.email);

    // Return user data without password
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("API /auth: Auth verification error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Sign out by clearing the auth cookie
  const response = NextResponse.json({
    success: true,
    message: "Signed out successfully",
  });

  // Clear the auth cookie using our utility function
  clearTokenCookie(response);

  // Also clear legacy cookie for backward compatibility
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  return response;
}
