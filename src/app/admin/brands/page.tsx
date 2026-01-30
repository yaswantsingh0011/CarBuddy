import Link from 'next/link';
import Image from 'next/image';
import { getActiveBrands } from '@/lib/brands';
import DeleteBrandButton from '@/components/admin/DeleteBrandButton';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default async function AdminBrandsPage() {
  const brands = await getActiveBrands();

  return (
    <div className="max-w-6xl mx-auto">

      {/* ===== Header ===== */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Car Brands
          </h1>
          <p className="text-gray-500">
            Manage brands (Add / Delete)
          </p>
        </div>

        <Link
          href="/admin/brands/add"
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-900"
        >
          <FaPlus /> Add Brand
        </Link>
      </div>

      {/* ===== Brands List ===== */}
      <div className="space-y-3">
        {brands.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            No brands added yet.
          </div>
        )}

        {brands.map((brand, index) => (
          <div
            key={brand.id}
            className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition"
          >
            {/* LEFT: Index + Logo + Name */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-bold w-6">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="relative w-14 h-14 rounded-lg overflow-hidden border bg-white">
                <Image
                  src={brand.logo_url || '/placeholder.png'}
                  alt={brand.name}
                  fill
                  className="object-contain p-1"
                />
              </div>

              <div>
                <p className="font-bold text-gray-800 leading-snug">
                  {brand.name}
                </p>
                <p className="text-xs text-gray-500">
                  {brand.slug}
                </p>
              </div>
            </div>

            {/* RIGHT: Delete Button */}
            <div className="flex items-center gap-2">
              <DeleteBrandButton id={brand.id}>
                <button className="flex items-center gap-2 text-sm text-red-600 font-semibold hover:bg-red-50 px-4 py-2 rounded-lg">
                  <FaTrash /> Delete
                </button>
              </DeleteBrandButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
