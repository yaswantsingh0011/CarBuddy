// ✅ FIXED: Sahi file import ki hai
import { supabase } from '@/lib/supabaseClient';

export async function getActiveBrands() {
  // ❌ Removed: const supabase = await createClient();
  
  // Ab direct imported supabase object use hoga
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Brands fetch error:', error);
    return [];
  }

  return data ?? [];
}