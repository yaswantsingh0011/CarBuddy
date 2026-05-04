"use client";

import { useState } from "react";
import Image from "next/image";

export default function MarketplaceGallery({ images, model }: { images: string[]; model: string }) {
  const [activeImg, setActiveImg] = useState(0);

  if (!images.length) return (
    <div className="aspect-[16/10] rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-400">
      No Images
    </div>
  );

  return (
    <div className="space-y-4">
      {/* ✅ Main Image */}
      <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-slate-100 shadow-xl">
        <Image
          src={images[activeImg]}
          alt={model}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/20 backdrop-blur-md p-2 rounded-full">
            {images.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-3 h-3 rounded-full transition-all ${activeImg === i ? 'bg-white scale-125' : 'bg-white/40'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img: string, i: number) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className={`relative aspect-square rounded-2xl overflow-hidden border-4 transition-all ${activeImg === i ? 'border-blue-600' : 'border-transparent opacity-60'}`}
          >
            <Image
              src={img}
              alt={`${model} view ${i + 1}`}
              fill
              className="object-cover"
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}