// src/app/components/ImgSafe.tsx
"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type ImgSafeProps = {
  src?: string;
  alt: string;
  /** Wrapper boyutu (fill modunda burası belirler: h-56, aspect-*, w-full vs.) */
  className?: string;
  /** İçteki <Image> sınıfı (örn. object-cover) */
  imgClassName?: string;
  /** Piksel boyutu vermek isterseniz */
  width?: number;
  height?: number;
  /** fill'i özellikle zorlamak isterseniz */
  fill?: boolean;
  sizes?: ImageProps["sizes"];
  unoptimized?: boolean;
} & Omit<ImageProps, "src" | "alt" | "width" | "height" | "fill" | "sizes">;

export default function ImgSafe({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  fill,
  sizes = "100vw",
  unoptimized,
  ...rest
}: ImgSafeProps) {
  const [ok, setOk] = useState(true);

  // src yoksa veya hata aldıysa placeholder
  if (!src || !ok) {
    return (
      <div
        className={`relative overflow-hidden ${className ?? ""}`}
        style={{
          background:
            "repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0 10px, rgba(0,0,0,0.06) 10px 20px)",
        }}
        aria-label={alt}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 10% 0%, color-mix(in oklab, var(--accent) 15%, transparent), transparent)",
          }}
        />
      </div>
    );
  }

  const hasW = typeof width === "number";
  const hasH = typeof height === "number";

  if ((hasW && !hasH) || (!hasW && hasH)) {
    throw new Error(
      `ImgSafe: "${src}" için width/height ikisi birlikte verilmeli ya da hiç verilmemeli.`
    );
  }

  const hasExplicitSize = hasW && hasH;
  // width/height yoksa → fill zorunlu
  const useFill = hasExplicitSize ? Boolean(fill) : true;

  if (useFill) {
    return (
      <div className={`relative ${className ?? ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={imgClassName ?? "object-cover"}
          unoptimized={unoptimized}
          onError={() => setOk(false)}
          {...rest}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width!}
      height={height!}
      sizes={sizes}
      className={imgClassName ?? className}
      unoptimized={unoptimized}
      onError={() => setOk(false)}
      {...rest}
    />
  );
}

// (İsterseniz tipleri dışarı da açabilirsiniz)
export type { ImgSafeProps };
