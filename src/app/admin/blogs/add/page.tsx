"use client";

import { useState } from "react";
// ✅ FIXED: Correct Import
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCloudUploadAlt, FaSave, FaTrash } from "react-icons/fa";
import Image from "next/image";

export default function AddBlogPage() {
  // ❌ Removed: const supabase = createClient();
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Guides",
    excerpt: "", // ✅ New Field
    content: "",
    author: "Admin",
    published_date: new Date().toISOString().split('T')[0],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert("Bhai, Title aur Content zaroori hai!");

    setLoading(true);
    let imageUrl = "";

    try {
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;
        const { error: uploadError } = await supabase.storage
          .from("blog_images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("blog_images").getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const slug = formData.title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");

      const { error } = await supabase.from("blogs").insert({
        title: formData.title,
        slug: slug,
        category: formData.category,
        excerpt: formData.excerpt, // ✅ Saving Excerpt
        content: formData.content,
        author: formData.author,
        image_url: imageUrl || null,
        published_date: formData.published_date,
      });

      if (error) throw error;
      alert("Blog Publish ho gaya! 🚀");
      router.push("/admin/blogs");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl my-10 border text-gray-800 font-sans">
      <div className="flex items-center gap-4 mb-8 border-b pb-4">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-black transition-colors">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Write New Blog Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Blog Title</label>
          <input 
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-black outline-none font-medium text-lg" 
            placeholder="Enter a catchy title..." 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Category</label>
            <select className="w-full p-3 border rounded-lg bg-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="Guides">Guides</option>
              <option value="Safety">Safety</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Reviews">Reviews</option>
              <option value="Expert Review">Expert Review</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Author</label>
            <input className="w-full p-3 border rounded-lg" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Publish Date</label>
            <input type="date" className="w-full p-3 border rounded-lg" value={formData.published_date} onChange={(e) => setFormData({...formData, published_date: e.target.value})} />
          </div>
        </div>

        {/* ✅ Short Excerpt Field Added */}
        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Short Excerpt (Summary)</label>
          <textarea 
            rows={2} 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Blog ki ek choti summary yahan likho..."
            value={formData.excerpt} 
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Cover Image</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 transition-all hover:border-gray-400">
            {preview ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden group">
                <Image src={preview} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <label className="bg-white text-black px-4 py-2 rounded-lg font-bold cursor-pointer text-sm">Change Image<input type="file" className="hidden" onChange={handleImageChange} accept="image/*" /></label>
                  <button type="button" onClick={() => {setImageFile(null); setPreview("");}} className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"><FaTrash /></button>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center py-10">
                <FaCloudUploadAlt size={40} className="text-gray-300 mb-2" />
                <span className="text-gray-500 font-medium">Click to upload cover image</span>
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Article Content</label>
          <textarea 
            rows={12} 
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-black outline-none leading-relaxed" 
            placeholder="Write your blog content here..."
            value={formData.content} 
            onChange={(e) => setFormData({...formData, content: e.target.value})} 
            required
          />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition flex justify-center items-center gap-2 shadow-lg disabled:bg-gray-400">
          {loading ? "Publishing..." : <><FaSave /> Publish Article</>}
        </button>
      </form>
    </div>
  );
}