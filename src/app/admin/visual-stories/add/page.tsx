'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function AddVisualStoryPage() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !imageFile) {
      alert('Title aur image required hai');
      return;
    }

    setLoading(true);

    // 1️⃣ Upload image
    const ext = imageFile.name.split('.').pop();
    const fileName = `story-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('visual-stories')
      .upload(fileName, imageFile);

    if (uploadError) {
      alert('Image upload failed');
      setLoading(false);
      return;
    }

    // 2️⃣ Get public URL
    const { data } = supabase.storage
      .from('visual-stories')
      .getPublicUrl(fileName);

    // 3️⃣ Insert DB
    await supabase.from('visual_stories').insert({
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      cover_image: data.publicUrl,
      status: isActive ? 'active' : 'inactive',
    });

    router.push('/admin/visual-stories');
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Visual Story</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 space-y-5"
      >
        <input
          type="text"
          placeholder="Story Title"
          className="w-full border rounded px-4 py-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full border rounded px-4 py-3"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900"
        >
          {loading ? 'Uploading...' : 'Create Story'}
        </button>
      </form>
    </div>
  );
}
