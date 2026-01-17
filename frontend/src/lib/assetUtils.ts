/**
 * Utility functions for handling asset paths in GitHub Pages deployment
 * Ensures proper resolution of static assets with base path support
 */

/**
 * Get the correct asset path for GitHub Pages deployment
 * Handles both local development and production builds with custom base paths
 * @param path - Relative path to the asset (e.g., 'assets/logo.png')
 * @returns Full path with base URL prefix
 */
export function getAssetPath(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Combine base and path, then normalize multiple slashes
  return `${base}${cleanPath}`.replace(/\/+/g, '/');
}

/**
 * Preload critical images for faster initial rendering
 * Use this for above-the-fold images that should load immediately
 * @param imagePath - Path to the image to preload
 */
export function preloadImage(imagePath: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = getAssetPath(imagePath);
  document.head.appendChild(link);
}

/**
 * Create a responsive image srcset for different screen sizes
 * @param basePath - Base path to the image
 * @param sizes - Array of size suffixes (e.g., ['sm', 'md', 'lg'])
 * @returns srcset string for responsive images
 */
export function createResponsiveSrcSet(basePath: string, sizes: string[]): string {
  return sizes
    .map((size, index) => {
      const multiplier = index + 1;
      return `${getAssetPath(basePath.replace(/(\.[^.]+)$/, `-${size}$1`))} ${multiplier}x`;
    })
    .join(', ');
}
