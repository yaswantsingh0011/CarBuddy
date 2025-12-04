export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export const blogs: BlogPost[] = [
  // 1. SUV Blog (Author: Priya Sharma)
  {
    id: '7',
    slug: 'top-5-suv-india-2025',
    title: "India's Top 5 SUVs in 2025",
    excerpt: 'We review the top 5 SUVs available in India for 2025, focusing on performance, safety, and features.',
    content: `
      <p>The SUV market in India is booming, and 2025 has brought some incredible machines. Whether you want off-road capability or city comfort, here are our top picks:</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">1. Hyundai Creta Facelift</h3>
      <p>The king of compact SUVs continues to dominate with its new ADAS features and panoramic sunroof. It offers the best balance of comfort and resale value.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">2. Mahindra Scorpio N</h3>
      <p>If you need raw power and road presence, the "Big Daddy" of SUVs is the one. Its suspension swallows potholes for breakfast.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">3. Tata Nexon</h3>
      <p>Safety first! With a 5-star Bharat NCAP rating, the Nexon is the safest choice for small families.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">4. Maruti Grand Vitara</h3>
      <p>For those who care about mileage, the Hybrid variant offers an unbelievable 27 kmpl!</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">5. Mahindra XUV700</h3>
      <p>The most tech-loaded SUV in its segment. The dual-screen setup and autonomous driving features make it feel like a luxury car.</p>
    `,
    author: 'Priya Sharma',
    date: 'Nov 04, 2025',
    image: '/cars/blog5.jpg', 
    category: 'Reviews',
  },

  // 2. Mileage Hatchbacks (Author: Rohan Gupta)
  {
    id: '8',
    slug: 'best-mileage-hatchbacks',
    title: 'Best Mileage Hatchbacks for City Driving',
    excerpt: 'A complete guide to the most fuel-efficient hatchbacks perfect for navigating city traffic and saving money on fuel.',
    content: `
      <p>With petrol prices touching the sky, mileage is the most critical factor for Indian buyers. Here are the cars that sip fuel like a miser:</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">1. Maruti Suzuki Celerio (26.68 kmpl)</h3>
      <p>Currently the most fuel-efficient petrol car in India. Its DualJet engine is a marvel of engineering.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">2. Maruti Wagon R</h3>
      <p>The tall-boy design offers great space and delivers a solid 24+ kmpl on highways.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">3. Tata Tiago CNG</h3>
      <p>If you want to save even more, the Tiago iCNG offers great performance without compromising on boot space thanks to its dual-cylinder tech.</p>
      
      <div class="bg-yellow-50 p-4 border-l-4 border-yellow-500 my-6">
        <strong>Tip:</strong> Always maintain correct tyre pressure to get the best mileage from your hatchback.
      </div>
    `,
    author: 'Rohan Gupta',
    date: 'Nov 05, 2025',
    image: '/cars/blog6.jpg',
    category: 'Guides',
  },

  // 3. EV Guide (Author: Ashok Sharma)
  {
    id: '9',
    slug: 'ev-buying-guide-2025',
    title: 'EV Buying Guide 2025',
    excerpt: 'Planning to buy an electric car in India? We break down the pros, cons, charging infrastructure, and total cost of ownership.',
    content: `
      <p>Electric Vehicles are no longer the future; they are the present. But should you buy one in 2025? Let's analyze.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">Myth vs Reality: Range Anxiety</h3>
      <p>Modern EVs like the Nexon EV and MG ZS EV offer a real-world range of 300km+, which is more than enough for weekly city commutes.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">Charging at Home</h3>
      <p>90% of EV charging happens at home. If you have a dedicated parking spot, installing a 7.2kW fast charger makes life very easy.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">Cost Analysis</h3>
      <p>While an EV costs ₹3-4 Lakh more upfront, the running cost is just ₹1/km compared to ₹8/km for petrol. You break even in about 3-4 years.</p>
    `,
    author: 'Ashok Sharma',
    date: 'Nov 07, 2025',
    image: '/cars/evblogs.jpg',
    category: 'EV Special',
  },

  // 4. Maintenance Tips (Author: Priya Sharma)
  {
    id: '10',
    slug: 'essential-car-maintenance-tips-2025',
    title: 'Essential Car Maintenance Tips for 2025',
    excerpt: 'Keep your vehicle running smoothly with these simple maintenance hacks that save money on repairs.',
    content: `
      <p>A well-maintained car not only drives better but also fetches a higher resale value. Follow these golden rules:</p>
      
      <ul class="list-disc pl-5 space-y-3 mt-4">
        <li><strong>Check Fluids Weekly:</strong> Engine oil, coolant, and brake fluid levels should be checked regularly.</li>
        <li><strong>Tyre Rotation:</strong> Rotate your tyres every 5,000 km to ensure even wear and tear.</li>
        <li><strong>Battery Health:</strong> Clean the battery terminals with baking soda and water to prevent corrosion.</li>
        <li><strong>AC Service:</strong> Don't wait for summer. Run your AC for 10 mins every week even in winter to keep the seals lubricated.</li>
      </ul>
    `,
    author: 'Priya Sharma',
    date: 'Nov 05, 2025',
    image: '/cars/blog-sports.jpg',
    category: 'Maintenance',
  },

  // 5. Luxury Sedans (Author: Rohan Gupta)
  {
    id: '11',
    slug: 'luxury-sedans-comfort-performance',
    title: 'Luxury Sedans: Comfort Meets Performance',
    excerpt: 'Explore the latest luxury sedans that combine backseat comfort with thrilling driving dynamics.',
    content: `
      <p>SUVs are popular, but nothing beats the elegance and driving dynamics of a low-slung sedan. Here are the segment leaders:</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">Skoda Slavia / VW Virtus</h3>
      <p>With their 1.5 TSI engines, these are the driver's choice. They offer German build quality and explosive performance.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">Honda City</h3>
      <p>The queen of the segment. If you want backseat comfort and reliability, the City is still unbeatable.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-2">Hyundai Verna</h3>
      <p>The new Verna is futuristic and fast. It's the only one in the segment with a 5-star safety rating and Level 2 ADAS.</p>
    `,
    author: 'Rohan Gupta',
    date: 'Nov 05, 2025',
    image: '/cars/blog-sedan.jpg',
    category: 'Reviews',
  },

  // 6. Used Car Checklist (Author: Mahira garg)
  {
    id: '13',
    slug: 'used-car-10-point-checklist',
    title: '10 Things to Check Before Buying a Used Car',
    excerpt: 'Buying a second-hand car can be smart if you check these points. Don’t get scammed!',
    content: `
      <p>Buying a used car is tricky. Dealers often hide defects. Use this checklist before paying a single rupee:</p>
      
      <ol class="list-decimal pl-5 space-y-3 mt-4">
        <li><strong>Service History:</strong> Always ask for the service record. It tells you if the odometer has been tampered with.</li>
        <li><strong>Rust Check:</strong> Look under the carpet in the boot and below the doors for rust.</li>
        <li><strong>Smoke Color:</strong> Blue smoke means engine trouble. Black smoke means fuel issues.</li>
        <li><strong>Tyre Date:</strong> Check the manufacturing date on tyres. Old tyres are a safety hazard.</li>
        <li><strong>Test Drive:</strong> Turn off the music and listen for suspension noises on a rough road.</li>
      </ol>
    `,
    author: 'Mahira garg',
    date: 'Nov 07, 2025',
    image: '/cars/mycar.jpg',
    category: 'Used Car',
  },
];