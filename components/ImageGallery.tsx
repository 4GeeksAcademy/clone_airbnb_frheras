"use client";

import Image from "next/image";
import { useState } from "react";

type ImageGalleryProps = {
  images: string[];
  alt: string;
};

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-gray-100 md:aspect-video">
      <Image
        src={images[index]}
        alt={`${alt} (foto ${index + 1})`}
        fill
        priority
        sizes="(min-width: 768px) 66vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
        <button
          type="button"
          aria-label="Foto anterior"
          onClick={() => setIndex((current) => Math.max(current - 1, 0))}
          disabled={index === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow disabled:opacity-40"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Foto siguiente"
          onClick={() => setIndex((current) => Math.min(current + 1, total - 1))}
          disabled={index === total - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow disabled:opacity-40"
        >
          ›
        </button>
      </div>
      <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
        {index + 1} / {total}
      </span>
    </div>
  );
}
