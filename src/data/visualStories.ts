// src/data/visualStories.ts

export const visualStories = [
  {
    id: 1,
    title: "BYD Seagull Electric Hatchback Trademark Filed",
    // ✅ Ye image bahar Grid par dikhegi
    coverImage: "/stories/story1.jpg", 
    link: "/blog/byd-seagull",
    
    // ✅ Ye 'slides' wala array zaroori hai Viewer ke liye (Apni images yahan daalna)
    slides: [
      {
        image: "/stories/story1.jpg", // Slide 1
        text: "BYD has filed a trademark for the Seagull EV in India."
      },
      {
        image: "/stories/story1-interior.jpg", // Slide 2
        text: "It features a modern interior with a floating touchscreen."
      },
      {
        image: "/stories/story1-rear.jpg", // Slide 3
        text: "Expected range is around 300-400 km."
      }
    ]
  },
  {
    id: 2,
    title: "Check Out The Newly Unveiled Mahindra Thar.e",
    coverImage: "/stories/story2.jpg",
    link: "/blog/thar-electric",
    slides: [
      {
        image: "/stories/story2.jpg",
        text: "Mahindra unveiled the Thar.e concept."
      },
      {
        image: "/stories/story2-side.jpg",
        text: "It is built on the new INGLO platform."
      }
    ]
  },
  {
    id: 3,
    title: "A News Roundup Of Car Headlines This Week",
    coverImage: "/stories/story3.jpg",
    link: "/blog/news-roundup",
    slides: [
      {
        image: "/stories/story3.jpg",
        text: "Catch up on all major car news."
      },
      {
        image: "/stories/story3-extra.jpg",
        text: "Tata and Mahindra lead the charts."
      }
    ]
  },
  {
    id: 4,
    title: "Maruti Ertiga vs Toyota Rumion: Top 5 Differences",
    coverImage: "/stories/story4.jpg",
    link: "/blog/ertiga-vs-rumion",
    slides: [
      {
        image: "/stories/story4.jpg",
        text: "Toyota Rumion is essentially a rebadged Ertiga."
      },
      {
        image: "/stories/story4-grille.jpg",
        text: "The main difference is the new front grille."
      }
    ]
  },
  {
    id: 5,
    title: "7 Things To Know About The Toyota Rumion",
    coverImage: "/stories/story5.jpg",
    link: "/blog/toyota-mpv",
    slides: [
      {
        image: "/stories/story5.jpg",
        text: "It comes with a standard warranty of 3 years."
      },
      {
        image: "/stories/story5-interior.jpg",
        text: "Interior features a dual-tone finish."
      }
    ]
  },
  {
    id: 6,
    title: "Top 5 Safest SUVs in India Under 20 Lakhs",
    coverImage: "/stories/story6.jpg",
    link: "/blog/safest-suv",
    slides: [
      {
        image: "/stories/story6.jpg",
        text: "Safety is priority #1 for Indian buyers."
      },
      {
        image: "/stories/story6-nexon.jpg",
        text: "Tata Nexon scores 5 stars in GNCAP."
      }
    ]
  },
];