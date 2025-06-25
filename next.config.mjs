/** @type {import('next').NextConfig} */
const config = {
    typescript: {
        ignoreBuildErrors: true, // 👈 this skips type checking during build
    },
}

export default config;
