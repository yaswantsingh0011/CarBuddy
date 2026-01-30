     import { addBrand } from '@/actions/brands';

export default function AddBrandPage() {
  return (
    <div className="max-w-xl mx-auto px-2">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">
        Add New Brand
      </h1>

      <form
        action={addBrand}
        className="bg-white p-6 rounded-xl border space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Brand Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Brand Logo
          </label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            required
            className="w-full border rounded-lg px-3 py-2 bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-2 rounded-lg font-semibold"
        >
          Add Brand
        </button>
      </form>
    </div>
  );
}
