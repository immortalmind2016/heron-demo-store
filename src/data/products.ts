export type Product = {
  id: string;
  name: string;
  blurb: string;
  price: number; // in USD
  image: string;
  tone: string; // fallback gradient tone
};

// Product imagery uses Unsplash. Each card has a gradient fallback (see `tone`)
// so the store still looks intentional if an image fails to load on camera.
export const products: Product[] = [
  {
    id: 'pour-over',
    name: 'Ceramic Pour-Over',
    blurb: 'Matte stoneware, single-cup brew.',
    price: 48,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    tone: 'linear-gradient(135deg,#3b4656,#20272f)',
  },
  {
    id: 'merino-throw',
    name: 'Merino Throw',
    blurb: 'Lofty, lightweight, quietly warm.',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?auto=format&fit=crop&w=800&q=80',
    tone: 'linear-gradient(135deg,#4a5364,#2a313b)',
  },
  {
    id: 'desk-tray',
    name: 'Walnut Desk Tray',
    blurb: 'Solid walnut, oiled by hand.',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    tone: 'linear-gradient(135deg,#5b4a3a,#2e2620)',
  },
  {
    id: 'linen-apron',
    name: 'Linen Apron',
    blurb: 'Stonewashed flax, cross-back straps.',
    price: 38,
    image:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    tone: 'linear-gradient(135deg,#46525f,#262d34)',
  },
  {
    id: 'cast-kettle',
    name: 'Cast Iron Kettle',
    blurb: 'Enamel-lined, 1.2 litre.',
    price: 95,
    image:
      'https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?auto=format&fit=crop&w=800&q=80',
    tone: 'linear-gradient(135deg,#39424e,#1e242b)',
  },
  {
    id: 'wool-slippers',
    name: 'Wool Slippers',
    blurb: 'Boiled wool, suede sole.',
    price: 54,
    image:
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    tone: 'linear-gradient(135deg,#4c4740,#272420)',
  },
];

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatUsd(cents: number): string {
  return cents.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
