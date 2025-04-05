const nextConfig = {
eslint:{
  ignoreDuringBuilds:true
},
  experimental: {
    turbo: false, // Turbopack ko disable karein
  },
  
};

module.exports = nextConfig;
