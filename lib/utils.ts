import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function optimizeImageUrl(url?: string | null): string {
  const DEFAULT_IMAGE_URL = 'https://drive.google.com/file/d/1lx-Vc726so_n5014MRd1Zu1iyh9zeXGc/view?usp=sharing';
  
  let targetUrl = url ? url.trim() : '';
  if (!targetUrl) {
    targetUrl = DEFAULT_IMAGE_URL;
  }
  
  // 1. Google Drive ID Extraction
  let fileId = '';
  const fileDMatch = targetUrl.match(/\/file\/d\/([a-zA-Z0-9\-_]+)/i);
  if (fileDMatch && fileDMatch[1]) {
    fileId = fileDMatch[1];
  } else {
    const idParamMatch = targetUrl.match(/[?&]id=([a-zA-Z0-9\-_]+)/i);
    if (idParamMatch && idParamMatch[1]) {
      fileId = idParamMatch[1];
    }
  }

  if (fileId && (targetUrl.includes('drive.google.com') || targetUrl.includes('docs.google.com'))) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  // 2. Google Photos / Phone sharing link redirection proxy
  const photosRegExp = /photos\.app\.goo\.gl|photos\.google\.com/i;
  if (photosRegExp.test(targetUrl)) {
    return `/api/image-proxy?url=${encodeURIComponent(targetUrl)}`;
  }
  
  return targetUrl;
}
