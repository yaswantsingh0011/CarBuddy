'use server';

// ✅ FIXED: Server action mein server client use hoga, browser client nahi
import { createServerSupabaseClient } from '@/lib/supabaseServer';

/* ---------- utils ---------- */
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/* ---------- ADD BRAND ---------- */
export async function addBrand(formData: FormData) {
  const supabase = createServerSupabaseClient();

  const name = formData.get('name') as string;
  const file = formData.get('logo') as File;

  if (!name || !file) {
    throw new Error('Brand name and logo required');
  }

  const slug = slugify(name);
  const ext = file.name.split('.').pop();
  const filePath = `${slug}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('brands')
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const logoUrl = `/storage/v1/object/public/brands/${filePath}`;

  const { error } = await supabase.from('brands').insert({
    name,
    slug,
    logo_url: logoUrl,
  });

  if (error) throw error;
}

/* ---------- UPDATE BRAND ---------- */
export async function updateBrand(formData: FormData) {
  const supabase = createServerSupabaseClient();

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const file = formData.get('logo') as File | null;

  if (!id || !name) {
    throw new Error('Invalid data');
  }

  const slug = slugify(name);
  let logoUrl: string | null = null;

  if (file && file.size > 0) {
    const ext = file.name.split('.').pop();
    const filePath = `${slug}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('brands')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    logoUrl = `/storage/v1/object/public/brands/${filePath}`;
  }

  const updateData: any = { name, slug };
  if (logoUrl) updateData.logo_url = logoUrl;

  const { error } = await supabase
    .from('brands')
    .update(updateData)
    .eq('id', id);

  if (error) throw error;
}

/* ---------- DELETE BRAND (SOFT) ---------- */
export async function deleteBrand(formData: FormData) {
  const supabase = createServerSupabaseClient();

  const id = formData.get('id') as string;
  if (!id) return;

  const { error } = await supabase
    .from('brands')
    .update({ is_active: false })
    .eq('id', id);

  if (error) throw error;
}