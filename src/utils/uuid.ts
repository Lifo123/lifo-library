'use client'

export default function uuid (length: number = 6, prefix?: string): string {
  const buffer = new Uint8Array(Math.ceil(length / 2));
  crypto.getRandomValues(buffer);

  const id = Array.from(buffer, byte => {
    return byte.toString(16).padStart(2, '0');
  }).join('');

  if(prefix) return `${prefix}«${id}»`;

  return id.slice(0, length);
}

