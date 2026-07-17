export const DEFAULT_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#0f172a" />
      <rect x="60" y="60" width="680" height="480" rx="28" fill="#111827" stroke="#334155" stroke-width="4" />
      <path d="M260 410h280l-70-120-70 90-40-50-60 80Z" fill="#38bdf8" opacity="0.85" />
      <circle cx="290" cy="250" r="44" fill="#fde68a" />
      <text x="400" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" fill="#e2e8f0">
        Image unavailable
      </text>
    </svg>
  `);

export const getImageUrl = (image?: string | null) => {
  if (!image) return DEFAULT_IMAGE_PLACEHOLDER;

  const trimmed = image.trim();
  if (!trimmed) return DEFAULT_IMAGE_PLACEHOLDER;

  try {
    const url = new URL(trimmed);

    if (url.hostname.includes("drive.google.com")) {
      const fileId =
        url.searchParams.get("id") ||
        trimmed.match(/\/file\/d\/([^/]+)/)?.[1] ||
        trimmed.match(/id=([^&]+)/)?.[1];

      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }

    return trimmed;
  } catch {
    return trimmed;
  }
};
