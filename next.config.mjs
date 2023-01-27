// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */

!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "dummyimage.com",
      "github.com",
      "imgur.com",
      "choice.marketing",
      "wraps.marketing",
      "lulu.com",
      "huffingtonpost.com",
      "google.nl",
      "booking.com",
      "yale.edu",
      "**.**", // for local development
    ],
  },
};

export default nextConfig;
