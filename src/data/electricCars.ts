// src/data/electricCars.ts

export const electricCars = [
  // ==============================
  // 1. TATA PUNCH EV
  // ==============================
  {
    id: 806,
    name: "Tata Punch EV",
    priceRange: "₹ 10.99 - 15.49 Lakh*",
    images: ["/cars/punch-ev.jpg", "/cars/punch-ev-side.jpg", "/cars/punch-ev-rear.jpg", "/cars/punch-ev-interior.jpg"],
    category: "EV",
    fuelType: "Electric", // ✅ Added for Badge
    specs: {
      engine: "35 kWh Battery (LR)",
      power: "120 bhp",
      torque: "190 Nm",
      transmission: "Automatic",
      mileage: "421 km (Range)",
      bootSpace: "366 L",
      groundClearance: "190 mm"
    },
    features: ["Frunk (Front Trunk)", "Voice Assisted Sunroof", "Ventilated Front Seats", "360 Degree Surround View"],
    // ✅ VARIANTS ADDED
    variants: [
      { name: "Smart (Standard Range)", price: "₹ 10.99 Lakh", engine: "25 kWh / 315km", transmission: "Automatic" },
      { name: "Adventure (Standard Range)", price: "₹ 11.99 Lakh", engine: "25 kWh / 315km", transmission: "Automatic" },
      { name: "Empowered (Long Range)", price: "₹ 13.99 Lakh", engine: "35 kWh / 421km", transmission: "Automatic" },
      { name: "Empowered+ S LR", price: "₹ 15.49 Lakh", engine: "35 kWh / 421km", transmission: "Automatic" }
    ]
  },

  // ==============================
  // 2. TATA NEXON EV
  // ==============================
  {
    id: 807,
    name: "Tata Nexon EV",
    priceRange: "₹ 14.49 - 19.49 Lakh*",
    images: ["/cars/nexon-ev.jpg", "/cars/nexon-ev-side.jpg", "/cars/nexon-ev-rear.jpg", "/cars/nexon-ev-interior.jpg"],
    category: "EV",
    fuelType: "Electric", // ✅ Added for Badge
    specs: {
      engine: "40.5 kWh Battery (LR)",
      power: "143 bhp",
      torque: "215 Nm",
      transmission: "Automatic",
      mileage: "465 km (Range)",
      bootSpace: "350 L",
      groundClearance: "190 mm"
    },
    features: ["V2L (Vehicle to Load)", "JBL Cinematic Sound System", "12.3-inch Touchscreen", "Paddle Shifters for Regen"],
    // ✅ VARIANTS ADDED
    variants: [
      { name: "Creative Medium Range", price: "₹ 14.49 Lakh", engine: "30 kWh / 325km", transmission: "Automatic" },
      { name: "Fearless Medium Range", price: "₹ 15.99 Lakh", engine: "30 kWh / 325km", transmission: "Automatic" },
      { name: "Fearless + Long Range", price: "₹ 16.99 Lakh", engine: "40.5 kWh / 465km", transmission: "Automatic" },
      { name: "Empowered + Long Range", price: "₹ 19.49 Lakh", engine: "40.5 kWh / 465km", transmission: "Automatic" }
    ]
  },
  
  // ==============================
  // 3. MAHINDRA XEV 9e
  // ==============================
  {
    id: 802,
    name: "Mahindra XEV 9e",
    priceRange: "₹ 21.90 - 31.25 Lakh*",
    images: ["/cars/xev9e.jpg", "/cars/xev9e-side.jpg", "/cars/xev9e-rear.jpg", "/cars/xev9e-interior.jpg"],
    category: "EV",
    fuelType: "Electric", // ✅ Added for Badge
    specs: {
      engine: "79 kWh Battery",
      power: "282 bhp",
      torque: "380 Nm",
      transmission: "Automatic",
      mileage: "656 km (Range)",
      bootSpace: "663 L",
      groundClearance: "207 mm"
    },
    features: ["Triple Screen Dashboard", "16-Speaker Premium Audio", "HUD with Augmented Reality", "Multi-Zone Climate Control"],
    // ✅ VARIANTS ADDED
    variants: [
      { name: "AX3", price: "₹ 21.90 Lakh", engine: "59 kWh / 450km", transmission: "Automatic" },
      { name: "AX5", price: "₹ 23.90 Lakh", engine: "59 kWh / 450km", transmission: "Automatic" },
      { name: "AX7", price: "₹ 26.90 Lakh", engine: "79 kWh / 656km", transmission: "Automatic" },
      { name: "AX7 Luxury", price: "₹ 31.25 Lakh", engine: "79 kWh / 656km", transmission: "Automatic" }
    ]
  },

  // ==============================
  // 4. MG WINDSOR EV
  // ==============================
  {
    id: 803,
    name: "MG Windsor EV",
    priceRange: "₹ 13.50 - 15.50 Lakh*",
    images: ["/cars/windsor.jpg", "/cars/windsor-side.jpg", "/cars/windsor-rear.jpg", "/cars/windsor-interior.jpg"],
    category: "EV",
    fuelType: "Electric", // ✅ Added for Badge
    specs: {
      engine: "38 kWh Battery",
      power: "134 bhp",
      torque: "200 Nm",
      transmission: "Automatic",
      mileage: "449 km (Range)",
      bootSpace: "604 L",
      groundClearance: "186 mm"
    },
    features: ["Infinity View Glass Roof", "15.6-inch Grand View Touchscreen", "Aero Lounge Seats (135° Recline)", "256-Color Ambient Lighting"],
    // ✅ VARIANTS ADDED
    variants: [
      { name: "Excite", price: "₹ 13.50 Lakh", engine: "38 kWh / 331km", transmission: "Automatic" },
      { name: "Exclusive", price: "₹ 14.50 Lakh", engine: "38 kWh / 331km", transmission: "Automatic" },
      { name: "Essence", price: "₹ 15.50 Lakh", engine: "38 kWh / 331km", transmission: "Automatic" }
    ]
  },

  // ==============================
  // 5. TATA TIAGO EV
  // ==============================
  {
    id: 805,
    name: "Tata Tiago EV",
    priceRange: "₹ 7.99 - 11.89 Lakh*",
    images: ["/cars/tiago-ev.jpg", "/cars/tiago-ev-side.jpg", "/cars/tiago-ev-rear.jpg", "/cars/tiago-ev-interior.jpg"],
    category: "EV",
    fuelType: "Electric", // ✅ Added for Badge
    specs: {
      engine: "24 kWh Battery",
      power: "74 bhp",
      torque: "114 Nm",
      transmission: "Automatic",
      mileage: "315 km (Range)",
      bootSpace: "240 L",
      groundClearance: "168 mm"
    },
    features: ["Multi-Mode Regen Braking", "Cruise Control", "ZConnect App Features", "Auto Headlamps & Wipers"],
    // ✅ VARIANTS ADDED
    variants: [
      { name: "XE Medium Range", price: "₹ 7.99 Lakh", engine: "19.2 kWh / 250km", transmission: "Automatic" },
      { name: "XT Medium Range", price: "₹ 8.99 Lakh", engine: "19.2 kWh / 250km", transmission: "Automatic" },
      { name: "XT Long Range", price: "₹ 9.99 Lakh", engine: "24 kWh / 315km", transmission: "Automatic" },
      { name: "XZ+ Tech Lux LR", price: "₹ 11.89 Lakh", engine: "24 kWh / 315km", transmission: "Automatic" }
    ]
  }
];