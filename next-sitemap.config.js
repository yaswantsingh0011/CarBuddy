/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Aapki website ka URL
  siteUrl: 'https://car-buddy-new.vercel.app', 
  
  // robots.txt file bhi automatic ban jayegi
  generateRobotsTxt: true, 
  
  // Agar aap Next.js App Router use kar rahe hain, toh yeh zaroori hai
  // Aur agar aapko dynamic routes (database se aane wale pages) handle karne hain:
  // additionalPaths: async (config) => {
  //    // Yahan aap database/API se dynamic paths fetch karke return kar sakte hain
  //    // Example: return [{ loc: '/blog/meri-pehli-post', changefreq: 'daily', priority: 0.7 }]
  //    return []; 
  // },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}