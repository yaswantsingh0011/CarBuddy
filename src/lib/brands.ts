// ✅ FIXED: Server-side utility — server client use hoga
import { createServerSupabaseClient } from '@/lib/supabaseServer';

export async function getActiveBrands() {
  const supabase = createServerSupabaseClient();
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