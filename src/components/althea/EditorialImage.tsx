import type { CSSProperties } from "react";
import manifest from "@/data/imageManifest.json";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

/** Static responsive photography: no runtime image service or image JS. */
export default function EditorialImage({src, alt, sizes, fill, priority, className, style}: Props) {
  const photo = manifest[src as keyof typeof manifest];
  if (!photo) throw new Error(`Missing optimized photograph: ${src}`);
  const srcSet = (format: string) => [320,640,960,1440]
    .map(w => `/images/optimized/${photo.key}-${w}.${format} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/optimized/${photo.key}-640.webp`} srcSet={srcSet("webp")}
        sizes={sizes} width={photo.width} height={photo.height} alt={alt}
        loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"}
        decoding="async" className={className}
        style={{...(fill ? {position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"} as CSSProperties : {}),...style}} />
    </picture>
  );
}
