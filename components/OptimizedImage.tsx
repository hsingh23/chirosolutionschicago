import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useMemo } from 'react';

interface OptimizedImageProps extends Omit<NextImageProps, 'loading'> {
  priority?: boolean;
}

export function OptimizedImage({ 
  priority = false, 
  className = '', 
  quality = 75,
  ...props 
}: OptimizedImageProps) {
  // Calculate sizes based on viewport
  const sizes = useMemo(() => {
    if (props.sizes) return props.sizes;
    if (props.fill) return '100vw';
    if (props.width && typeof props.width === 'number') {
      return `(max-width: ${props.width}px) 100vw, ${props.width}px`;
    }
    return '100vw';
  }, [props.sizes, props.fill, props.width]);

  return (
    <NextImage
      className={className}
      quality={quality}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes}
      {...props}
    />
  );
}