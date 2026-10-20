export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://m2firmabudowlana.vercel.app').replace(/\/$/, '');

export const company = {
  name: 'M2 Maksymyk Group',
  legalName: 'M2 Maksymyk Group – Firma Budowlana',
  owner: 'Volodymyr Maksymyk',
  phone: '+48793514201',
  phoneDisplay: '793 514 201',
  email: 'maximikremont@gmail.com',
  nip: '7822929062',
  address: {
    street: 'ul. Katowicka 45/26',
    postalCode: '61-131',
    city: 'Poznań',
    region: 'Wielkopolskie',
    country: 'PL',
  },
};

export const social = {
  tiktokHandle: '@m2_volodymyrmaksymyk',
  tiktok: 'https://www.tiktok.com/@m2_volodymyrmaksymyk',
  facebook: 'https://www.facebook.com/profile.php?id=100090294094439',
  fixly: 'https://fixly.pl/profil/vjau29kv',
  whatsapp: 'https://wa.me/48793514201',
  viber: 'viber://chat?number=%2B48793514201',
  tiktokFollowers: '3 300+',
  tiktokLikes: '52K+',
};

export const areas = [
  'Poznań',
  'Swarzędz',
  'Luboń',
  'Śrem',
  'Września',
  'Kościan',
  'Środa Wielkopolska',
  'Szamotuły',
  'Oborniki',
  'Grodzisk Wielkopolski',
];

/** TikTok videos shown in the portfolio. `key` maps to messages: portfolio.items.<key> */
export const portfolio = [
  { id: '7698802123777084705', key: 'commercial' },
  { id: '7698017911071460641', key: 'decorative' },
  { id: '7698750106337545504', key: 'demolition' },
  { id: '7698780079068908833', key: 'painting' },
  { id: '7698452015252344096', key: 'tenement' },
  { id: '7698766323895061792', key: 'walls' },
  { id: '7698396729581767968', key: 'electrical' },
  { id: '7698421274275630369', key: 'team' },
  { id: '7698223437503892769', key: 'office' },
] as const;

export const tiktokVideoUrl = (id: string) => `${social.tiktok}/video/${id}`;

/** Anchor sections shown in the header/footer navigation (keys of messages.nav). */
export const NAV = ['services', 'process', 'portfolio', 'why', 'faq', 'contact'] as const;
