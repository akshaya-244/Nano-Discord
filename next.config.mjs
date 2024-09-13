/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: [
        "uploadthing.com",
        "utfs.io"
        ]
    },
    compiler: {
        react: {
          throwIfNamespace: false, // Disable the JSX namespace check
        },
      },
};

export default nextConfig;
