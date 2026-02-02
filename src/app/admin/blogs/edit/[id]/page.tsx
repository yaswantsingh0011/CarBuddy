"use client";

import { useEffect, useState } from "react";
// ✅ FIXED: Correct Import
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft, FaCloudUploadAlt, FaSave, FaTrash } from "react-icons/fa";
import Image from "next/image";

export default function EditBlogPage() {
  // ❌ Removed: const supabase = createClient();
  
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Guides",
    excerpt: "",
    content: "",
    author: "Admin",
    image_url: "",
    published_date: "" 
  });

  useEffect(() => {
    const fetchBlogData = async () => {
      const { data } = await supabase.from("blogs").select("*").eq("id", blogId).single();
      if (data) {
        setFormData({
          title: data.title || "",
          category: data.category || "Guides",
          excerpt: data.excerpt || "",
          content: data.content || "",
          author: data.author || "Admin",
          image_url: data.image_url || "",
          published_date: data.published_date || ""
        });
        if (data.image_url) setPreview(data.image_url);
      }
      setLoading(false);
    };
    fetchBlogData();
  }, [blogId]);

  // ✅ Missing function wapas add kar diya
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let finalImageUrl = formData.image_url;
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;
        const { error: uploadError } = await supabase.storage.from("blog_images").upload(fileName, imageFile);
        
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from("blog_images").getPublicUrl(fileName);
        finalImageUrl = data.publicUrl;
      }

      const { error } = await supabase.from("blogs").update({
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        image_url: finalImageUrl,
        published_date: formData.published_date,
      }).eq("id", blogId);

      if (error) throw error;
      alert("Blog Updated Successfully! 🚀");
      router.push("/admin/blogs");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-10 text-center font-bold">Loading Blog Data...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl my-10 border text-gray-800 font-sans">
      <div className="flex items-center gap-4 mb-8 border-b pb-4">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-black transition-colors"><FaArrowLeft size={20} /></button>
        <h1 className="text-2xl font-bold">Edit Blog Post</h1>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500 font-sans tracking-wider">Blog Title</label>
          <input className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-black font-medium" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
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
          <div><label className="block text-sm font-bold mb-2 uppercase text-gray-500">Author</label>
            <input className="w-full p-3 border rounded-lg" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
          </div>
          <div><label className="block text-sm font-bold mb-2 uppercase text-gray-500">Publish Date</label>
            <input type="date" className="w-full p-3 border rounded-lg" value={formData.published_date} onChange={(e) => setFormData({...formData, published_date: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Short Excerpt (Summary)</label>
          <textarea 
            rows={2} 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            value={formData.excerpt} 
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Cover Image</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4">
            {preview ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden group">
                <Image src={preview} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all">
                  <label className="bg-white text-black px-4 py-2 rounded-lg font-bold cursor-pointer text-sm">
                    Change Image
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                  <button type="button" onClick={() => {setImageFile(null); setPreview(""); setFormData({...formData, image_url: ""})}} className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition"><FaTrash /></button>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center py-10">
                <FaCloudUploadAlt size={40} className="text-gray-300 mb-2" />
                <span className="text-gray-500 font-medium">Upload new cover image</span>
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase text-gray-500">Blog Content</label>
          <textarea rows={12} className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-black leading-relaxed" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required />
        </div>

        <button type="submit" disabled={updating} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 transition disabled:bg-gray-400">
          {updating ? "Saving Changes..." : "Save Blog Changes"}
        </button>
      </form>
    </div>
  );
}