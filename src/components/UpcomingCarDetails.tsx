import Image from "next/image";
import Link from "next/link";
import { FaBell } from "react-icons/fa";

interface UpcomingCarCardProps {
  slug: string;
  name: string;
  priceRange?: string | null;
  launchDate?: string | null;
  imageUrl?: string | null;
  onAlertClick?: () => void;
}

export default function UpcomingCarCard({
  slug,
  name,
  priceRange,
  launchDate,
  imageUrl,
  onAlertClick,
}: UpcomingCarCardProps) {
  const safeImage =
    imageUrl && imageUrl.trim() !== ""
      ? imageUrl
      : "/cars/placeholder.jpg";

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* IMAGE */}
      <Link
        href={`/car-details/${slug}`}
        className="relative h-48 w-full block bg-gray-100"
      >
        <Image
          src={safeImage}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
          priority={false}
        />

        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
          UPCOMING
        </span>
      </Link>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base truncate">
          {name}
        </h3>

        <p className="text-blue-600 font-bold mt-1">
          {priceRange && priceRange.trim() !== ""
            ? priceRange
            : "Price on Request"}
        </p>

        {launchDate && (
          <p className="text-xs text-gray-500 mt-1">
            Launch: {launchDate}
          </p>
        )}

        <button
          onClick={onAlertClick}
          className="mt-4 w-full flex items-center justify-center gap-2 border border-orange-500 text-orange-500 rounded-lg py-2 font-semibold hover:bg-orange-50 transition"
        >
          <FaBell size={14} />
          Notify Me
        </button>
      </div>
    </div>
  );
}
