"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCloudUploadAlt, FaSave, FaTrash } from "react-icons/fa";
import Image from "next/image";

export default function AddNewsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Car Update",
    excerpt: "",
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
          .from("blog_images") // Reuse blog_images bucket or create news_images
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("blog_images").getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const slug = formData.title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");

      const { error } = await supabase.from("news").insert({
        title: formData.title,
        slug: slug,
        excerpt: formData.excerpt,
        category: formData.category,
        content: formData.content,
        author: formData.author,
        image_url: imageUrl || null,
        published_date: formData.published_date,
      });

      if (error) throw error;
      alert("News Published! 🚀");
      router.push("/admin/news");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl my-10 border text-gray-800">
      <div className="flex items-center gap-4 mb-8 border-b pb-4">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-black transition-colors"><FaArrowLeft size={20} /></button>
        <h1 className="text-2xl font-bold font-sans">Post New Automotive News</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500">News Title</label>
          <input className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-medium" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Category</label>
            <select className="w-full p-3 border rounded-lg bg-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="Car Update">Car Update</option>
              <option value="Future Launch">Future Launch</option>
              <option value="Car Launch">Car Launch</option>
              <option value="Expert Review">Expert Review</option>
              <option value="Policy Update">Policy Update</option>
              <option value="Spy Shot">Spy Shot</option>
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

        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Short Excerpt (Summary)</label>
          <textarea rows={2} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500">News Image</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 transition-all hover:border-orange-300">
            {preview ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden group">
                <Image src={preview} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <label className="bg-white text-black px-4 py-2 rounded-lg font-bold cursor-pointer text-sm">Change Image<input type="file" className="hidden" onChange={handleImageChange} accept="image/*" /></label>
                  <button type="button" onClick={() => {setImageFile(null); setPreview("");}} className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"><FaTrash /></button>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center py-10"><FaCloudUploadAlt size={40} className="text-gray-300 mb-2" /><span className="text-gray-500 font-medium">Upload News Cover Image</span><input type="file" className="hidden" onChange={handleImageChange} accept="image/*" /></label>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500">News Detailed Content</label>
          <textarea rows={10} className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none leading-relaxed" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition flex justify-center items-center gap-2 shadow-lg disabled:bg-gray-400">
          {loading ? "Publishing News..." : <><FaSave /> Publish News</>}
        </button>
      </form>
    </div>
  );
}