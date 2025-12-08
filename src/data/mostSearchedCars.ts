export const mostSearchedCars = [
  // ==============================
  // 1. SUV CATEGORY
  // ==============================
  { 
    id: 28, 
    name: "Kia Syros", 
    price: "₹ 8.67 - 15.99 Lakh*", 
    images: ["/cars/syros.jpg", "/cars/syros-side.jpg", "/cars/syros-rear.jpg", "/cars/syros-interior.jpg"], 
    category: "SUV",
    fuelType: "Petrol / Diesel",
    specs: { 
      engine: "998 cc - 1493 cc", 
      power: "114 - 118 bhp", 
      torque: "172 Nm - 250 Nm", 
      transmission: "iMT/DCT/AT/MT", 
      mileage: "18.2 kmpl (Expected)", 
      bootSpace: "350 L", 
      groundClearance: "190 mm" 
    },
    features: ["Ventilated Seats", "ADAS", "Electric Sunroof", "10.25-inch Infotainment"],
    pros: ["Unique Lounge Design", "Loaded with Tech & ADAS", "Spacious Rear Seat"],
    cons: ["No Diesel Automatic at Launch", "Boxy Design might not appeal to everyone"],
    expertReview: {
      verdict: "The Kia Syros creates a new niche with its 'Lounge' design philosophy. It's spacious, tech-loaded, and comfortable, making it a great family car.",
      performance: "Engine options are refined, especially the 1.0L Turbo which offers punchy performance for city and highway runs.",
      interior: "The cabin feels airy thanks to the large windows and lounge-like seating. Material quality is top-notch for the segment.",
      safety: "Comes equipped with standard 6 airbags and ADAS Level 2 on higher trims, ensuring top-tier safety."
    },
    variants: [
      { name: "HTK 1.2 Petrol", price: "₹ 8.67 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "HTK Plus Diesel", price: "₹ 10.74 Lakh", engine: "1.5L Diesel", transmission: "Manual" },
      { name: "GTX Turbo DCT", price: "₹ 15.00 Lakh", engine: "1.0L Turbo", transmission: "Automatic" },
      { name: "GTX Diesel AT", price: "₹ 15.99 Lakh", engine: "1.5L Diesel", transmission: "Automatic" }
    ]
  },

  { 
    id: 27, 
    name: "Mahindra XUV700", 
    price: "₹ 13.99 - 26.99 Lakh*", 
    images: ["/cars/xuv700.jpg", "/cars/xuv700-side.jpg", "/cars/xuv700-rear.jpg", "/cars/xuv700-interior.jpg"], 
    category: "SUV",
    fuelType: "Diesel",
    specs: { engine: "2.0L mStallion Turbo", power: "197 bhp", torque: "380 Nm", transmission: "6-AT / 6-MT", mileage: "13 kmpl", bootSpace: "Expandable", groundClearance: "200 mm" },
    features: ["Skyroof", "Integrated Dual Screens", "ADAS Level 2", "Sony 3D Sound System"],
    pros: ["Best-in-class Engine Performance", "ADAS Features work flawlessly", "Premium Dual Screen Setup"],
    cons: ["Third row space is tight for adults", "No Auto-Dimming IRVM even in top model", "Boot space is negligible with all seats up"],
    expertReview: {
      verdict: "The XUV700 is the benchmark in its segment. It offers luxury car features at a mass-market price. A fantastic highway cruiser.",
      performance: "The 2.0L Petrol is a rocket, and the Diesel offers great torque. Ride and handling are sorted, absorbing bumps easily.",
      interior: "The dual 10.25-inch screens dominate the dashboard. The seats are supportive, and the 'Skyroof' adds a sense of luxury.",
      safety: "With a 5-Star Global NCAP rating and Level 2 ADAS, it is one of the safest cars on Indian roads."
    },
    variants: [
      { name: "MX Petrol", price: "₹ 13.99 Lakh", engine: "2.0L Turbo Petrol", transmission: "Manual" },
      { name: "AX3 Diesel", price: "₹ 16.39 Lakh", engine: "2.2L Diesel", transmission: "Manual" },
      { name: "AX5 Petrol AT", price: "₹ 19.49 Lakh", engine: "2.0L Turbo Petrol", transmission: "Automatic" },
      { name: "AX7 Luxury Diesel AWD", price: "₹ 26.99 Lakh", engine: "2.2L Diesel", transmission: "Automatic" }
    ]
  },
  { 
    id: 17, 
    name: "Mahindra Scorpio-N", 
    price: "₹ 13.60 - 24.54 Lakh*", 
    images: ["/cars/scorpio-n.jpg", "/cars/scorpio-side.jpg", "/cars/scorpio-rear.jpg", "/cars/scorpio-interior.jpg"], 
    category: "SUV",
    fuelType: "Diesel",
    specs: { engine: "2.2L mHawk Diesel", power: "172 bhp", torque: "400 Nm", transmission: "6-AT 4x4", mileage: "14 kmpl", bootSpace: "460 L", groundClearance: "187 mm" },
    features: ["4XPLOR Terrain Mode", "Alexa Built-in", "Driver Drowsiness Detection", "6-Seater Captain Seats"],
    pros: ["Imposing Road Presence", "Go-Anywhere 4x4 Capability", "Excellent High Speed Stability"],
    cons: ["Limited Third Row Space", "Missing features like Ventilated Seats", "Heavy steering at low speeds"],
    expertReview: {
      verdict: "The 'Big Daddy' of SUVs lives up to its name. It's rugged, capable, and surprisingly sophisticated for a ladder-frame SUV.",
      performance: "The mHawk diesel is a gem—refined and powerful. The suspension flattens bad roads with authority.",
      interior: "A massive step up from the old Scorpio. Soft-touch materials and the Sony sound system make it feel premium.",
      safety: "Scored 5 Stars in GNCAP. The build quality feels tank-like, providing immense confidence."
    },
    variants: [
      { name: "Z2 Petrol", price: "₹ 13.60 Lakh", engine: "2.0L Petrol", transmission: "Manual" },
      { name: "Z4 Diesel", price: "₹ 15.90 Lakh", engine: "2.2L Diesel", transmission: "Manual" },
      { name: "Z8 Select Diesel AT", price: "₹ 19.19 Lakh", engine: "2.2L Diesel", transmission: "Automatic" },
      { name: "Z8L Diesel 4x4 AT", price: "₹ 24.54 Lakh", engine: "2.2L Diesel", transmission: "Automatic" }
    ]
  },
  { 
    id: 19, 
    name: "Tata Harrier", 
    price: "₹ 15.49 - 26.44 Lakh*", 
    images: ["/cars/harrier.jpg", "/cars/harrier-side.jpg", "/cars/harrier-rear.jpg", "/cars/harrier-interior.jpg"], 
    category: "SUV",
    fuelType: "Diesel",
    specs: { engine: "2.0L Kryotec Diesel", power: "168 bhp", torque: "350 Nm", transmission: "6-AT", mileage: "16.8 kmpl", bootSpace: "425 L", groundClearance: "205 mm" },
    features: ["#Dark Edition Styling", "ADAS with 12 Functions", "Panoramic Sunroof", "Welcome/Goodbye Animation"],
    pros: ["Stunning Design & Road Presence", "Spacious & Comfortable Cabin", "Great Ride Quality"],
    cons: ["Fit and finish issues in some areas", "No Petrol Engine Option", "Touch controls for AC are distracting"],
    expertReview: {
      verdict: "The Harrier is a head-turner. With the update, it has become more tech-savvy and premium. A great choice for highway touring.",
      performance: "The Kryotec engine offers strong mid-range punch. The automatic gearbox is smooth and well-tuned.",
      interior: "The digital instrument cluster and new infotainment screen are crisp. The #Dark edition interior looks very sporty.",
      safety: "Built on the OMEGArc platform derived from Land Rover. It feels solid and now comes with ADAS."
    },
    variants: [
      { name: "Smart", price: "₹ 15.49 Lakh", engine: "2.0L Diesel", transmission: "Manual" },
      { name: "Pure +", price: "₹ 18.69 Lakh", engine: "2.0L Diesel", transmission: "Automatic" },
      { name: "Adventure + A", price: "₹ 21.69 Lakh", engine: "2.0L Diesel", transmission: "Automatic" },
      { name: "Fearless + #Dark", price: "₹ 26.44 Lakh", engine: "2.0L Diesel", transmission: "Automatic" }
    ]
  },
  { 
    id: 4, 
    name: "Toyota Fortuner Legender", 
    price: "₹ 43.66 - 47.64 Lakh*", 
    images: ["/cars/fortuner.jpg", "/cars/fortuner-side.jpg", "/cars/fortuner-rear.jpg", "/cars/fortuner-interior.jpg"], 
    category: "SUV", 
    fuelType: "Diesel",
    specs: { 
        engine: "2.8L Diesel", 
        power: "201 bhp", 
        torque: "500 Nm", 
        transmission: "6-AT", 
        mileage: "14.4 kmpl", 
        bootSpace: "296 L", 
        groundClearance: "225 mm" 
    },
    features: ["Dual Tone Roof", "Wireless Charger", "Kick Sensor Tailgate", "Ambient Lighting"],
    pros: ["Unmatched Reliability & Resale Value", "Powerful 500Nm Diesel Engine", "Aggressive Styling (Legender)"],
    cons: ["Overpriced for the features offered", "Stiff ride quality at low speeds", "Heavy steering"],
    expertReview: {
      verdict: "The King of SUVs. You buy a Fortuner for peace of mind, durability, and respect on the road. It's expensive but virtually indestructible.",
      performance: "The upgraded engine with 500Nm torque makes it effortless to drive. Off-road capability is legendary.",
      interior: "Functional and durable, but lacks the modern tech and luxury of German rivals at this price.",
      safety: "Solid build, 7 airbags, and Toyota's reliability make it a safe bunker on wheels."
    },
    variants: [
        { name: "4x2 AT", price: "₹ 43.66 Lakh", engine: "2.8L Diesel", transmission: "Automatic" },
        { name: "4x4 AT", price: "₹ 47.64 Lakh", engine: "2.8L Diesel", transmission: "Automatic" }
    ]
  },
  { 
    id: 16, 
    name: "Hyundai Creta", 
    price: "₹ 11.00 - 20.15 Lakh*", 
    images: ["/cars/creta.jpg", "/cars/creta-side.jpg", "/cars/creta-rear.jpg", "/cars/creta-interior.jpg"], 
    category: "SUV",
    fuelType: "Petrol",
    specs: { engine: "1.5L Turbo Petrol", power: "158 bhp", torque: "253 Nm", transmission: "7-DCT", mileage: "18.4 kmpl", bootSpace: "433 L", groundClearance: "190 mm" },
    features: ["Panoramic Sunroof", "Level 2 ADAS", "Bose Premium Sound", "Dual Zone Climate Control"],
    pros: ["All-rounder Package", "Smooth Engines & Gearboxes", "Packed with Features"],
    cons: ["Polarizing Design", "Rear seat fits 2 adults + 1 child best", "Waiting periods are high"],
    expertReview: {
      verdict: "The Creta is the default choice in its segment for a reason. It does everything well—comfort, features, and performance.",
      performance: "The 1.5L Turbo Petrol is exciting, while the Diesel remains a frugal mile-muncher. Very easy to drive in the city.",
      interior: "The dual-screen setup looks modern. Cabin ergonomics are spot on, and the Bose sound system is a treat.",
      safety: "Improved structural rigidity in the facelift and standard 6 airbags make it safer than before."
    },
    variants: [
      { name: "E Petrol", price: "₹ 11.00 Lakh", engine: "1.5L Petrol", transmission: "Manual" },
      { name: "S (O) Diesel", price: "₹ 15.86 Lakh", engine: "1.5L Diesel", transmission: "Manual" },
      { name: "SX Tech IVT", price: "₹ 17.48 Lakh", engine: "1.5L Petrol", transmission: "Automatic" },
      { name: "SX (O) Turbo DCT", price: "₹ 20.15 Lakh", engine: "1.5L Turbo Petrol", transmission: "Automatic" }
    ]
  },
  { 
    id: 26, 
    name: "Kia Seltos", 
    price: "₹ 10.90 - 20.35 Lakh*", 
    images: ["/cars/seltos.jpg", "/cars/seltos-side.jpg", "/cars/seltos-rear.jpg", "/cars/seltos-interior.jpg"], 
    category: "SUV",
    fuelType: "Petrol",
    specs: { engine: "1.5L Turbo Petrol", power: "158 bhp", torque: "253 Nm", transmission: "7-DCT", mileage: "17.9 kmpl", bootSpace: "433 L", groundClearance: "190 mm" },
    features: ["Dual 10.25-inch Screens", "Level 2 ADAS", "Panoramic Sunroof", "Electric Parking Brake"],
    pros: ["Sporty Design & Handling", "Most Feature-Rich in Segment", "Powerful Turbo Petrol Engine"],
    cons: ["Ride quality is on the stiffer side", "DCT gearbox can heat up in bumper traffic"],
    expertReview: {
      verdict: "For those who want a sporty and stylish SUV, the Seltos is the pick. It feels more agile and premium than most rivals.",
      performance: "The 1.5L Turbo with DCT is the enthusiast's choice. Handling is sharp, making it fun around corners.",
      interior: "The cabin feels upscale with soft-touch materials. The Panoramic sunroof adds to the sense of space.",
      safety: "Comes with ADAS Level 2 and standard 6 airbags, addressing safety concerns of the previous model."
    },
    variants: [
      { name: "HTE Petrol", price: "₹ 10.90 Lakh", engine: "1.5L Petrol", transmission: "Manual" },
      { name: "HTK Plus Diesel", price: "₹ 15.00 Lakh", engine: "1.5L Diesel", transmission: "iMT" },
      { name: "HTX Plus Turbo", price: "₹ 18.30 Lakh", engine: "1.5L Turbo", transmission: "DCT" },
      { name: "X-Line Diesel AT", price: "₹ 20.35 Lakh", engine: "1.5L Diesel", transmission: "Automatic" }
    ]
  },
  { 
    id: 25, 
    name: "Renault Kiger", 
    price: "₹ 6.50 - 11.23 Lakh*", 
    images: ["/cars/kiger.jpg", "/cars/kiger-side.jpg", "/cars/kiger-rear.jpg", "/cars/kiger-interior.jpg"], 
    category: "SUV",
    fuelType: "Petrol",
    specs: { engine: "1.0L Turbo", power: "99 bhp", torque: "160 Nm", transmission: "CVT / MT", mileage: "20.5 kmpl", bootSpace: "405 L", groundClearance: "205 mm" },
    features: ["Sport Mode", "Wireless CarPlay", "PM 2.5 Air Filter", "Digital Instrument Cluster"],
    pros: ["Huge Boot Space (405L)", "Good Looking Design", "Value for Money Pricing"],
    cons: ["Cabin noise insulation is average", "Interior plastic quality feels budget-grade"],
    expertReview: {
      verdict: "A stylish and practical compact SUV for the city. It offers big-car features at a hatchback price point.",
      performance: "The Turbo CVT is the one to buy—smooth and punchy. The normal petrol engine feels a bit underpowered.",
      interior: "Practical cabin with plenty of storage. The high seating position gives a proper SUV feel.",
      safety: "Scored 4 Stars in GNCAP, making it one of the safer cars in its price bracket."
    },
    variants: [
      { name: "RXE", price: "₹ 6.50 Lakh", engine: "1.0L Petrol", transmission: "Manual" },
      { name: "RXL AMT", price: "₹ 8.10 Lakh", engine: "1.0L Petrol", transmission: "Automatic" },
      { name: "RXZ Turbo", price: "₹ 10.00 Lakh", engine: "1.0L Turbo", transmission: "Manual" },
      { name: "RXZ Turbo CVT", price: "₹ 11.23 Lakh", engine: "1.0L Turbo", transmission: "CVT" }
    ]
  },
  { 
    id: 1, 
    name: "Hyundai Venue", 
    price: "₹ 7.90 - 15.69 Lakh*", 
    images: ["/cars/venue.jpg", "/cars/venue-side.jpg", "/cars/venue-rear.jpg", "/cars/venue-interior.jpg"], 
    category: "SUV",
    fuelType: "Petrol",
    specs: { engine: "1.2L Kappa Petrol", power: "82 bhp", torque: "114 Nm", transmission: "5-MT / 7-DCT", mileage: "17.5 kmpl", bootSpace: "350 L", groundClearance: "195 mm" },
    features: ["Electric Sunroof", "BlueLink Connected Tech", "Reclining Rear Seats", "6 Airbags Standard"],
    pros: ["Feature Loaded", "Easy to Drive", "Premium Interior Quality"],
    cons: ["Rear seat legroom is limited", "Ride quality is a bit stiff at low speeds"],
    expertReview: {
      verdict: "A great city SUV that's easy to park and loaded with tech. Perfect for young professionals.",
      performance: "The DCT gearbox is lightning fast. The 1.0L Turbo engine makes it a fun pocket rocket.",
      interior: "Very ergonomic and high-quality cabin. The reclining rear seat is a nice touch for comfort.",
      safety: "Standard 6 airbags across all variants is a welcome move by Hyundai."
    },
    variants: [
      { name: "E", price: "₹ 7.94 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "S (O) Turbo", price: "₹ 10.40 Lakh", engine: "1.0L Turbo", transmission: "iMT" },
      { name: "SX Diesel", price: "₹ 12.40 Lakh", engine: "1.5L Diesel", transmission: "Manual" },
      { name: "SX (O) DCT", price: "₹ 13.23 Lakh", engine: "1.0L Turbo", transmission: "DCT" }
    ]
  },
  { 
    id: 2, 
    name: "Tata Nexon", 
    price: "₹ 7.32 - 14.05 Lakh*", 
    images: ["/cars/tata-nexon.jpg", "/cars/tata-nexon-side.jpg", "/cars/tata-nexon-rear.jpg", "/cars/tata-nexon-interior.jpg"], 
    category: "SUV",
    fuelType: "Petrol",
    specs: { engine: "1.2L Turbo Petrol", power: "118 bhp", torque: "170 Nm", transmission: "6-MT / AMT", mileage: "17.0 kmpl", bootSpace: "382 L", groundClearance: "208 mm" },
    features: ["10.25-inch Infotainment", "5 Star Global NCAP", "Ventilated Seats", "360 Degree Camera"],
    pros: ["5-Star Safety Rating", "Futuristic Design", "Feature-Rich Top Variants"],
    cons: ["AMT gearbox is jerky", "Petrol engine can be noisy", "Touch-based climate controls are tricky to use while driving"],
    expertReview: {
      verdict: "The segment leader for a reason. It combines safety, style, and features brilliantly.",
      performance: "Offers multiple drive modes (Eco, City, Sport). The diesel engine is punchy and efficient.",
      interior: "The new 2-spoke steering wheel with illuminated logo looks cool. The digital cockpit is very informative.",
      safety: "One of the safest cars in India with a 5-star rating for both adult and child protection."
    },
    variants: [
      { name: "Smart (O)", price: "₹ 8.15 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "Pure Diesel", price: "₹ 11.10 Lakh", engine: "1.5L Diesel", transmission: "Manual" },
      { name: "Creative + DCA", price: "₹ 12.50 Lakh", engine: "1.2L Petrol", transmission: "Automatic" },
      { name: "Fearless + S Diesel AMT", price: "₹ 15.60 Lakh", engine: "1.5L Diesel", transmission: "Automatic" }
    ]
  },
  { 
    id: 3, 
    name: "Maruti FRONX", 
    price: "₹ 6.85 - 11.98 Lakh*", 
    images: ["/cars/fronx.jpg", "/cars/fronx-side.jpg", "/cars/fronx-rear.jpg", "/cars/fronx-interior.jpg"], 
    category: "SUV",
    fuelType: "Petrol",
    specs: { engine: "1.0L Turbo Boosterjet", power: "99 bhp", torque: "147 Nm", transmission: "5-MT / 6-AT", mileage: "21.5 kmpl", bootSpace: "308 L", groundClearance: "190 mm" },
    features: ["Heads Up Display (HUD)", "9-inch SmartPlay Pro+", "360 View Camera", "Wireless Charger"],
    pros: ["Stylish Coupe Design", "Fuel Efficient Engines", "Maruti's Reliable Service Network"],
    cons: ["Headroom at rear is limited due to coupe roof", "Interior looks similar to Baleno"],
    expertReview: {
      verdict: "A crossover that brings style to the masses. It looks much more expensive than it actually is.",
      performance: "The return of the Boosterjet Turbo engine makes it fun. The handling is surprisingly mature.",
      interior: "Cabin is well-equipped. The HUD and 360-degree camera are segment-first features that add value.",
      safety: "Based on the Heartect platform. Comes with standard safety features but awaits crash test rating."
    },
    variants: [
      { name: "Sigma", price: "₹ 7.51 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "Delta + AMT", price: "₹ 8.88 Lakh", engine: "1.2L Petrol", transmission: "Automatic" },
      { name: "Zeta Turbo", price: "₹ 10.55 Lakh", engine: "1.0L Turbo", transmission: "Manual" },
      { name: "Alpha Turbo AT", price: "₹ 13.04 Lakh", engine: "1.0L Turbo", transmission: "Automatic" }
    ]
  },
  { 
    id: 24, 
    name: "Tata Punch", 
    price: "₹ 6.13 - 10.20 Lakh*", 
    images: ["/cars/punch.jpg", "/cars/punch-side.jpg", "/cars/punch-rear.jpg", "/cars/punch-interior.jpg"], 
    category: "SUV",
    fuelType: "Petrol",
    specs: { engine: "1.2L Revotron", power: "87 bhp", torque: "115 Nm", transmission: "5-MT / AMT", mileage: "18.8 kmpl", bootSpace: "366 L", groundClearance: "187 mm" },
    features: ["5 Star Safety Rating", "7-inch Harman Screen", "90 Degree Door Opening", "Traction Pro Mode"],
    pros: ["Micro-SUV Look", "5-Star Safety on a Budget", "High Ground Clearance"],
    cons: ["Engine feels lethargic on highways", "AMT gearbox is slow to respond"],
    expertReview: {
      verdict: "The perfect first car for Indian families. It offers SUV ruggedness in a compact footprint.",
      performance: "Best suited for city driving. It tackles bad roads and speed breakers with ease.",
      interior: "Funky and youthful design. The doors open 90 degrees making ingress/egress very easy for elders.",
      safety: "The safest car in its price segment. A true tank for the urban jungle."
    },
    variants: [
      { name: "Pure", price: "₹ 6.13 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "Adventure AMT", price: "₹ 7.60 Lakh", engine: "1.2L Petrol", transmission: "Automatic" },
      { name: "Accomplished Dazzle", price: "₹ 8.90 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "Creative Flagship AMT", price: "₹ 10.20 Lakh", engine: "1.2L Petrol", transmission: "Automatic" }
    ]
  },


  // ==============================
  // 1.5 MUV CATEGORY
  // ==============================
  {
    id: 30,
    name: "Maruti Ertiga",
    category: "MUV",
    price: "₹ 8.69 - 13.03 Lakh*",
    images: ["/cars/ertiga.jpg", "/cars/ertiga-side.jpg", "/cars/ertiga-rear.jpg", "/cars/ertiga-interior.jpg"],
    fuelType: "Petrol",
    specs: { engine: "1.5L K15C Petrol", power: "102 bhp", torque: "136.8 Nm", transmission: "5-MT / 6-AT", mileage: "20.51 kmpl", bootSpace: "209 L", groundClearance: "185 mm" },
    features: ["CNG Option Available", "Roof Mounted AC", "SmartPlay Pro", "Projector Headlamps"],
    pros: ["Excellent Value for Money", "Superb CNG Mileage", "Comfortable Ride"],
    cons: ["Not very exciting to drive", "Interior quality is average", "Long waiting periods for CNG"],
    expertReview: {
      verdict: "The sensible choice for large families. It's efficient, reliable, and comfortable.",
      performance: "Tuned for efficiency and comfort. The 6-speed automatic makes city driving hassle-free.",
      interior: "Practical beige interiors make it feel airy. Roof-mounted AC vents cool the cabin quickly.",
      safety: "Comes with standard safety kit but scored 3 stars in GNCAP."
    },
    variants: [
      { name: "LXi (O)", price: "₹ 8.69 Lakh", engine: "1.5L Petrol", transmission: "Manual" },
      { name: "VXi CNG", price: "₹ 10.78 Lakh", engine: "1.5L CNG", transmission: "Manual" },
      { name: "ZXi AT", price: "₹ 12.38 Lakh", engine: "1.5L Petrol", transmission: "Automatic" },
      { name: "ZXi+ AT", price: "₹ 13.03 Lakh", engine: "1.5L Petrol", transmission: "Automatic" }
    ]
  },
  {
    id: 31,
    name: "Toyota Innova Crysta",
    category: "MUV",
    price: "₹ 19.99 - 26.55 Lakh*",
    images: ["/cars/innova.jpg", "/cars/innova-side.jpg", "/cars/innova-rear.jpg", "/cars/innova-interior.jpg"],
    fuelType: "Diesel",
    specs: { engine: "2.4L Diesel", power: "148 bhp", torque: "343 Nm", transmission: "5-MT", mileage: "12 kmpl", bootSpace: "300 L", groundClearance: "178 mm" },
    features: ["7 Airbags", "One-Touch Tumble Seats", "8-inch Display", "Ambient Lighting"],
    pros: ["Unbeatable Comfort", "Reliable Diesel Engine", "High Resale Value"],
    cons: ["No Automatic Option (only Manual)", "Dated Infotainment System", "Expensive"],
    expertReview: {
      verdict: "The legend returns. If you want a diesel MPV that can last 10+ years, this is the only choice.",
      performance: "The 2.4L Diesel has massive torque for overtaking. It pulls full loads easily on hills.",
      interior: "Captain seats are like sofas. Perfect for long-distance touring.",
      safety: "Top-notch safety with 7 airbags and a solid frame."
    },
    variants: [
      { name: "GX 7 STR", price: "₹ 19.99 Lakh", engine: "2.4L Diesel", transmission: "Manual" },
      { name: "GX Plus 8 STR", price: "₹ 21.44 Lakh", engine: "2.4L Diesel", transmission: "Manual" },
      { name: "VX 7 STR", price: "₹ 24.64 Lakh", engine: "2.4L Diesel", transmission: "Manual" },
      { name: "ZX 7 STR", price: "₹ 26.55 Lakh", engine: "2.4L Diesel", transmission: "Manual" }
    ]
  },
  {
    id: 32,
    name: "Kia Carens",
    category: "MUV",
    price: "₹ 10.45 - 19.45 Lakh*",
    images: ["/cars/carens.jpg", "/cars/carens-side.jpg", "/cars/carens-rear.jpg", "/cars/carens-interior.jpg"],
    fuelType: "Petrol",
    specs: { engine: "1.5L Turbo Petrol", power: "158 bhp", torque: "253 Nm", transmission: "7-DCT / 6-iMT", mileage: "16.5 kmpl", bootSpace: "216 L", groundClearance: "195 mm" },
    features: ["Skyroof", "Ventilated Front Seats", "Bose Premium Sound", "6 Airbags Standard"],
    pros: ["Most Feature-Loaded MPV", "Spacious 3rd Row", "Premium Interior Feel"],
    cons: ["Headlights could be brighter", "No diesel automatic for lower variants"],
    expertReview: {
      verdict: "A stylish MPV that doesn't look like a van. It offers the best mix of space and features.",
      performance: "Smooth ride quality. The Turbo Petrol engine makes it surprisingly fast.",
      interior: "Very thoughtful cabin with pop-up cup holders and ample charging ports.",
      safety: "Standard 6 airbags across all variants is a big plus."
    },
    variants: [
      { name: "Premium", price: "₹ 10.45 Lakh", engine: "1.5L Petrol", transmission: "Manual" },
      { name: "Prestige Diesel", price: "₹ 14.25 Lakh", engine: "1.5L Diesel", transmission: "Manual" },
      { name: "Luxury Plus Turbo DCT", price: "₹ 18.95 Lakh", engine: "1.5L Turbo", transmission: "Automatic" },
      { name: "X-Line Diesel AT", price: "₹ 19.45 Lakh", engine: "1.5L Diesel", transmission: "Automatic" }
    ]
  },
  {
    id: 33,
    name: "Toyota Innova Hycross",
    category: "MUV",
    price: "₹ 19.77 - 30.98 Lakh*",
    images: ["/cars/hycross.jpg", "/cars/hycross-side.jpg", "/cars/hycross-rear.jpg", "/cars/hycross-interior.jpg"],
    fuelType: "Hybrid",
    specs: { engine: "2.0L TNGA Hybrid", power: "183 bhp", torque: "206 Nm", transmission: "e-CVT", mileage: "23.24 kmpl", bootSpace: "300+ L", groundClearance: "185 mm" },
    features: ["Ottoman Seats", "Panoramic Sunroof", "Toyota Safety Sense ADAS", "Powered Tailgate"],
    pros: ["Incredible Hybrid Mileage (23 kmpl)", "Luxury Car Features", "Smooth Drive"],
    cons: ["Interior plastic quality is not consistent", "Expensive top variants"],
    expertReview: {
      verdict: "The future of MPVs. It delivers diesel-like efficiency with petrol refinement. A tech marvel.",
      performance: "Silent and smooth in city traffic. Instant torque from the electric motor.",
      interior: "The Ottoman seats in the rear are business-class level. Very spacious.",
      safety: "Toyota's first car in India with full ADAS suite (Toyota Safety Sense)."
    },
    variants: [
      { name: "GX 7 STR", price: "₹ 19.77 Lakh", engine: "2.0L Petrol", transmission: "Automatic" },
      { name: "VX 7 STR Hybrid", price: "₹ 25.97 Lakh", engine: "2.0L Hybrid", transmission: "Automatic" },
      { name: "ZX Hybrid", price: "₹ 30.30 Lakh", engine: "2.0L Hybrid", transmission: "Automatic" },
      { name: "ZX(O) Hybrid", price: "₹ 30.98 Lakh", engine: "2.0L Hybrid", transmission: "Automatic" }
    ]
  },


  // ==============================
  // 2. LUXURY CATEGORY
  // ==============================
  { 
    id: 45, 
    name: "Mercedes-Benz Maybach GLS", 
    price: "₹ 3.17 - 3.71 Cr*", 
    images: ["/cars/maybach.jpg", "/cars/maybach-side.jpg", "/cars/maybach-rear.jpg", "/cars/maybach-interior.jpg"], 
    category: "Luxury",
    fuelType: "Petrol",
    specs: { 
      engine: "3982 cc (4.0L V8)", 
      power: "550 bhp", 
      torque: "700 Nm", 
      transmission: "9G-TRONIC AWD", 
      mileage: "10 kmpl", 
      bootSpace: "395 L", 
      groundClearance: "200 mm" 
    },
    features: ["Executive Rear Seats", "E-Active Body Control", "Burmester High-End 3D Sound", "Air Balance Package"],
    pros: ["Ultimate Luxury", "Incredible Comfort", "Status Symbol"],
    cons: ["Massive Price Tag", "Low Fuel Efficiency", "Too large for city parking"],
    expertReview: {
      verdict: "The S-Class of SUVs. It redefines what luxury means on four wheels.",
      performance: "The V8 engine provides effortless acceleration. The suspension scans the road to erase bumps.",
      interior: "Reclining rear seats with massage function, champagne fridge, and finest leather.",
      safety: "Packed with every safety feature Mercedes has invented."
    },
    variants: [
      { name: "Maybach 600 4MATIC", price: "₹ 3.17 Cr", engine: "4.0L Petrol", transmission: "Automatic" },
      { name: "Maybach 600 Night Series", price: "₹ 3.71 Cr", engine: "4.0L Petrol", transmission: "Automatic" },
    ]
  },
  
  { 
    id: 14, 
    name: "BMW 3 Series", 
    price: "₹ 72.90 Lakh*", 
    images: ["/cars/bmw3.jpg", "/cars/bmw3-side.jpg", "/cars/bmw3-rear.jpg", "/cars/bmw3-interior.jpg"], 
    category: "Luxury",
    fuelType: "Petrol",
    specs: { engine: "3.0L Inline-6 Turbo", power: "369 bhp", torque: "500 Nm", transmission: "8-Speed Steptronic", mileage: "11 kmpl", bootSpace: "480 L", groundClearance: "135 mm" },
    features: ["Curved Display", "M Sport Suspension", "Carbon Fiber Trim", "Head-up Display"],
    pros: ["Best Driver's Car in Segment", "Spacious LWB Rear Seat", "Powerful Engines"],
    cons: ["Low Ground Clearance", "No Spare Wheel (Run-flats)", "Expensive"],
    expertReview: {
      verdict: "The definitive sports sedan. Now with the Long Wheelbase, it's also a great chauffeur-driven car.",
      performance: "The M340i variant is a monster with 0-100 in 4.4 seconds. Handling is razor sharp.",
      interior: "The new curved display looks futuristic. Rear legroom is generous.",
      safety: "Top marks in Euro NCAP. Excellent braking performance."
    },
    variants: [
      { name: "330Li M Sport", price: "₹ 60.60 Lakh", engine: "2.0L Petrol", transmission: "Automatic" },
      { name: "330Li M Sport Pro", price: "₹ 62.60 Lakh", engine: "2.0L Petrol", transmission: "Automatic" },
      { name: "M340i xDrive", price: "₹ 72.90 Lakh", engine: "3.0L Turbo Petrol", transmission: "Automatic" }
    ]
  },
  {
    id: 43, 
    name: "Volvo XC40",
    price: "₹ 54.95 - 57.90 Lakh*",
    images: ["/cars/xc40.jpg", "/cars/xc40-side.jpg", "/cars/xc40-rear.jpg", "/cars/xc40-interior.jpg"],
    category: "Luxury",
    fuelType: "Electric",
    specs: { 
      engine: "Electric Motor (Twin)", 
      power: "402 bhp", 
      torque: "660 Nm", 
      transmission: "Automatic", 
      mileage: "418 km Range", 
      bootSpace: "452 L", 
      groundClearance: "175 mm" 
    },
    features: ["Google Built-in", "ADAS Level 2", "Panoramic Sunroof", "Harman Kardon Sound"],
    pros: ["Blistering Acceleration", "Sustainable Materials", "Excellent Safety"],
    cons: ["Rear seat is upright", "Range drops significantly at highway speeds"],
    expertReview: {
      verdict: "A rocket in disguise. One of the fastest and safest compact luxury SUVs you can buy.",
      performance: "0-100 kmph in 4.9 seconds. The instant torque is addictive.",
      interior: "Minimalist Scandinavian design. Uses recycled materials extensively.",
      safety: "It's a Volvo. Safety is standard, not an option."
    },
    variants: [
      { name: "Recharge Plus", price: "₹ 54.95 Lakh", engine: "Electric", transmission: "Automatic" },
      { name: "Recharge Ultimate", price: "₹ 57.90 Lakh", engine: "Electric", transmission: "Automatic" }
    ]
  }, 
  { 
    id: 15, 
    name: "Audi A4", 
    price: "₹ 45.34 - 53.50 Lakh*", 
    images: ["/cars/a4.jpg", "/cars/a4-side.jpg", "/cars/a4-rear.jpg", "/cars/a4-interior.jpg"], 
    category: "Luxury",
    fuelType: "Petrol",
    specs: { engine: "2.0L TFSI", power: "187 bhp", torque: "320 Nm", transmission: "7-Speed S-Tronic", mileage: "17.4 kmpl", bootSpace: "460 L", groundClearance: "135 mm" },
    features: ["Virtual Cockpit", "Comfort Key", "3-Zone Climate Control", "Park Assist"],
    pros: ["Timeless Design", "Refined Engine", "Comfortable Ride"],
    cons: ["Feels aged compared to rivals", "Missing some modern tech features"],
    expertReview: {
      verdict: "An understated luxury sedan. It does everything quietly and comfortably.",
      performance: "Not a sports car, but a smooth cruiser. The DSG gearbox is quick.",
      interior: "Build quality is flawless. The Virtual Cockpit is still the best in business.",
      safety: "5-Star Euro NCAP rating. Feels very solid."
    },
    variants: [
      { name: "Premium", price: "₹ 45.34 Lakh", engine: "2.0L Petrol", transmission: "Automatic" },
      { name: "Premium Plus", price: "₹ 49.00 Lakh", engine: "2.0L Petrol", transmission: "Automatic" },
      { name: "Technology", price: "₹ 53.50 Lakh", engine: "2.0L Petrol", transmission: "Automatic" }
    ]
  },
  { 
    id: 13, 
    name: "Mercedes-Benz C-Class", 
    price: "₹ 61.85 - 69.00 Lakh*", 
    images: ["/cars/c-class.jpg", "/cars/c-class-side.jpg", "/cars/c-class-rear.jpg", "/cars/c-class-interior.jpg"], 
    category: "Luxury",
    fuelType: "Diesel",
    specs: { engine: "2.0L Diesel", power: "197 bhp", torque: "440 Nm", transmission: "9G-TRONIC", mileage: "23 kmpl", bootSpace: "455 L", groundClearance: "157 mm" },
    features: ["MBUX Infotainment", "Burmester 3D Sound", "Digital Lights", "Fingerprint Scanner"],
    pros: ["Mini S-Class Looks", "Tech-Loaded Cabin", "Prestigious Badge"],
    cons: ["Rear seat headroom is tight", "Low ground clearance scrapes speed breakers"],
    expertReview: {
      verdict: "The 'Baby S-Class'. It brings flagship luxury and tech to a smaller package.",
      performance: "A balanced performer. The mild-hybrid tech helps in city traffic.",
      interior: "The vertical touchscreen and ambient lighting are showstoppers.",
      safety: "Loaded with active brake assist and blind spot monitoring."
    },
    variants: [
      { name: "C 200", price: "₹ 61.85 Lakh", engine: "1.5L Petrol", transmission: "Automatic" },
      { name: "C 220d", price: "₹ 62.85 Lakh", engine: "2.0L Diesel", transmission: "Automatic" },
      { name: "C 300d AMG Line", price: "₹ 69.00 Lakh", engine: "2.0L Diesel", transmission: "Automatic" }
    ]
  },
 { 
    id: 22, 
    name: "Range Rover", 
    price: "₹ 2.39- 4.17 Cr*", 
    images: ["/cars/range-rover.jpg", "/cars/range-rover-side.jpg", "/cars/range-rover-rear.jpg", "/cars/range-rover-interior.jpg"], 
    category: "Luxury",
    fuelType: "Diesel",
    specs: { engine: "3.0L Diesel LWB", power: "346 bhp", torque: "700 Nm", transmission: "8-AT AWD", mileage: "13 kmpl", bootSpace: "818 L", groundClearance: "219 mm" },
    features: ["Executive Class Rear Seats", "Active Noise Cancellation", "All-Wheel Steering", "Meridian Signature Sound"],
    pros: ["Unmatched Status", "Supreme Comfort", "Off-road Capability"],
    cons: ["Reliability can be hit or miss", "Wait times are very long"],
    expertReview: {
      verdict: "The ultimate luxury SUV. It floats over roads and climbs mountains with equal ease.",
      performance: "Effortless power. The rear-wheel steering makes it surprisingly easy to park.",
      interior: "Minimalist but ultra-luxurious. The noise isolation is library-quiet.",
      safety: "Built like a fortress."
    },
    variants: [
      { name: "3.0L Diesel HSE LWB", price: "₹ 2.39 Cr", engine: "3.0L Diesel", transmission: "Automatic" },
      { name: "3.0L Petrol Autobiography", price: "₹ 2.60 Cr", engine: "3.0L Petrol", transmission: "Automatic" },
      { name: "SV LWB", price: "₹ 4.17 Cr", engine: "4.4L Petrol", transmission: "Automatic" }
    ]
  },
   { 
    id: 20, 
    name: "Mercedes-Benz G-Class", 
    price: "₹ 2.55 - 4.00 Cr*", 
    images: ["/cars/g63.jpg", "/cars/g63-side.jpg", "/cars/g63-rear.jpg", "/cars/g63-interior.jpg"], 
    category: "Luxury",
    fuelType: "Petrol",
    specs: { engine: "4.0L V8 Biturbo", power: "577 bhp", torque: "850 Nm", transmission: "AMG 9-Speed", mileage: "6 kmpl", bootSpace: "667 L", groundClearance: "241 mm" },
    features: ["3 Differential Locks", "AMG Active Ride Control", "Burmester Surround Sound", "Multicontour Massage Seats"],
    pros: ["Iconic Design", "Insane V8 Sound", "Goes Anywhere"],
    cons: ["Aerodynamics of a brick", "Fuel economy is single digit"],
    expertReview: {
      verdict: "An icon. There is nothing else like the G-Wagon. It defies logic and physics.",
      performance: "The G63 AMG is terrifyingly fast. The V8 rumble is intoxicating.",
      interior: "Old school charm mixed with modern screens. You sit very high up.",
      safety: "Solid build but top-heavy dynamics require care in corners."
    },
    variants: [
      { name: "G 400d Adventure", price: "₹ 2.55 Cr", engine: "3.0L Diesel", transmission: "Automatic" },
      { name: "AMG G 63", price: "₹ 4.00 Cr", engine: "4.0L V8 Petrol", transmission: "Automatic" }
    ]
  },
{ 
    id: 21, 
    name: "Land Rover Defender", 
    price: "₹ 93.55 Lakh - 2.30 Cr*", 
    images: ["/cars/defender.jpg", "/cars/defender-side.jpg", "/cars/defender-rear.jpg", "/cars/defender-interior.jpg"], 
    category: "Luxury",
    fuelType: "Diesel",
    specs: { engine: "3.0L Diesel / 5.0L V8", power: "296 bhp", torque: "650 Nm", transmission: "8-AT", mileage: "10 kmpl", bootSpace: "857 L", groundClearance: "291 mm" },
    features: ["ClearSight Ground View", "Air Suspension", "Wade Sensing", "Pivi Pro Infotainment"],
    pros: ["Rugged yet Modern", "Excellent Off-road", "Spacious Cabin"],
    cons: ["Very wide for city traffic", "Electronics can be glitchy"],
    expertReview: {
      verdict: "The reinvention of an icon. It's tough enough for the jungle and stylish enough for the mall.",
      performance: "Fantastic on road and off it. The air suspension provides a carpet-like ride.",
      interior: "Industrial chic design with exposed screws. Very practical and washable.",
      safety: "5-Star Euro NCAP. Very tough structure."
    },
    variants: [
      { name: "Defender 110 SE", price: "₹ 93.55 Lakh", engine: "2.0L Petrol", transmission: "Automatic" },
      { name: "Defender 90 HSE", price: "₹ 97.00 Lakh", engine: "3.0L Diesel", transmission: "Automatic" },
      { name: "Defender 130 X", price: "₹ 1.41 Cr", engine: "3.0L Petrol", transmission: "Automatic" }
    ]
  },
  { 
    id: 29, 
    name: "Jeep Wrangler", 
    price: "₹ 62.65 - 67.65 Lakh*", 
    images: ["/cars/wrangler.jpg", "/cars/wrangler-side.jpg", "/cars/wrangler-rear.jpg", "/cars/wrangler-interior.jpg"], 
    category: "Luxury",
    fuelType: "Petrol",
    specs: { engine: "2.0L Turbo Petrol", power: "268 bhp", torque: "400 Nm", transmission: "8-AT 4x4", mileage: "12.1 kmpl", bootSpace: "897 L", groundClearance: "217 mm" },
    features: ["Rubicon 4x4 System", "Removable Doors & Roof", "Gorilla Glass Windshield", "Off-road Camera"],
    pros: ["Unstoppable Off-road", "Convertible Roof", "Iconic Styling"],
    cons: ["Bumpy Ride Quality", "Wind noise at high speeds", "Not practical for families"],
    expertReview: {
      verdict: "A toy for big boys. It's not about comfort, it's about freedom and adventure.",
      performance: "The 2.0L Turbo is punchy. The 4x4 system is the best in the world.",
      interior: "Water-resistant interior. Tech has improved but still rugged.",
      safety: "Safety rating is average, but build is tough."
    },
    variants: [
      { name: "Unlimited", price: "₹ 62.65 Lakh", engine: "2.0L Petrol", transmission: "Automatic" },
      { name: "Rubicon", price: "₹ 67.65 Lakh", engine: "2.0L Petrol", transmission: "Automatic" }
    ]
  },
  {
    id: 42, 
    name: "Toyota Vellfire",
    price: "₹ 1.20 - 1.32 Cr*",
    images: ["/cars/vellfire.jpg", "/cars/vellfire-side.jpg", "/cars/vellfire-rear.jpg", "/cars/vellfire-interior.jpg"],
    category: "Luxury",
    fuelType: "Hybrid",
    specs: { 
      engine: "2.5L Hybrid Petrol", 
      power: "190 bhp", 
      torque: "240 Nm", 
      transmission: "e-CVT", 
      mileage: "19.28 kmpl", 
      bootSpace: "Space for 6 Bags", 
      groundClearance: "160 mm" 
    },
    features: ["Executive Lounge Seats", "14-inch Rear Screen", "Massage Function", "Power Sliding Doors"],
    pros: ["Private Jet on Wheels", "Silent Hybrid Powertrain", "Toyota Reliability"],
    cons: ["Boxy Van Styling", "Very expensive"],
    expertReview: {
      verdict: "The ultimate chauffeur-driven vehicle. Better than most luxury sedans for comfort.",
      performance: "Not built for speed, but for smoothness. The hybrid system is silent.",
      interior: "It's a living room inside. The seats recline fully flat.",
      safety: "Loaded with safety tech and privacy curtains."
    },
    variants: [
      { name: "Hi-Grade", price: "₹ 1.20 Cr", engine: "2.5L Hybrid", transmission: "Automatic" },
      { name: "VIP Grade", price: "₹ 1.32 Cr", engine: "2.5L Hybrid", transmission: "Automatic" }
    ]
  },
  { 
    id: 23, 
    name: "Toyota Land Cruiser", 
    price: "₹ 2.10 Cr*", 
    images: ["/cars/landcruiser.jpg", "/cars/landcruiser-side.jpg", "/cars/landcruiser-rear.jpg", "/cars/landcruiser-interior.jpg"], 
    category: "Luxury",
    fuelType: "Diesel",
    specs: { engine: "3.3L V6 Diesel", power: "304 bhp", torque: "700 Nm", transmission: "10-Speed AT", mileage: "11 kmpl", bootSpace: "1131 L", groundClearance: "235 mm" },
    features: ["E-KDSS Suspension", "Multi-Terrain Monitor", "JBL 14-Speaker Audio", "Fingerprint Authentication"],
    pros: ["Legendary Durability", "Master of All Terrains", "Resale Value"],
    cons: ["Waiting period spans years", "Price is eye-watering"],
    expertReview: {
      verdict: "The LC300 is a masterpiece of engineering. It will outlast its owner.",
      performance: "The V6 Diesel is a powerhouse. It handles on-road duties surprisingly well.",
      interior: "Functional luxury. Everything feels built to last forever.",
      safety: "10 Airbags and advanced off-road safety systems."
    },
    variants: [
      { name: "ZX Diesel", price: "₹ 2.10 Cr", engine: "3.3L Diesel", transmission: "Automatic" }
    ]
  },
  { 
    id: 28, 
    name: "Audi Q5", 
    price: "₹ 65.18 - 70.45 Lakh*", 
    images: ["/cars/q5.jpg", "/cars/q5-side.jpg", "/cars/q5-rear.jpg", "/cars/q5-interior.jpg"], 
    category: "Luxury",
    fuelType: "Petrol",
    specs: { engine: "2.0L TFSI Petrol", power: "261 bhp", torque: "370 Nm", transmission: "7-Speed S-Tronic", mileage: "13.4 kmpl", bootSpace: "520 L", groundClearance: "200 mm" },
    features: ["Quattro AWD", "Panoramic Glass Sunroof", "Park Assist", "Bang & Olufsen Sound System"],
    pros: ["Refined Drive", "Quattro Grip", "Comfortable Suspension"],
    cons: ["Looks similar to smaller Q3", "Interior design is getting old"],
    expertReview: {
      verdict: "A sensible luxury SUV. It does everything you ask of it without fuss.",
      performance: "The TFSI engine is peppy. Quattro system provides immense grip.",
      interior: "High quality materials but design is safe and conservative.",
      safety: "5-Star rating. Very stable at high speeds."
    },
    variants: [
      { name: "Premium Plus", price: "₹ 65.18 Lakh", engine: "2.0L Petrol", transmission: "Automatic" },
      { name: "Technology", price: "₹ 70.45 Lakh", engine: "2.0L Petrol", transmission: "Automatic" }
    ]
  },
  

  // ==============================
  // 3. SEDAN CATEGORY
  // ==============================
  { 
    id: 9, 
    name: "Hyundai Verna", 
    price: "₹ 11.00 - 17.42 Lakh*", 
    images: ["/cars/verna.jpg", "/cars/verna-side.jpg", "/cars/verna-rear.jpg", "/cars/verna-interior.jpg"], 
    category: "Sedan",
    fuelType: "Petrol",
    specs: { engine: "1.5L Turbo Petrol", power: "158 bhp", torque: "253 Nm", transmission: "7-DCT", mileage: "20.6 kmpl", bootSpace: "528 L", groundClearance: "170 mm" },
    features: ["Level 2 ADAS", "Heated & Ventilated Seats", "Bose Audio", "Switchable Infotainment Control"],
    pros: ["Futuristic Styling", "Most Powerful in Segment", "ADAS Safety Tech"],
    cons: ["Design is polarizing", "Soft suspension bottoms out on big bumps"],
    expertReview: {
      verdict: "The new Verna is a bold statement. It's fast, packed with tech, and very comfortable.",
      performance: "The 1.5 Turbo is a beast. 0-100 in under 9 seconds. Best engine in segment.",
      interior: "Dual screens look great. The 2-spoke steering is modern.",
      safety: "First Hyundai in India to get 5 Stars in Global NCAP."
    },
    variants: [
      { name: "EX", price: "₹ 11.00 Lakh", engine: "1.5L Petrol", transmission: "Manual" },
      { name: "S", price: "₹ 11.99 Lakh", engine: "1.5L Petrol", transmission: "Manual" },
      { name: "SX Turbo", price: "₹ 14.87 Lakh", engine: "1.5L Turbo", transmission: "Manual" },
      { name: "SX (O) Turbo DCT", price: "₹ 17.42 Lakh", engine: "1.5L Turbo", transmission: "Automatic" }
    ]
  },
  { 
    id: 10, 
    name: "Honda City", 
    price: "₹ 11.82 - 16.30 Lakh*", 
    images: ["/cars/city.jpg", "/cars/city-side.jpg", "/cars/city-rear.jpg", "/cars/city-interior.jpg"], 
    category: "Sedan",
    fuelType: "Petrol",
    specs: { engine: "1.5L i-VTEC", power: "119 bhp", torque: "145 Nm", transmission: "CVT / MT", mileage: "18.4 kmpl", bootSpace: "506 L", groundClearance: "165 mm" },
    features: ["Honda Sensing (ADAS)", "Lanewatch Camera", "Wireless CarPlay", "Soft Touch Dashboard"],
    pros: ["Best Back Seat Comfort", "Smooth i-VTEC Engine", "Reliable"],
    cons: ["Infotainment screen is low quality", "Noise insulation could be better"],
    expertReview: {
      verdict: "The City is still the king of comfort. Perfect for chauffeur-driven owners.",
      performance: "The i-VTEC loves to rev. It's not the fastest anymore but very engaging.",
      interior: "Plush seats and great ergonomics. Feels like a proper sedan.",
      safety: "Comes with ADAS features to prevent accidents."
    },
    variants: [
      { name: "SV", price: "₹ 11.82 Lakh", engine: "1.5L Petrol", transmission: "Manual" },
      { name: "V CVT", price: "₹ 13.85 Lakh", engine: "1.5L Petrol", transmission: "Automatic" },
      { name: "ZX", price: "₹ 15.05 Lakh", engine: "1.5L Petrol", transmission: "Manual" },
      { name: "ZX CVT", price: "₹ 16.30 Lakh", engine: "1.5L Petrol", transmission: "Automatic" }
    ]
  },
  { 
    id: 11, 
    name: "Volkswagen Virtus", 
    price: "₹ 11.56 - 19.41 Lakh*", 
    images: ["/cars/virtus.jpg", "/cars/virtus-side.jpg", "/cars/virtus-rear.jpg", "/cars/virtus-interior.jpg"], 
    category: "Sedan",
    fuelType: "Petrol",
    specs: { engine: "1.5L TSI EVO", power: "148 bhp", torque: "250 Nm", transmission: "7-DSG", mileage: "18.6 kmpl", bootSpace: "521 L", groundClearance: "179 mm" },
    features: ["GT Line Styling", "Ventilated Front Seats", "10-inch VW Play", "Active Cylinder Technology"],
    pros: ["Timeless Elegant Design", "Solid German Build", "Great Handling"],
    cons: ["Interior plastics feel cheap in places", "AC cooling issues reported"],
    expertReview: {
      verdict: "A driver's delight. If you love driving, the Virtus GT is the car for you.",
      performance: "The DSG gearbox shifts lightning fast. Handling is precise.",
      interior: "Clean and functional. The GT version gets sporty red accents.",
      safety: "5-Star GNCAP rating. The door thud assures you of safety."
    },
    variants: [
      { name: "Comfortline", price: "₹ 11.56 Lakh", engine: "1.0L TSI", transmission: "Manual" },
      { name: "Highline AT", price: "₹ 14.87 Lakh", engine: "1.0L TSI", transmission: "Automatic" },
      { name: "Topline", price: "₹ 15.27 Lakh", engine: "1.0L TSI", transmission: "Manual" },
      { name: "GT Plus DSG", price: "₹ 19.41 Lakh", engine: "1.5L TSI", transmission: "Automatic" }
    ]
  },
  { 
    id: 12, 
    name: "Skoda Slavia", 
    price: "₹ 11.53 - 19.13 Lakh*", 
    images: ["/cars/slavia.jpg", "/cars/slavia-side.jpg", "/cars/slavia-rear.jpg", "/cars/slavia-interior.jpg"], 
    category: "Sedan",
    fuelType: "Petrol",
    specs: { engine: "1.5L TSI", power: "148 bhp", torque: "250 Nm", transmission: "7-DSG", mileage: "18.7 kmpl", bootSpace: "521 L", groundClearance: "179 mm" },
    features: ["Subwoofer in Boot", "Electric Sunroof", "8-inch Virtual Cockpit", "Cooled Glovebox"],
    pros: ["Classy Design", "Huge Boot", "Fun to Drive"],
    cons: ["Touch AC controls are finicky", "Service costs can be higher"],
    expertReview: {
      verdict: "The Slavia brings elegance back to sedans. It looks and feels expensive.",
      performance: "Same engines as Virtus but tuned for a slightly more compliant ride.",
      interior: "The 2-spoke steering and layered dashboard look premium.",
      safety: "Top marks in safety. Stable at any speed."
    },
    variants: [
      { name: "Classic", price: "₹ 11.53 Lakh", engine: "1.0L TSI", transmission: "Manual" },
      { name: "Signature AT", price: "₹ 15.03 Lakh", engine: "1.0L TSI", transmission: "Automatic" },
      { name: "Prestige", price: "₹ 15.93 Lakh", engine: "1.0L TSI", transmission: "Manual" },
      { name: "Prestige 1.5 DSG", price: "₹ 19.13 Lakh", engine: "1.5L TSI", transmission: "Automatic" }
    ]
  },

  // ==============================
  // 4. HATCHBACK CATEGORY
  // ==============================
  { 
    id: 5, 
    name: "Maruti Swift", 
    price: "₹ 6.49 - 9.64 Lakh*", 
    images: ["/cars/swift.jpg", "/cars/swift1-side.jpg", "/cars/swift1-rear.jpg", "/cars/swift1-interior.jpg"], 
    category: "Hatchback",
    fuelType: "Petrol",
    specs: { engine: "1.2L Z-Series", power: "80 bhp", torque: "112 Nm", transmission: "5-MT / AMT", mileage: "25.7 kmpl", bootSpace: "265 L", groundClearance: "163 mm" },
    features: ["9-inch SmartPlay Pro", "6 Airbags Standard", "Wireless Charger", "Rear AC Vents"],
    pros: ["Excellent Mileage", "Sporty Looks", "Feature Loaded"],
    cons: ["3-Cylinder engine vibrates a bit", "Rear seat space is average"],
    expertReview: {
      verdict: "The people's champion gets better. It's safer, more efficient, and feature-loaded.",
      performance: "The new engine is tuned for city driveability and extreme mileage.",
      interior: "Sporty all-black interior looks good. Floating screen is responsive.",
      safety: "Improved standard safety kit is a big step forward."
    },
    variants: [
      { name: "LXi", price: "₹ 6.49 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "VXi", price: "₹ 7.29 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "ZXi", price: "₹ 8.29 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "ZXi+ AMT", price: "₹ 9.64 Lakh", engine: "1.2L Petrol", transmission: "Automatic" }
    ]
  },
  { 
    id: 6, 
    name: "Tata Altroz", 
    price: "₹ 6.65 - 10.80 Lakh*", 
    images: ["/cars/altroz.jpg", "/cars/altroz-side.jpg", "/cars/altroz-rear.jpg", "/cars/altroz-interior.jpg"], 
    category: "Hatchback",
    fuelType: "Diesel",
    specs: { engine: "1.2L i-Turbo", power: "108 bhp", torque: "140 Nm", transmission: "DCA / MT", mileage: "18.5 kmpl", bootSpace: "345 L", groundClearance: "165 mm" },
    features: ["5 Star Safety", "Voice Assisted Sunroof", "90 Degree Door Opening", "Xpress Cool"],
    pros: ["5-Star Safety", "Only Hatchback with Diesel", "Great Looks"],
    cons: ["Engine lacks refinement", "Fit and finish inconsistencies"],
    expertReview: {
      verdict: "The gold standard for safety in hatchbacks. It looks stunning and drives well.",
      performance: "The chassis is excellent. The diesel engine is a highway star.",
      interior: "Premium feel with ambient lighting. Rear floor is flat.",
      safety: "The safest hatchback in India. Period."
    },
    variants: [
      { name: "XE", price: "₹ 6.65 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "XM+", price: "₹ 7.60 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "XZ Diesel", price: "₹ 8.90 Lakh", engine: "1.5L Diesel", transmission: "Manual" },
      { name: "XZ+ Turbo", price: "₹ 10.00 Lakh", engine: "1.2L Turbo", transmission: "Manual" }
    ]
  },
  { 
    id: 7, 
    name: "Hyundai i20", 
    price: "₹ 7.04 - 11.21 Lakh*", 
    images: ["/cars/i20.jpg", "/cars/i20-side.jpg", "/cars/i20-rear.jpg", "/cars/i20-interior.jpg"], 
    category: "Hatchback",
    fuelType: "Petrol",
    specs: { engine: "1.2L Kappa", power: "82 bhp", torque: "114 Nm", transmission: "IVT / MT", mileage: "20 kmpl", bootSpace: "311 L", groundClearance: "170 mm" },
    features: ["Bose 7-Speaker Sound", "Electric Sunroof", "BlueLink Connectivity", "Puddle Lamps"],
    pros: ["Premium Interior Quality", "Spacious Cabin", "Refined Engine"],
    cons: ["Expensive", "No Diesel Option"],
    expertReview: {
      verdict: "A premium hatchback that feels like a segment above. Great for tech lovers.",
      performance: "Smooth and silent. The CVT is perfect for traffic.",
      interior: "Best in class quality. The Bose sound system is unmatched.",
      safety: "Standard 6 airbags give peace of mind."
    },
    variants: [
      { name: "Era", price: "₹ 7.04 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "Magna", price: "₹ 7.75 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "Sportz IVT", price: "₹ 9.38 Lakh", engine: "1.2L Petrol", transmission: "Automatic" },
      { name: "Asta (O)", price: "₹ 10.00 Lakh", engine: "1.2L Petrol", transmission: "Manual" }
    ]
  },
  { 
    id: 8, 
    name: "Maruti Baleno", 
    price: "₹ 6.66 - 9.83 Lakh*", 
    images: ["/cars/baleno.jpg", "/cars/baleno-side.jpg", "/cars/baleno-rear.jpg", "/cars/baleno-interior.jpg"], 
    category: "Hatchback",
    fuelType: "Petrol",
    specs: { engine: "1.2L DualJet", power: "88 bhp", torque: "113 Nm", transmission: "AMT / MT", mileage: "22.9 kmpl", bootSpace: "318 L", groundClearance: "170 mm" },
    features: ["Heads Up Display", "360 View Camera", "Suzuki Connect", "UV Cut Glass"],
    pros: ["Spacious Interior", "Very Efficient", "Low Maintenance"],
    cons: ["Build quality feels light", "AMT gearbox is not smooth"],
    expertReview: {
      verdict: "The practical choice. It offers the most space and features for the money.",
      performance: "Peppy engine. The suspension is tuned for comfort.",
      interior: "Wide cabin can seat 3 at the back easily. HUD is a cool feature.",
      safety: "Better build than before but still awaits a crash test."
    },
    variants: [
      { name: "Sigma", price: "₹ 6.66 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "Delta AMT", price: "₹ 8.00 Lakh", engine: "1.2L Petrol", transmission: "Automatic" },
      { name: "Zeta", price: "₹ 8.43 Lakh", engine: "1.2L Petrol", transmission: "Manual" },
      { name: "Alpha AMT", price: "₹ 9.83 Lakh", engine: "1.2L Petrol", transmission: "Automatic" }
    ]
  }
];