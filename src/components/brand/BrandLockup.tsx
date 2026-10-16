import Image from "next/image";
import { brand } from "@/config/brand";

export function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <Image
      className="althea-brand-mark"
      src={brand.assets.mark}
      alt=""
      width={size}
      height={size}
    />
  );
}

export default function BrandLockup({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span className={`althea-brand-lockup ${className}`}>
      <BrandMark />
      <span className="althea-brand-name">{brand.name}</span>
    </span>
  );
}
