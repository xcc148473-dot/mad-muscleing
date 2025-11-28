/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'aistudiocdn.com'],
    unoptimized: true, 
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // If you prefer to use Ezoic's "Ads.txt Manager" redirect instead of the manual file:
  async redirects() {
    return [
      /* 
      // UNCOMMENT THE LINES BELOW TO ENABLE EZOIC AUTOMATIC ADS.TXT REDIRECT
      // NOTE: You must replace [YOUR_DOMAIN] with your actual domain (e.g., madmuscleing.com)
      {
        source: '/ads.txt',
        destination: 'https://srv.adstxtmanager.com/19390/madmuscleing.com',
        permanent: true,
      },
      */
    ]
  },
}

module.exports = nextConfig