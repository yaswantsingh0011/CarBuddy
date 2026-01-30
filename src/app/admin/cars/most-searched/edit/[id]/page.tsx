"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  ArrowLeft,
  Save,
  Car,
  Wrench,
  Star,
  Image as ImageIcon,
  Upload,
  X,
  Loader2,
  Plus,
  ListTree,
} from "lucide-react";

export default function EditCarPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const [formData, setFormData] = useState<any>({
    name: "",
    brand: "",
    price: "",
    category: "SUV",
    fuelType: "",
    launchDate: "",
    images: ["", "", "", ""],
    specs: {
      engine: "",
      power: "",
      torque: "",
      transmission: "",
      mileage: "",
      bootSpace: "",
      groundClearance: "",
    },
    variants: [{ name: "", price: "", engine: "", transmission: "" }],
    features: "",
    pros: "",
    cons: "",
  });

  // ================= FETCH DATA =================
  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      const { data, error } = await supabase
        .from("most_searched_cars")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      setFormData({
        name: data.name || "",
        brand: data.brand || "",
        price: data.price || "",
        category: data.category || "SUV",
        fuelType: data.fuel_type || "",
        launchDate: data.created_at
          ? new Date(data.created_at).toISOString().split("T")[0]
          : "",
        images: data.images?.length ? data.images : ["", "", "", ""],
        specs: data.specs || {},
        variants: data.variants?.length
          ? data.variants
          : [{ name: "", price: "", engine: "", transmission: "" }],
        features: Array.isArray(data.features)
          ? data.features.join(", ")
          : "",
        pros: Array.isArray(data.pros) ? data.pros.join(", ") : "",
        cons: Array.isArray(data.cons) ? data.cons.join(", ") : "",
      });

      setLoading(false);
    };

    fetchCar();
  }, [id]);

  // ================= HANDLERS =================
  const handleInputChange = (e: any, section?: string, field?: string) => {
    const { name, value } = e.target;
    if (section && field) {
      setFormData((prev: any) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleVariantChange = (i: number, key: string, value: string) => {
    const v = [...formData.variants];
    v[i][key] = value;
    setFormData({ ...formData, variants: v });
  };

  const addVariant = () =>
    setFormData({
      ...formData,
      variants: [...formData.variants, { name: "", price: "", engine: "", transmission: "" }],
    });

  const removeVariant = (i: number) =>
    setFormData({
      ...formData,
      variants: formData.variants.filter((_: any, idx: number) => idx !== i),
    });

  const handleSubmit = async () => {
    setSaving(true);

    const payload = {
      name: formData.name,
      brand: formData.brand,
      price: formData.price,
      category: formData.category,
      fuel_type: formData.fuelType,
      images: formData.images.filter((i: string) => i),
      specs: formData.specs,
      variants: formData.variants,
      features: formData.features.split(",").map((i: string) => i.trim()),
      pros: formData.pros.split(",").map((i: string) => i.trim()),
      cons: formData.cons.split(",").map((i: string) => i.trim()),
      created_at: formData.launchDate,
    };

    const { error } = await supabase
      .from("most_searched_cars")
      .update(payload)
      .eq("id", id);

    if (error) alert(error.message);
    else {
      alert("Car Updated Successfully");
      router.push("/admin/cars/most-searched");
    }

    setSaving(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 font-bold">
        Loading...
      </div>
    );

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50 p-10 text-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500">
            <ArrowLeft size={18} /> Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
          >
            <Save size={18} /> {saving ? "Saving..." : "Save"}
          </button>
        </div>

        <h1 className="text-4xl font-black mb-8">Edit {formData.name}</h1>

        {/* TABS */}
        <div className="flex gap-3 bg-white p-2 rounded-2xl mb-8">
          {[
            { id: "basic", label: "Basic Info", icon: <Car size={16} /> },
            { id: "images", label: "Gallery", icon: <ImageIcon size={16} /> },
            { id: "variants", label: "Variants", icon: <ListTree size={16} /> },
            { id: "specs", label: "Technical", icon: <Wrench size={16} /> },
            { id: "extra", label: "Features", icon: <Star size={16} /> },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 ${
                activeTab === t.id ? "bg-black text-white" : "text-gray-400"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="bg-white p-10 rounded-3xl min-h-[400px]">

          {activeTab === "basic" && (
            <div className="grid grid-cols-2 gap-6">
              <Input label="Car Name" name="name" value={formData.name} onChange={handleInputChange} />
              <Input label="Brand" name="brand" value={formData.brand} onChange={handleInputChange} />
              <Input label="Price" name="price" value={formData.price} onChange={handleInputChange} />
              <Input label="Fuel Type" name="fuelType" value={formData.fuelType} onChange={handleInputChange} />
            </div>
          )}

          {activeTab === "images" && (
            <div className="grid grid-cols-2 gap-6">
              {formData.images.map((img: string, i: number) => (
                <div key={i} className="h-40 border rounded-xl flex items-center justify-center">
                  {img ? <img src={img} className="h-full object-cover rounded-xl" /> : "No Image"}
                </div>
              ))}
            </div>
          )}

          {activeTab === "variants" && (
            <div className="space-y-4">
              {formData.variants.map((v: any, i: number) => (
                <div key={i} className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                  <input value={v.name} onChange={(e) => handleVariantChange(i, "name", e.target.value)} placeholder="Variant" />
                  <input value={v.price} onChange={(e) => handleVariantChange(i, "price", e.target.value)} placeholder="Price" />
                </div>
              ))}
              <button onClick={addVariant} className="text-blue-600 font-bold">
                + Add Variant
              </button>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="grid grid-cols-2 gap-6">
              {Object.keys(formData.specs).map((k) => (
                <Input
                  key={k}
                  label={k}
                  value={formData.specs[k]}
                  onChange={(e: any) => handleInputChange(e, "specs", k)}
                />
              ))}
            </div>
          )}

          {activeTab === "extra" && (
            <div className="space-y-6">
              <Textarea label="Features" name="features" value={formData.features} onChange={handleInputChange} />
              <Textarea label="Pros" name="pros" value={formData.pros} onChange={handleInputChange} />
              <Textarea label="Cons" name="cons" value={formData.cons} onChange={handleInputChange} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ========= SMALL COMPONENTS ========= */

const Input = ({ label, ...props }: any) => (
  <div>
    <label className="text-xs font-bold text-gray-400">{label}</label>
    <input {...props} className="w-full p-4 rounded-xl bg-gray-50 font-bold" />
  </div>
);

const Textarea = ({ label, ...props }: any) => (
  <div>
    <label className="text-xs font-bold text-gray-400">{label}</label>
    <textarea {...props} rows={3} className="w-full p-4 rounded-xl bg-gray-50 font-bold" />
  </div>
);
