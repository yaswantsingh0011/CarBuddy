'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { FaEllipsisV, FaPlus } from 'react-icons/fa';

export default function VisualStoriesAdminPage() {
  const supabase = createClient();
  const [stories, setStories] = useState<any[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  async function fetchStories() {
    const { data } = await supabase
      .from('visual_stories')
      .select('*')
      .order('position', { ascending: true });

    setStories(data || []);
  }

  async function deleteStory(id: string) {
    const confirmDelete = confirm('Delete this story?');
    if (!confirmDelete) return;

    await supabase.from('visual_stories').delete().eq('id', id);
    fetchStories();
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* ===== Header ===== */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Visual Stories
        </h1>

        <Link
          href="/admin/visual-stories/add"
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-900"
        >
          <FaPlus /> Add Story
        </Link>
      </div>

      {/* ===== Stories List ===== */}
      <div className="space-y-3">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition"
          >
            {/* LEFT: Index + Image */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-bold w-6">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="relative w-16 h-12 rounded-lg overflow-hidden border">
                <Image
                  src={story.cover_image || '/placeholder.png'}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title + Status */}
              <div>
                <p className="font-bold text-gray-800 leading-snug">
                  {story.title}
                </p>
                <span className="text-xs text-green-600 font-semibold uppercase">
                  Active
                </span>
              </div>
            </div>

            {/* RIGHT: Actions */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === story.id ? null : story.id)
                }
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FaEllipsisV />
              </button>

              {openMenuId === story.id && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-20">
                  <Link
                    href={`/admin/visual-stories/edit/${story.id}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => deleteStory(story.id)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {stories.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            No visual stories added yet.
          </div>
        )}
      </div>
    </div>
  );
}
