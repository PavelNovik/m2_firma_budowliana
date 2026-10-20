import type { MetadataRoute } from 'next';
import { company } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.legalName,
    short_name: 'M2 Maksymyk',
    description: 'Remonty i wykończenia wnętrz – Poznań',
    start_url: '/pl',
    display: 'standalone',
    background_color: '#121214',
    theme_color: '#1d1d1f',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
