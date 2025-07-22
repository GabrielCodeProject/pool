import Image from "next/image";
import { getBusinessName, getServiceArea } from "@/lib/business-data";

interface ImageSeoProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  loading?: "lazy" | "eager";
  context?: "business" | "service" | "promotion" | "general";
  serviceName?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

export function ImageSeo({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  quality = 85,
  loading = "lazy",
  context = "general",
  serviceName,
  fill = false,
  style,
  onLoad,
  onError,
  ...props
}: ImageSeoProps) {
  const businessName = getBusinessName();
  const serviceArea = getServiceArea();

  // Generate SEO-optimized alt text if not provided
  const generateAltText = (): string => {
    if (alt) return alt;

    switch (context) {
      case "business":
        return `${businessName} - Professional Pool Maintenance Services in ${serviceArea}`;
      case "service":
        return serviceName
          ? `${serviceName} - ${businessName} Pool Services in ${serviceArea}`
          : `Pool maintenance service by ${businessName} in ${serviceArea}`;
      case "promotion":
        return `Special promotion - ${businessName} Pool Services in ${serviceArea}`;
      default:
        return `${businessName} - Pool Maintenance Services`;
    }
  };

  // Generate appropriate sizes attribute for responsive images
  const generateSizes = (): string => {
    if (sizes) return sizes;

    // Default responsive sizes for different contexts
    switch (context) {
      case "business":
        return "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw";
      case "promotion":
        return "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";
      default:
        return "(max-width: 640px) 100vw, 50vw";
    }
  };

  const optimizedAlt = generateAltText();
  const optimizedSizes = generateSizes();

  if (fill) {
    return (
      <Image
        src={src}
        alt={optimizedAlt}
        fill
        className={className}
        priority={priority}
        sizes={optimizedSizes}
        quality={quality}
        loading={loading}
        style={style}
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={optimizedAlt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={optimizedSizes}
      quality={quality}
      loading={loading}
      style={style}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  );
}

// Specific variants for common use cases
export function BusinessLogoImage({
  src,
  alt,
  className = "py-3 w-32 h-auto sm:w-48",
  priority = true,
  ...props
}: Omit<ImageSeoProps, "context">) {
  return (
    <ImageSeo
      src={src}
      alt={alt}
      context="business"
      className={className}
      priority={priority}
      {...props}
    />
  );
}

export function ServiceImage({
  src,
  alt,
  serviceName,
  className = "rounded-lg w-full max-w-xs sm:max-w-md object-cover mb-4",
  ...props
}: Omit<ImageSeoProps, "context">) {
  return (
    <ImageSeo
      src={src}
      alt={alt}
      context="service"
      serviceName={serviceName}
      className={className}
      {...props}
    />
  );
}

export function PromotionImage({
  src,
  alt,
  className = "rounded-lg w-full max-w-xs sm:max-w-md object-cover mb-4",
  ...props
}: Omit<ImageSeoProps, "context">) {
  return (
    <ImageSeo
      src={src}
      alt={alt}
      context="promotion"
      className={className}
      {...props}
    />
  );
}