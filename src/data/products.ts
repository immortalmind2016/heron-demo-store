export type Product = {
  id: string;
  name: string;
  blurb: string;
  price: number; // in USD
  image: string;
  tone: string; // fallback gradient tone
};

// Product imagery is keyword-matched stock (loremflickr), pinned with a `lock`
// seed so each product always gets the same photo. If an image ever fails to
// load, the card falls back to the monoline illustration over the `tone`
// gradient, so the store still looks intentional on camera.
const photo = (keywords: string, lock: number) =>
  `https://loremflickr.com/800/600/${keywords}/all?lock=${lock}`;

export const products: Product[] = [
  {
    id: 'pour-over',
    name: 'Ceramic Pour-Over',
    blurb: 'Matte stoneware, single-cup brew.',
    price: 48,
    image: photo('pourover,coffee', 2),
    tone: 'linear-gradient(135deg,#3b4656,#20272f)',
  },
  {
    id: 'merino-throw',
    name: 'Merino Throw',
    blurb: 'Lofty, lightweight, quietly warm.',
    price: 120,
    image: photo('blanket,wool', 5),
    tone: 'linear-gradient(135deg,#4a5364,#2a313b)',
  },
  {
    id: 'desk-tray',
    name: 'Walnut Desk Tray',
    blurb: 'Solid walnut, oiled by hand.',
    price: 65,
    image: photo('desk,organizer', 3),
    tone: 'linear-gradient(135deg,#5b4a3a,#2e2620)',
  },
  {
    id: 'linen-apron',
    name: 'Linen Apron',
    blurb: 'Stonewashed flax, cross-back straps.',
    price: 38,
    image: photo('apron,linen', 4),
    tone: 'linear-gradient(135deg,#46525f,#262d34)',
  },
  {
    id: 'cast-kettle',
    name: 'Cast Iron Kettle',
    blurb: 'Enamel-lined, 1.2 litre.',
    price: 95,
    image: photo('kettle,kitchen', 5),
    tone: 'linear-gradient(135deg,#39424e,#1e242b)',
  },
  {
    id: 'wool-slippers',
    name: 'Wool Slippers',
    blurb: 'Boiled wool, suede sole.',
    price: 54,
    image: photo('slippers,wool', 6),
    tone: 'linear-gradient(135deg,#4c4740,#272420)',
  },
];

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatUsd(cents: number): string {
  return cents.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
