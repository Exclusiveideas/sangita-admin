/** @type {import('next').NextConfig} */
const config = {
    typescript: {
        ignoreBuildErrors: true, // 👈 this skips type checking during build
    },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint check in production build
  },
}

export default config;
