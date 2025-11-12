"use client";

// Build: 2025-11-12 - Vercel deployment with Prisma client generation fix
import { useAuthContext } from "@/components/auth-provider";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { RoleDemoInfo } from "@/components/role-demo-info";
import { SessionManager } from "@/lib/client/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cpu, Zap, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import OptimizedSpline from "@/components/optimized-spline";

export default function HomePage() {
  const { isAuthenticated, user, loading } = useAuthContext();
  const router = useRouter();

  // Removed automatic redirect - users can manually navigate to dashboard/admin
  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     if (user.role === "ADMIN" || user.role === "admin") {
  //       router.push("/admin");
  //     } else {
  //       router.push("/dashboard");
  //     }
  //   }
  // }, [isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  // Removed the automatic redirect for authenticated users - now they can see the homepage

  return (
    <div className="relative overflow-x-hidden">
      {/* Fixed Header - Only show when not authenticated */}
      {!isAuthenticated && (
        <header className="fixed top-0 left-0 right-0 z-[100] bg-black border-b border-white/10">
          <div className="w-full px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            {/* Logo and Brand - Top Left Corner */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 flex items-center justify-center flex-shrink-0">
                <img
                  src="/Screenshot 2025-09-21 at 12.36.07 PM.svg"
                  alt="Rvidia Logo"
                  className="w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 object-contain"
                />
              </div>
              <span
                className="text-white font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide whitespace-nowrap"
                style={{ fontFamily: "Lato, sans-serif", fontWeight: "375" }}
              >
                Rvidia
              </span>
            </div>

            {/* Navigation Buttons - Top Right Corner */}
            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={() => router.push("/signin")}
                className="px-2 py-1 sm:px-3 sm:py-1.5 text-sm sm:text-base md:text-lg lg:text-xl text-white hover:text-white/80 transition-colors duration-200 hover:bg-white/5 rounded-md whitespace-nowrap"
                style={{ fontFamily: "Lato, sans-serif", fontWeight: "300" }}
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="px-2 py-1 sm:px-3 sm:py-1.5 text-sm sm:text-base md:text-lg lg:text-xl bg-[#0B42F4] text-white rounded-md transition-colors duration-200 whitespace-nowrap"
                style={{ fontFamily: "Lato, sans-serif", fontWeight: "300" }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Home Section */}
      <div className="relative min-h-screen">
        {/* Spline 3D Background - Only for Hero Section */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <OptimizedSpline
            scene="https://prod.spline.design/SigPuspoOrdLwScz/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* Text Overlay to Cover Spline Model Text */}
        <div className="absolute top-1/4 sm:top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none px-4 sm:px-6 w-full">
          <div className="text-center max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wider text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2 sm:mb-4 leading-tight"
              style={{ fontFamily: "Lato, sans-serif", fontWeight: "300" }}
            >
              Divide. Distribute. Done.
            </h1>
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wide text-center leading-relaxed"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: "300",
                color: "#7A7599",
              }}
            >
              We turn complex ideas into effortless experiences.
            </p>
          </div>
        </div>

        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-50 bg-black px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg">
          <span
            className="text-xs sm:text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              display: "inline-block",
              letterSpacing: "0.05em",
              animation: "wave 2s ease-in-out infinite",
            }}
          >
            {[
              "C",
              "o",
              "m",
              "p",
              "u",
              "t",
              "e",
              ".",
              " ",
              "S",
              "h",
              "a",
              "r",
              "e",
              ".",
              " ",
              "C",
              "o",
              "n",
              "q",
              "u",
              "e",
              "r",
              ".",
            ].map((char, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex flex-col items-center space-y-1 sm:space-y-2 animate-bounce">
            <span
              className="text-white/60 text-xs sm:text-sm font-medium"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Scroll to learn more
            </span>
            <div className="w-4 sm:w-6 h-8 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to give the 3D model more room */}
      <div className="bg-black h-16 sm:h-24 md:h-32"></div>

      {/* Section Divider 1 - Hero to Vision */}
      <div className="relative z-10 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-8 sm:py-12 md:py-16">
            <div className="w-full flex items-center justify-center">
              <div className="h-2 w-1/3 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-500 blur-md rounded-full"></div>
              <div className="mx-4 flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse shadow-xl"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-xl ml-3"></div>
              </div>
              <div className="h-2 w-1/3 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-500 blur-md rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Vision Section */}
      <div id="vision" className="relative min-h-screen z-10 bg-black">
        {/* SVG Background Elements - Only 07.svg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 07.svg - Left side covering left part */}
          <img
            src="/07.svg"
            alt=""
            className="absolute opacity-40 sm:opacity-60"
            style={{
              left: "-100px",
              top: "0px",
              width: "400px",
              height: "400px",
              filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
          <div className="max-w-2xl sm:max-w-4xl lg:max-w-6xl mx-auto">
            {/* Our Vision Header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4 sm:mb-6"
                style={{ fontFamily: "Lato, sans-serif", fontWeight: "300" }}
              >
                Our Vision
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
            </div>

            {/* Vision Content */}
            <div className="text-center">
              <p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/80 leading-relaxed max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4"
                style={{ fontFamily: "Lato, sans-serif", fontWeight: "300" }}
              >
                To democratize high-performance computing by dividing one task
                across many computers, making computation faster, smarter, and
                accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider 2 - Vision to About Us */}
      <div className="relative z-10 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-4 sm:py-6 md:py-8">
            <div className="w-full flex items-center justify-center">
              <div className="h-2 w-1/3 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 blur-md rounded-full"></div>
              <div className="mx-4 flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-xl"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse shadow-xl ml-3"></div>
              </div>
              <div className="h-2 w-1/3 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 blur-md rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about" className="relative min-h-screen z-10 bg-black">
        {/* SVG Background Elements - Only 4.svg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 4.svg - Right side */}
          <img
            src="/4.svg"
            alt=""
            className="absolute opacity-30 sm:opacity-50 hidden md:block"
            style={{
              left: "50%",
              top: "30%",
              width: "600px",
              height: "600px",
              filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
          <div className="max-w-2xl sm:max-w-4xl lg:max-w-6xl mx-auto">
            {/* About Us Header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4 sm:mb-6"
                style={{ fontFamily: "Lato, sans-serif", fontWeight: "300" }}
              >
                About Us
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
            </div>

            {/* Team Information */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-8 sm:mb-12 px-4"
                style={{ fontFamily: "Lato, sans-serif", fontWeight: "300" }}
              >
                We are a dedicated team of 4 passionate individuals, each
                bringing unique expertise to revolutionize the distributed
                computing landscape.
              </p>
            </div>

            {/* Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0">
              {/* Team Member 1 - Suyash Singh */}
              <div
                className="group relative max-w-sm mx-auto"
                style={{
                  animation: "slideInUp 0.6s ease-out 0.1s both",
                }}
              >
                <div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 relative overflow-hidden rounded-lg"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    {/* Default Description Overlay - Visible by default */}
                    <div
                      className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-300 flex items-center justify-center p-4 sm:p-6"
                      style={{ backgroundColor: "#772ED1" }}
                    >
                      <div className="text-center">
                        <p
                          className="text-white text-sm sm:text-base font-semibold mb-2 sm:mb-3"
                          style={{ fontFamily: "Lato, sans-serif" }}
                        >
                          Frontend UI
                        </p>
                        <p
                          className="text-white/90 text-xs sm:text-sm leading-relaxed"
                          style={{ fontFamily: "Lato, sans-serif" }}
                        >
                          Crafting beautiful and intuitive user interfaces.
                        </p>
                      </div>
                    </div>

                    {/* Photo - Hidden by default, shown on hover */}
                    <img
                      src="/team/suyash-singh.jpg"
                      alt="Suyash Singh"
                      className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl md:text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ display: "none", backgroundColor: "#772ED1" }}
                    >
                      SS
                    </div>
                  </div>

                  {/* Name and Role Section */}
                  <div className="p-3 sm:p-4 relative z-10">
                    <h3
                      className="text-white text-base sm:text-lg font-semibold text-center transition-colors duration-300 tracking-wide whitespace-nowrap"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "375",
                      }}
                    >
                      Suyash Singh
                    </h3>
                  </div>
                </div>
              </div>

              {/* Team Member 2 - Ishhan Kheria */}
              <div
                className="group relative max-w-sm mx-auto"
                style={{
                  animation: "slideInUp 0.6s ease-out 0.2s both",
                }}
              >
                <div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 relative overflow-hidden rounded-lg"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    {/* Default Description Overlay - Visible by default */}
                    <div
                      className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-300 flex items-center justify-center p-4 sm:p-6"
                      style={{ backgroundColor: "#772ED1" }}
                    >
                      <div className="text-center">
                        <p
                          className="text-white text-sm sm:text-base font-semibold mb-2 sm:mb-3"
                          style={{ fontFamily: "Lato, sans-serif" }}
                        >
                          Frontend API
                        </p>
                        <p
                          className="text-white/90 text-xs sm:text-sm leading-relaxed"
                          style={{ fontFamily: "Lato, sans-serif" }}
                        >
                          Connecting frontend and backend services.
                        </p>
                      </div>
                    </div>

                    {/* Photo - Hidden by default, shown on hover */}
                    <img
                      src="/team/ishhan-kheria.jpg"
                      alt="Ishhan Kheria"
                      className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl md:text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ display: "none", backgroundColor: "#772ED1" }}
                    >
                      IK
                    </div>
                  </div>

                  {/* Name and Role Section */}
                  <div className="p-3 sm:p-4 relative z-10">
                    <h3
                      className="text-white text-base sm:text-lg text-center transition-colors duration-300"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "375",
                      }}
                    >
                      Ishhan Kheria
                    </h3>
                  </div>
                </div>
              </div>

              {/* Team Member 3 - Samarth Naik */}
              <div
                className="group relative max-w-sm mx-auto"
                style={{
                  animation: "slideInUp 0.6s ease-out 0.3s both",
                }}
              >
                <div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 relative overflow-hidden rounded-lg"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    {/* Default Description Overlay - Visible by default */}
                    <div
                      className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-300 flex items-center justify-center p-4 sm:p-6"
                      style={{ backgroundColor: "#772ED1" }}
                    >
                      <div className="text-center">
                        <p
                          className="text-white text-sm sm:text-base font-semibold mb-2 sm:mb-3"
                          style={{ fontFamily: "Lato, sans-serif" }}
                        >
                          Backend
                        </p>
                        <p
                          className="text-white/90 text-xs sm:text-sm leading-relaxed"
                          style={{ fontFamily: "Lato, sans-serif" }}
                        >
                          Developing robust server infrastructure and
                          distributed computing algorithms.
                        </p>
                      </div>
                    </div>

                    {/* Photo - Hidden by default, shown on hover */}
                    <img
                      src="/team/samarth-naik.jpg"
                      alt="Samarth Naik"
                      className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl md:text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ display: "none", backgroundColor: "#772ED1" }}
                    >
                      SN
                    </div>
                  </div>

                  {/* Name and Role Section */}
                  <div className="p-3 sm:p-4 relative z-10">
                    <h3
                      className="text-white text-base sm:text-lg text-center transition-colors duration-300"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "375",
                      }}
                    >
                      Samarth Naik
                    </h3>
                  </div>
                </div>
              </div>

              {/* Team Member 4 - Inesh Ingid */}
              <div
                className="group relative max-w-sm mx-auto"
                style={{
                  animation: "slideInUp 0.6s ease-out 0.4s both",
                }}
              >
                <div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 relative overflow-hidden rounded-lg"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    {/* Default Description Overlay - Visible by default */}
                    <div
                      className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-300 flex items-center justify-center p-4 sm:p-6"
                      style={{ backgroundColor: "#772ED1" }}
                    >
                      <div className="text-center">
                        <p
                          className="text-white text-sm sm:text-base font-semibold mb-2 sm:mb-3"
                          style={{ fontFamily: "Lato, sans-serif" }}
                        >
                          Design & Research
                        </p>
                        <p
                          className="text-white/90 text-xs sm:text-sm leading-relaxed"
                          style={{ fontFamily: "Lato, sans-serif" }}
                        >
                          Leading user experience design and conducting
                          research.
                        </p>
                      </div>
                    </div>

                    {/* Photo - Hidden by default, shown on hover */}
                    <img
                      src="/team/inesh-ingid.jpg"
                      alt="Inesh Ingid"
                      className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl md:text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ display: "none", backgroundColor: "#772ED1" }}
                    >
                      II
                    </div>
                  </div>

                  {/* Name and Role Section */}
                  <div className="p-3 sm:p-4 relative z-10">
                    <h3
                      className="text-white text-base sm:text-lg text-center transition-colors duration-300"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "375",
                      }}
                    >
                      Inesh Ingid
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="relative z-10 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Footer Main Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
              {/* Company Info */}
              <div className="sm:col-span-2 lg:col-span-2">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    <img
                      src="/Screenshot 2025-09-21 at 12.36.07 PM.svg"
                      alt="Rvidia Logo"
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                  <span
                    className="text-white font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-wide"
                    style={{
                      fontFamily: "Lato, sans-serif",
                      fontWeight: "375",
                    }}
                  >
                    Rvidia
                  </span>
                </div>
                <p
                  className="text-white/70 text-base sm:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 max-w-xs sm:max-w-lg"
                  style={{ fontFamily: "Lato, sans-serif", fontWeight: "300" }}
                >
                  Democratizing high-performance computing through distributed
                  processing. Making computation faster, smarter, and accessible
                  to everyone.
                </p>
                <div className="flex space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3
                  className="text-white font-semibold text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6"
                  style={{ fontFamily: "Lato, sans-serif", fontWeight: "400" }}
                >
                  Quick Links
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <button
                      onClick={() => {
                        const element = document.getElementById("vision");
                        element?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      className="text-white/60 hover:text-white transition-colors text-sm sm:text-base lg:text-lg text-left"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      Our Vision
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        const element = document.getElementById("about");
                        element?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      className="text-white/60 hover:text-white transition-colors text-sm sm:text-base lg:text-lg text-left"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/signin")}
                      className="text-white/60 hover:text-white transition-colors text-sm sm:text-base lg:text-lg text-left"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      Sign In
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/signup")}
                      className="text-white/60 hover:text-white transition-colors text-sm sm:text-base lg:text-lg text-left"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      Get Started
                    </button>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3
                  className="text-white font-semibold text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6"
                  style={{ fontFamily: "Lato, sans-serif", fontWeight: "400" }}
                >
                  Connect
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-400 rounded-full"></div>
                    </div>
                    <span
                      className="text-white/60 text-sm sm:text-base lg:text-lg break-all"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      hello@rvidia.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full"></div>
                    </div>
                    <span
                      className="text-white/60 text-sm sm:text-base lg:text-lg break-all"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      support@rvidia.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-white/10 pt-6 sm:pt-8 md:pt-10">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 gap-4">
                <div className="flex items-center space-x-4">
                  <p
                    className="text-white/50 text-sm sm:text-base lg:text-lg text-center lg:text-left"
                    style={{
                      fontFamily: "Lato, sans-serif",
                      fontWeight: "300",
                    }}
                  >
                    © 2025 Rvidia. All rights reserved.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-8">
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <a
                      href="#"
                      className="text-white/50 hover:text-white transition-colors text-sm sm:text-base lg:text-lg"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="#"
                      className="text-white/50 hover:text-white transition-colors text-sm sm:text-base lg:text-lg"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      Terms of Service
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span
                      className="text-white/30 text-xs sm:text-sm lg:text-base"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      Built with
                    </span>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                    <span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-xs sm:text-sm lg:text-base font-medium"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      NextJS with tailwind CSS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
