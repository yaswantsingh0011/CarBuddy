import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

import { dealersData } from "../src/data/dealersData";
import { brandSlugMap } from "./brandSlugMap";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function importDealers() {
  console.log("🚀 Dealer import started...");

  let inserted = 0;

  for (const cityBlock of dealersData) {
    for (const dealer of cityBlock.dealers) {

      const brandSlug = brandSlugMap[dealer.brand];

      if (!brandSlug) {
        console.warn(`⚠️ Missing brand slug for ${dealer.brand}`);
        continue;
      }

      const payload = {
        name: dealer.name,
        brand_slug: brandSlug,
        city: cityBlock.city,
        area: dealer.address.split(",")[0],
        address: dealer.address,
        phone: dealer.phone,
        map_link: dealer.mapLink,
        is_active: true
      };

      const { error } = await supabase
        .from("dealers")
        .insert(payload);

      if (error) {
        console.error("❌ Failed:", dealer.name, error.message);
      } else {
        console.log("✅ Added:", dealer.name);
        inserted++;
      }
    }
  }

  console.log(`🎉 Import complete: ${inserted} dealers`);
}

importDealers();
