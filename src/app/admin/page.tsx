import Link from 'next/link';
import {
  FaCar,
  FaUserFriends,
  FaEnvelope,
  FaStar,
  FaPlus,
  FaTags,
  FaNewspaper,
  FaMapMarkerAlt,
  FaImages, // ✅ NEW ICON
} from 'react-icons/fa';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-2">

      {/* ================= Header ================= */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Welcome Back, Admin
        </h1>
        <p className="text-gray-500 text-lg">
          Here’s what’s happening on your platform today.
        </p>
      </div>

      {/* ================= KPI STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<FaCar />} label="Total Cars" value="1,248" />
        <StatCard icon={<FaUserFriends />} label="Daily Visits" value="8,420" />
        <StatCard icon={<FaEnvelope />} label="New Leads" value="37" />
        <StatCard icon={<FaStar />} label="Avg Rating" value="4.3" />
      </div>

      {/* ================= Quick Actions ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <QuickAction icon={<FaPlus />} label="Add New Car" href="/admin/cars/add" />
          <QuickAction icon={<FaTags />} label="Update Prices" href="/admin/cars" />
          <QuickAction icon={<FaNewspaper />} label="Publish News" href="/admin/news/add" />
          <QuickAction icon={<FaPlus />} label="New Blog" href="/admin/blogs/add" />
          <QuickAction icon={<FaMapMarkerAlt />} label="Add Dealer" href="/admin/dealers/add" />

          {/* ✅ NEW: VISUAL STORIES */}
          <QuickAction
            icon={<FaImages />}
            label="Visual Stories"
            href="/admin/visual-stories"
          />
        </div>
      </div>

    </div>
  );
}

/* ================= Helper Components ================= */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className="p-3 rounded-lg bg-gray-100 text-gray-700 text-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-semibold">{label}</p>
        <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-2 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-gray-300 transition text-center"
    >
      <div className="text-lg text-gray-700">{icon}</div>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </Link>
  );
}
