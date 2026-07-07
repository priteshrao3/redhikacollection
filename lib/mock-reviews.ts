export interface Review {
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

const AUTHORS = [
  "Ananya R.", "Priya M.", "Kavita S.", "Meera J.", "Sonal T.",
  "Anjali D.", "Ritika P.", "Neelam V.", "Shreya K.", "Isha B.",
];

const TITLES = [
  "Absolutely loved it!", "Great quality for the price", "Fits perfectly",
  "Beautiful fabric", "Exactly as pictured", "Perfect for the occasion",
  "Would buy again", "Good but delivery was slow", "Stunning piece",
];

const BODIES = [
  "The fabric quality exceeded my expectations and the fit was true to size. Received so many compliments at the function.",
  "Color is exactly like the photos, embroidery work is neat. Packaging was also very good.",
  "Ordered for a wedding and it arrived on time. Would definitely recommend to friends.",
  "Slightly different shade in person but still beautiful. Comfortable to wear for long hours.",
  "Great value for money, the stitching quality is better than I expected at this price point.",
];

// Deterministic pseudo-random so the same product always shows the same reviews across renders.
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function getMockReviews(productId: string, count = 4): Review[] {
  const rand = mulberry32(seedFromId(productId));
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    const daysAgo = 5 + Math.floor(rand() * 120);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    reviews.push({
      author: AUTHORS[Math.floor(rand() * AUTHORS.length)],
      rating: 3 + Math.round(rand() * 2),
      date: date.toISOString().slice(0, 10),
      title: TITLES[Math.floor(rand() * TITLES.length)],
      body: BODIES[Math.floor(rand() * BODIES.length)],
    });
  }
  return reviews;
}
