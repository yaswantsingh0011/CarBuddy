// src/data/mostSearchedCars.ts

export const mostSearchedCars = [
  // ==============================
  // 1. SUV CATEGORY
  // ==============================

  { 
    id: 27, 
    name: "Mahindra XUV700", 
    price: "₹ 13.99 - 26.99 Lakh*", 
    images: ["/cars/xuv700.jpg", "/cars/xuv700.jpg", "/cars/xuv700.jpg", "/cars/xuv700.jpg"], 
    category: "SUV",
    specs: { engine: "2.0L mStallion Turbo", power: "197 bhp", torque: "380 Nm", transmission: "6-AT / 6-MT", mileage: "13 kmpl", bootSpace: "Expandable", groundClearance: "200 mm" },
    features: ["Skyroof", "Integrated Dual Screens", "ADAS Level 2", "Sony 3D Sound System"]
  },
  { 
    id: 17, 
    name: "Mahindra Scorpio-N", 
    price: "₹ 13.60 - 24.54 Lakh*", 
    images: ["/cars/scorpio-n.jpg", "/cars/scorpio-n.jpg", "/cars/scorpio-n.jpg", "/cars/scorpio-n.jpg"], 
    category: "SUV",
    specs: { engine: "2.2L mHawk Diesel", power: "172 bhp", torque: "400 Nm", transmission: "6-AT 4x4", mileage: "14 kmpl", bootSpace: "460 L", groundClearance: "187 mm" },
    features: ["4XPLOR Terrain Mode", "Alexa Built-in", "Driver Drowsiness Detection", "6-Seater Captain Seats"]
  },
  { 
    id: 19, 
    name: "Tata Harrier", 
    price: "₹ 15.49 - 26.44 Lakh*", 
    images: ["/cars/harrier.jpg", "/cars/harrier.jpg", "/cars/harrier.jpg", "/cars/harrier.jpg"], 
    category: "SUV",
    specs: { engine: "2.0L Kryotec Diesel", power: "168 bhp", torque: "350 Nm", transmission: "6-AT", mileage: "16.8 kmpl", bootSpace: "425 L", groundClearance: "205 mm" },
    features: ["#Dark Edition Styling", "ADAS with 12 Functions", "Panoramic Sunroof", "Welcome/Goodbye Animation"]
  },
  
  { 
    id: 25, 
    name: "Renault Kiger", 
    price: "₹ 6.50 - 11.23 Lakh*", 
    images: ["/cars/kiger.jpg", "/cars/kiger-side.jpg", "/cars/kiger-rear.jpg", "/cars/kiger-interior.jpg"], 
    category: "SUV",
    specs: { engine: "1.0L Turbo", power: "99 bhp", torque: "160 Nm", transmission: "CVT / MT", mileage: "20.5 kmpl", bootSpace: "405 L", groundClearance: "205 mm" },
    features: ["Sport Mode", "Wireless CarPlay", "PM 2.5 Air Filter", "Digital Instrument Cluster"]
  },// --- Compact & Micro SUVs ---
  { 
    id: 1, 
    name: "Hyundai Venue", 
    price: "₹ 7.90 - 15.69 Lakh*", 
    images: ["/cars/venue.jpg", "/cars/venue-side.jpg", "/cars/venue-rear.jpg", "/cars/venue-interior.jpg"], 
    category: "SUV",
    specs: { engine: "1.2L Kappa Petrol", power: "82 bhp", torque: "114 Nm", transmission: "5-MT / 7-DCT", mileage: "17.5 kmpl", bootSpace: "350 L", groundClearance: "195 mm" },
    features: ["Electric Sunroof", "BlueLink Connected Tech", "Reclining Rear Seats", "6 Airbags Standard"]
  },
  { 
    id: 2, 
    name: "Tata Nexon", 
    price: "₹ 7.32 - 14.05 Lakh*", 
    images: ["/cars/nexon.jpg", "/cars/nexon-side.jpg", "/cars/nexon-rear.jpg", "/cars/nexon-interior.jpg"], 
    category: "SUV",
    specs: { engine: "1.2L Turbo Petrol", power: "118 bhp", torque: "170 Nm", transmission: "6-MT / AMT", mileage: "17.0 kmpl", bootSpace: "382 L", groundClearance: "208 mm" },
    features: ["10.25-inch Infotainment", "5 Star Global NCAP", "Ventilated Seats", "360 Degree Camera"]
  },
  { 
    id: 3, 
    name: "Maruti FRONX", 
    price: "₹ 6.85 - 11.98 Lakh*", 
    images: ["/cars/fronx.jpg", "/cars/fronx-side.jpg", "/cars/fronx-rear.jpg", "/cars/fronx-interior.jpg"], 
    category: "SUV",
    specs: { engine: "1.0L Turbo Boosterjet", power: "99 bhp", torque: "147 Nm", transmission: "5-MT / 6-AT", mileage: "21.5 kmpl", bootSpace: "308 L", groundClearance: "190 mm" },
    features: ["Heads Up Display (HUD)", "9-inch SmartPlay Pro+", "360 View Camera", "Wireless Charger"]
  },
  { 
    id: 24, 
    name: "Tata Punch", 
    price: "₹ 6.13 - 10.20 Lakh*", 
    images: ["/cars/punch.jpg", "/cars/punch-side.jpg", "/cars/punch-rear.jpg", "/cars/punch-interior.jpg"], 
    category: "SUV",
    specs: { engine: "1.2L Revotron", power: "87 bhp", torque: "115 Nm", transmission: "5-MT / AMT", mileage: "18.8 kmpl", bootSpace: "366 L", groundClearance: "187 mm" },
    features: ["5 Star Safety Rating", "7-inch Harman Screen", "90 Degree Door Opening", "Traction Pro Mode"]
  },
  

  // --- Mid-Size & Premium SUVs ---
  { 
    id: 16, 
    name: "Hyundai Creta", 
    price: "₹ 11.00 - 20.15 Lakh*", 
    images: ["/cars/creta.jpg", "/cars/creta.jpg", "/cars/creta.jpg", "/cars/creta.jpg"], 
    category: "SUV",
    specs: { engine: "1.5L Turbo Petrol", power: "158 bhp", torque: "253 Nm", transmission: "7-DCT", mileage: "18.4 kmpl", bootSpace: "433 L", groundClearance: "190 mm" },
    features: ["Panoramic Sunroof", "Level 2 ADAS", "Bose Premium Sound", "Dual Zone Climate Control"]
  },
  { 
    id: 26, 
    name: "Kia Seltos", 
    price: "₹ 10.90 - 20.35 Lakh*", 
    images: ["/cars/seltos.jpg", "/cars/seltos.jpg", "/cars/seltos.jpg", "/cars/seltos.jpg"], 
    category: "SUV",
    specs: { engine: "1.5L Turbo Petrol", power: "158 bhp", torque: "253 Nm", transmission: "7-DCT", mileage: "17.9 kmpl", bootSpace: "433 L", groundClearance: "190 mm" },
    features: ["Dual 10.25-inch Screens", "Level 2 ADAS", "Panoramic Sunroof", "Electric Parking Brake"]
  },
  

  // --- Off-Road & Full Size ---
 
  { 
    id: 4, 
    name: "Toyota Fortuner", 
    price: "₹ 33.65 - 48.85 Lakh*", 
    images: ["/cars/fortuner.jpg", "/cars/fortuner.jpg", "/cars/fortuner.jpg", "/cars/fortuner.jpg"], 
    category: "SUV",
    specs: { engine: "2.8L Diesel", power: "201 bhp", torque: "500 Nm", transmission: "6-AT 4x4", mileage: "10 kmpl", bootSpace: "296 L", groundClearance: "225 mm" },
    features: ["Sigma 4 Drive Mode", "Ventilated Seats", "Power Tailgate", "JBL 11-Speaker System"]
  },


  // ==============================
  // 2. LUXURY CATEGORY
  // ==============================

{ 
    id: 29, 
    name: "Jeep Wrangler", 
    price: "₹ 62.65 - 67.65 Lakh*", 
    images: ["/cars/wrangler.jpg", "/cars/wrangler-side.jpg", "/cars/wrangler-rear.jpg", "/cars/wrangler-interior.jpg"], 
    category: "Luxury",
    specs: { engine: "2.0L Turbo Petrol", power: "268 bhp", torque: "400 Nm", transmission: "8-AT 4x4", mileage: "12.1 kmpl", bootSpace: "897 L", groundClearance: "217 mm" },
    features: ["Rubicon 4x4 System", "Removable Doors & Roof", "Gorilla Glass Windshield", "Off-road Camera"]
  },
  { 
    id: 20, 
    name: "Mercedes-Benz G-Class", 
    price: "₹ 2.55 - 4.00 Cr*", 
    images: ["/cars/g63.jpg", "/cars/g63-side.jpg", "/cars/g63-rear.jpg", "/cars/g63-interior.jpg"], 
    category: "Luxury",
    specs: { engine: "4.0L V8 Biturbo", power: "577 bhp", torque: "850 Nm", transmission: "AMG 9-Speed", mileage: "6 kmpl", bootSpace: "667 L", groundClearance: "241 mm" },
    features: ["3 Differential Locks", "AMG Active Ride Control", "Burmester Surround Sound", "Multicontour Massage Seats"]
  },
  { 
    id: 21, 
    name: "Land Rover Defender", 
    price: "₹ 93.55 Lakh - 2.30 Cr*", 
    images: ["/cars/defender.jpg", "/cars/defender-side.jpg", "/cars/defender-rear.jpg", "/cars/defender-interior.jpg"], 
    category: "Luxury",
    specs: { engine: "3.0L Diesel / 5.0L V8", power: "296 bhp", torque: "650 Nm", transmission: "8-AT", mileage: "10 kmpl", bootSpace: "857 L", groundClearance: "291 mm" },
    features: ["ClearSight Ground View", "Air Suspension", "Wade Sensing", "Pivi Pro Infotainment"]
  },
  { 
    id: 22, 
    name: "Range Rover", 
    price: "₹ 2.39 - 4.17 Cr*", 
    images: ["/cars/range-rover.jpg", "/cars/range-rover-side.jpg", "/cars/range-rover-rear.jpg", "/cars/range-rover-interior.jpg"], 
    category: "Luxury",
    specs: { engine: "3.0L Diesel LWB", power: "346 bhp", torque: "700 Nm", transmission: "8-AT AWD", mileage: "13 kmpl", bootSpace: "818 L", groundClearance: "219 mm" },
    features: ["Executive Class Rear Seats", "Active Noise Cancellation", "All-Wheel Steering", "Meridian Signature Sound"]
  },
  { 
    id: 23, 
    name: "Toyota Land Cruiser", 
    price: "₹ 2.10 Cr*", 
    images: ["/cars/landcruiser.jpg", "/cars/landcruiser-side.jpg", "/cars/landcruiser-rear.jpg", "/cars/landcruiser-interior.jpg"], 
    category: "Luxury",
    specs: { engine: "3.3L V6 Diesel", power: "304 bhp", torque: "700 Nm", transmission: "10-Speed AT", mileage: "11 kmpl", bootSpace: "1131 L", groundClearance: "235 mm" },
    features: ["E-KDSS Suspension", "Multi-Terrain Monitor", "JBL 14-Speaker Audio", "Fingerprint Authentication"]
  },


  { 
    id: 13, 
    name: "Mercedes-Benz C-Class", 
    price: "₹ 60.00 - 68.00 Lakh*", 
    images: ["/cars/c-class.jpg", "/cars/c-class.jpg", "/cars/c-class.jpg", "/cars/c-class.jpg"], 
    category: "Luxury",
    specs: { engine: "2.0L Diesel", power: "197 bhp", torque: "440 Nm", transmission: "9G-TRONIC", mileage: "23 kmpl", bootSpace: "455 L", groundClearance: "157 mm" },
    features: ["MBUX Infotainment", "Burmester 3D Sound", "Digital Lights", "Fingerprint Scanner"]
  },
  { 
    id: 14, 
    name: "BMW 3 Series", 
    price: "₹ 72.90 Lakh*", 
    images: ["/cars/bmw-3.jpg", "/cars/bmw-3.jpg", "/cars/bmw-3.jpg", "/cars/bmw-3.jpg"], 
    category: "Luxury",
    specs: { engine: "3.0L Inline-6 Turbo", power: "369 bhp", torque: "500 Nm", transmission: "8-Speed Steptronic", mileage: "11 kmpl", bootSpace: "480 L", groundClearance: "135 mm" },
    features: ["Curved Display", "M Sport Suspension", "Carbon Fiber Trim", "Head-up Display"]
  },
  { 
    id: 15, 
    name: "Audi A4", 
    price: "₹ 45.34 - 53.50 Lakh*", 
    images: ["/cars/audi-a4.jpg", "/cars/audi-a4.jpg", "/cars/audi-a4.jpg", "/cars/audi-a4.jpg"], 
    category: "Luxury",
    specs: { engine: "2.0L TFSI", power: "187 bhp", torque: "320 Nm", transmission: "7-Speed S-Tronic", mileage: "17.4 kmpl", bootSpace: "460 L", groundClearance: "135 mm" },
    features: ["Virtual Cockpit", "Comfort Key", "3-Zone Climate Control", "Park Assist"]
  },
  { 
    id: 28, 
    name: "Audi Q5", 
    price: "₹ 65.18 - 70.45 Lakh*", 
    images: ["/cars/q5.jpg", "/cars/q5-side.jpg", "/cars/q5-rear.jpg", "/cars/q5-interior.jpg"], 
    category: "Luxury",
    specs: { engine: "2.0L TFSI Petrol", power: "261 bhp", torque: "370 Nm", transmission: "7-Speed S-Tronic", mileage: "13.4 kmpl", bootSpace: "520 L", groundClearance: "200 mm" },
    features: ["Quattro AWD", "Panoramic Glass Sunroof", "Park Assist", "Bang & Olufsen Sound System"]
  },
  

  // ==============================
  // 3. SEDAN CATEGORY
  // ==============================
  { 
    id: 9, 
    name: "Hyundai Verna", 
    price: "₹ 11.00 - 17.42 Lakh*", 
    images: ["/cars/verna.jpg", "/cars/verna.jpg", "/cars/verna.jpg", "/cars/verna.jpg"], 
    category: "Sedan",
    specs: { engine: "1.5L Turbo Petrol", power: "158 bhp", torque: "253 Nm", transmission: "7-DCT", mileage: "20.6 kmpl", bootSpace: "528 L", groundClearance: "170 mm" },
    features: ["Level 2 ADAS", "Heated & Ventilated Seats", "Bose Audio", "Switchable Infotainment Control"]
  },
  { 
    id: 10, 
    name: "Honda City", 
    price: "₹ 11.82 - 16.30 Lakh*", 
    images: ["/cars/city.jpg", "/cars/city.jpg", "/cars/city.jpg", "/cars/city.jpg"], 
    category: "Sedan",
    specs: { engine: "1.5L i-VTEC", power: "119 bhp", torque: "145 Nm", transmission: "CVT / MT", mileage: "18.4 kmpl", bootSpace: "506 L", groundClearance: "165 mm" },
    features: ["Honda Sensing (ADAS)", "Lanewatch Camera", "Wireless CarPlay", "Soft Touch Dashboard"]
  },
  { 
    id: 11, 
    name: "Volkswagen Virtus", 
    price: "₹ 11.56 - 19.41 Lakh*", 
    images: ["/cars/virtus.jpg", "/cars/virtus.jpg", "/cars/virtus.jpg", "/cars/virtus.jpg"], 
    category: "Sedan",
    specs: { engine: "1.5L TSI EVO", power: "148 bhp", torque: "250 Nm", transmission: "7-DSG", mileage: "18.6 kmpl", bootSpace: "521 L", groundClearance: "179 mm" },
    features: ["GT Line Styling", "Ventilated Front Seats", "10-inch VW Play", "Active Cylinder Technology"]
  },
  { 
    id: 12, 
    name: "Skoda Slavia", 
    price: "₹ 11.53 - 19.13 Lakh*", 
    images: ["/cars/slavia.jpg", "/cars/slavia.jpg", "/cars/slavia.jpg", "/cars/slavia.jpg"], 
    category: "Sedan",
    specs: { engine: "1.5L TSI", power: "148 bhp", torque: "250 Nm", transmission: "7-DSG", mileage: "18.7 kmpl", bootSpace: "521 L", groundClearance: "179 mm" },
    features: ["Subwoofer in Boot", "Electric Sunroof", "8-inch Virtual Cockpit", "Cooled Glovebox"]
  },

  // ==============================
  // 4. HATCHBACK CATEGORY
  // ==============================
  { 
    id: 5, 
    name: "Maruti Swift", 
    price: "₹ 6.49 - 9.64 Lakh*", 
    images: ["/cars/swift1.jpg", "/cars/swift1.jpg", "/cars/swift1.jpg", "/cars/swift1.jpg"], 
    category: "Hatchback",
    specs: { engine: "1.2L Z-Series", power: "80 bhp", torque: "112 Nm", transmission: "5-MT / AMT", mileage: "25.7 kmpl", bootSpace: "265 L", groundClearance: "163 mm" },
    features: ["9-inch SmartPlay Pro", "6 Airbags Standard", "Wireless Charger", "Rear AC Vents"]
  },
  { 
    id: 6, 
    name: "Tata Altroz", 
    price: "₹ 6.65 - 10.80 Lakh*", 
    images: ["/cars/altroz.jpg", "/cars/altroz.jpg", "/cars/altroz.jpg", "/cars/altroz.jpg"], 
    category: "Hatchback",
    specs: { engine: "1.2L i-Turbo", power: "108 bhp", torque: "140 Nm", transmission: "DCA / MT", mileage: "18.5 kmpl", bootSpace: "345 L", groundClearance: "165 mm" },
    features: ["5 Star Safety", "Voice Assisted Sunroof", "90 Degree Door Opening", "Xpress Cool"]
  },
  { 
    id: 7, 
    name: "Hyundai i20", 
    price: "₹ 7.04 - 11.21 Lakh*", 
    images: ["/cars/i20.jpg", "/cars/i20.jpg", "/cars/i20.jpg", "/cars/i20.jpg"], 
    category: "Hatchback",
    specs: { engine: "1.2L Kappa", power: "82 bhp", torque: "114 Nm", transmission: "IVT / MT", mileage: "20 kmpl", bootSpace: "311 L", groundClearance: "170 mm" },
    features: ["Bose 7-Speaker Sound", "Electric Sunroof", "BlueLink Connectivity", "Puddle Lamps"]
  },
  { 
    id: 8, 
    name: "Maruti Baleno", 
    price: "₹ 6.66 - 9.83 Lakh*", 
    images: ["/cars/baleno.jpg", "/cars/baleno.jpg", "/cars/baleno.jpg", "/cars/baleno.jpg"], 
    category: "Hatchback",
    specs: { engine: "1.2L DualJet", power: "88 bhp", torque: "113 Nm", transmission: "AMT / MT", mileage: "22.9 kmpl", bootSpace: "318 L", groundClearance: "170 mm" },
    features: ["Heads Up Display", "360 View Camera", "Suzuki Connect", "UV Cut Glass"]
  }
];