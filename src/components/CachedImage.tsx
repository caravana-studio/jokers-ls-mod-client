import React, { useEffect, useState, forwardRef } from "react";
import { getImageFromCache } from "../utils/preloadImages";
import { Image, ImageProps } from "@chakra-ui/react";

interface CachedImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

const CachedImage = forwardRef<HTMLImageElement, CachedImageProps>(
  ({ src, alt, ...props }, ref) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
      const loadImage = async () => {
        const cachedImage = await getImageFromCache(src);

        if (cachedImage) {
          setImageSrc(URL.createObjectURL(cachedImage));
        } else {
          setImageSrc(src);
        }
      };

      loadImage();

      return () => {
        if (imageSrc && imageSrc.startsWith("blob:")) {
          URL.revokeObjectURL(imageSrc);
        }
      };
    }, [src]);

    if (!imageSrc) {
      return null;
    }

    return <Image ref={ref} src={imageSrc} alt={alt} {...props} />;
  }
);

export default CachedImage;
