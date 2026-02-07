"use client";
import React, { useState } from "react";
import Image from "next/image";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

interface ImageWithFallbackProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackSrc?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function ImageWithFallback({
  src,
  alt,
  className,
  style,
  fallbackSrc = ERROR_IMG_SRC,
  priority,
  sizes,
  objectFit = "cover",
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <div className={`relative ${className ?? ""}`} style={style}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={
          objectFit === "cover" ? "object-cover" : `object-${objectFit}`
        }
        priority={priority}
        sizes={sizes}
        onError={() => setImgSrc(fallbackSrc)}
        unoptimized={imgSrc.startsWith("data:")}
      />
    </div>
  );
}
