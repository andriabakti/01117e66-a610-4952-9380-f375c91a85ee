/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/shorten",
        permanent: true
      }
    ]
  }
};

export default nextConfig;
