'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function AddVisualStoryPage() {
  const router = useRouter();

  // STORY STATE
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [position, setPosition] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // SLIDES STATE
  const [tempSlides, setTempSlides] = useState<any[]>([]);
  const [slideFile, setSlideFile] = useState<File | null>(null);
  const [slideText, setSlideText] = useState('');

  // 1. Auto-generate Slug from Title
  useEffect(() => {
    setSlug(title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''));
  }, [title]);

  // 2. Cover Preview Logic
  useEffect(() => {
    if (!imageFile) { setCoverPreview(null); return; }
    const objectUrl = URL.createObjectURL(imageFile);
    setCoverPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  // 3. Move Slide Up/Down Logic
  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...tempSlides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSlides.length) return;
    [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
    setTempSlides(newSlides);
  };

  function handleAddSlideToLocal() {
    if (!slideFile || !slideText) return alert('Bhai, image aur text dono daalo!');
    const newSlide = {
      id: Date.now().toString(),
      file: slideFile,
      text: slideText,
      previewUrl: URL.createObjectURL(slideFile)
    };
    setTempSlides([...tempSlides, newSlide]);
    setSlideFile(null);
    setSlideText('');
  }

  async function handleSubmit() {
    if (!title || !imageFile || tempSlides.length === 0) return alert('Title, Cover Image aur Slides missing hain!');
    setLoading(true);

    try {
      // Step 1: Upload Cover
      const coverExt = imageFile.name.split('.').pop();
      const coverFileName = `story-${Date.now()}.${coverExt}`;
      const { error: coverErr } = await supabase.storage.from('visual-stories').upload(coverFileName, imageFile);
      if (coverErr) throw coverErr;
      const { data: coverData } = supabase.storage.from('visual-stories').getPublicUrl(coverFileName);

      // Step 2: Insert Story
      const { data: story, error: storyErr } = await supabase.from('visual_stories').insert({
        title,
        slug,
        cover_image: coverData.publicUrl,
        is_active: isActive,
        position: position,
      }).select().single();
      if (storyErr) throw storyErr;

      // Step 3: Upload Slides (In the order they appear in list)
      for (let i = 0; i < tempSlides.length; i++) {
        const s = tempSlides[i];
        const sExt = s.file.name.split('.').pop();
        const sFileName = `slide-${story.id}-${Date.now()}-${i}.${sExt}`;
        await supabase.storage.from('visual-stories').upload(sFileName, s.file);
        const { data: sData } = supabase.storage.from('visual-stories').getPublicUrl(sFileName);
        
        await supabase.from('visual_story_slides').insert({
          story_id: story.id,
          image_url: sData.publicUrl,
          text: s.text,
          position: i + 1, // Fresh position based on new order
        });
      }

      alert('Mubarak ho! Story live ho gayi.');
      router.push('/admin/visual-stories');
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Add New Story</h1>
          <p className="text-slate-500 text-sm">Create visual-first content with multiple slides</p>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${loading ? 'bg-slate-300' : 'bg-black text-white hover:scale-105 active:scale-95 shadow-black/20'}`}
        >
          {loading ? 'Processing...' : 'Publish Story'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Main Config */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">⚙️ Basic Settings</h3>
            <div className="space-y-4">
              <input className="w-full border-slate-200 border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="Story Title" value={title} onChange={e => setTitle(e.target.value)} />
              <div className="bg-slate-50 p-2 rounded text-xs text-slate-500 font-mono">Slug: {slug || 'your-story-url'}</div>
              <input type="number" className="w-full border-slate-200 border p-3 rounded-lg" placeholder="Position" value={position} onChange={e => setPosition(Number(e.target.value))} />
              
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center">
                {coverPreview ? (
                  <div className="relative h-40 w-full rounded-lg overflow-hidden border">
                    <Image src={coverPreview} alt="Cover" fill className="object-cover" />
                    <button onClick={() => setImageFile(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs">✕</button>
                  </div>
                ) : (
                  <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="text-sm" />
                )}
                <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-widest">Cover Image</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Slides Manager */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">🎞️ Manage Slides</h3>
            
            <div className="space-y-3 mb-6">
              {tempSlides.map((slide, idx) => (
                <div key={slide.id} className="flex items-center gap-4 p-3 border rounded-xl bg-slate-50 group">
                  <span className="text-slate-400 font-bold w-4 text-xs">{idx + 1}</span>
                  <div className="relative w-16 h-12 rounded bg-white border shrink-0 overflow-hidden">
                    <Image src={slide.previewUrl} alt="" fill className="object-cover" />
                  </div>
                  <p className="text-sm flex-1 truncate font-medium">{slide.text}</p>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => moveSlide(idx, 'up')} className="p-1 hover:bg-white border rounded">↑</button>
                    <button onClick={() => moveSlide(idx, 'down')} className="p-1 hover:bg-white border rounded">↓</button>
                    <button onClick={() => setTempSlides(tempSlides.filter(s => s.id !== slide.id))} className="p-1 hover:bg-red-50 text-red-500 border rounded">✕</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50/50 p-4 rounded-xl border-2 border-blue-100 space-y-3">
              <input type="file" accept="image/*" onChange={e => setSlideFile(e.target.files?.[0] || null)} />
              <textarea className="w-full border-slate-200 border p-3 rounded-lg text-sm h-20" placeholder="Slide caption..." value={slideText} onChange={e => setSlideText(e.target.value)} />
              <button onClick={handleAddSlideToLocal} className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold text-sm">+ Add to List</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}