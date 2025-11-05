// postcss.config.mjs

const config = {
  plugins: [
    [
      "@tailwindcss/postcss",
      {
        // --- BADLAAV YAHAN HAI ---
        // Yeh Tailwind ko batayega ki automatic Dark Mode band kar de
        // aur sirf tabhi chalu kare jab <html> par class="dark" ho
        darkMode: "class",

        // Baki config
        content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      },
    ],
  ],
};

export default config;