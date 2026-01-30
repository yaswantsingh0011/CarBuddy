import { createClient } from '@/utils/supabase/server';

export async function getActiveBrands() {
  const supabase = await createClient();

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
