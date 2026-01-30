'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

export default function EditVisualStoryPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [loading, setLoading] = useState(true);

  // STORY
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState(0);
  const [coverImage, setCoverImage] = useState('');
  const [newCoverFile, setNewCoverFile] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);

  // SLIDES
  const [slides, setSlides] = useState<any[]>([]);
  const [slideFile, setSlideFile] = useState<File | null>(null);
  const [slideText, setSlideText] = useState('');

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!id) return;
    fetchStory();
  }, [id]);

  async function fetchStory() {
    const { data, error } = await supabase
      .from('visual_stories')
      .select(`
        id,
        title,
        cover_image,
        is_active,
        position,
        visual_story_slides (
          id,
          image_url,
          text,
          position
        )
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      alert('Story not found');
      router.push('/admin/visual-stories');
      return;
    }

    setTitle(data.title);
    setCoverImage(data.cover_image);
    setIsActive(data.is_active);
    setPosition(data.position || 0);
    setSlides(data.visual_story_slides || []);
    setLoading(false);
  }

  /* ================= UPDATE STORY ================= */
  async function updateStory() {
    let finalCover = coverImage;

    if (newCoverFile) {
      const ext = newCoverFile.name.split('.').pop();
      const fileName = `story-${id}-${Date.now()}.${ext}`;

      const { error } = await supabase.storage
        .from('visual-stories')
        .upload(fileName, newCoverFile, { upsert: true });

      if (error) return alert('Cover upload failed');

      const { data } = supabase.storage
        .from('visual-stories')
        .getPublicUrl(fileName);

      finalCover = data.publicUrl;
    }

    await supabase
      .from('visual_stories')
      .update({
        title,
        cover_image: finalCover,
        is_active: isActive,
        position,
      })
      .eq('id', id);

    alert('Story updated');
    fetchStory();
  }

  /* ================= ADD SLIDE ================= */
  async function addSlide() {
    if (!slideFile) return alert('Slide image required');

    const ext = slideFile.name.split('.').pop();
    const fileName = `slide-${id}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from('visual-stories')
      .upload(fileName, slideFile);

    if (error) return alert('Slide upload failed');

    const { data } = supabase.storage
      .from('visual-stories')
      .getPublicUrl(fileName);

    await supabase.from('visual_story_slides').insert({
      story_id: id,
      image_url: data.publicUrl,
      text: slideText,
      position: slides.length + 1,
    });

    setSlideFile(null);
    setSlideText('');
    fetchStory();
  }

  async function deleteSlide(slideId: string) {
    if (!confirm('Delete slide?')) return;
    await supabase.from('visual_story_slides').delete().eq('id', slideId);
    fetchStory();
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Visual Story</h1>

      {/* STORY */}
      <div className="bg-white border rounded-xl p-6 mb-10 space-y-4">
        <input className="w-full border px-4 py-3 rounded" value={title} onChange={e => setTitle(e.target.value)} />

        <input
          type="number"
          className="w-full border px-4 py-3 rounded"
          placeholder="Position"
          value={position}
          onChange={e => setPosition(Number(e.target.value))}
        />

        {coverImage && (
          <div className="relative w-48 h-32 border rounded overflow-hidden">
            <Image src={coverImage} alt="cover" fill className="object-cover" />
          </div>
        )}

        <input type="file" accept="image/*" onChange={e => setNewCoverFile(e.target.files?.[0] || null)} />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
          Active
        </label>

        <button onClick={updateStory} className="bg-black text-white px-6 py-2 rounded-lg font-semibold">
          Save Story
        </button>
      </div>

      {/* SLIDES */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-bold text-lg mb-4">Slides</h2>

        {slides.map((slide, idx) => (
          <div key={slide.id} className="flex items-center justify-between border rounded p-3 mb-2">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-12 border rounded overflow-hidden">
                <Image src={slide.image_url} alt="" fill className="object-cover" />
              </div>
              <p className="text-sm font-medium">{idx + 1}. {slide.text}</p>
            </div>
            <button onClick={() => deleteSlide(slide.id)} className="text-red-600 text-sm">Delete</button>
          </div>
        ))}

        <div className="border-t pt-4 mt-4 space-y-3">
          <input type="file" accept="image/*" onChange={e => setSlideFile(e.target.files?.[0] || null)} />
          <textarea className="w-full border px-3 py-2 rounded" value={slideText} onChange={e => setSlideText(e.target.value)} />
          <button onClick={addSlide} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Slide</button>
        </div>
      </div>
    </div>
  );
}
