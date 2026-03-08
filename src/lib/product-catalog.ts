export type ProductCatalogItem = {
  id: string;
  name: string;
  description: string;
  subtitle: string;
  price: string;
  image: string;
  href: string;
  badge?: "Best Seller" | "New";
};

export const productCatalog: ProductCatalogItem[] = [
  {
    id: "hyalucera-moisturizer",
    name: "The Originote Hyalucera Moisturizer",
    description: "Hydrating Gel",
    subtitle: "Hydration Hero",
    price: "RM 28.00",
    image:
      "https://www.theoriginote.com/cdn/shop/files/1_d43436e0-176f-421d-87bf-3b6d070a3fb1.jpg?v=1702953545&width=600",
    href: "https://www.theoriginote.com/products/the-originote-hyalucera-moisturizer-gel",
    badge: "Best Seller",
  },
  {
    id: "hyalu-c-serum",
    name: "The Originote Hyalu-C Serum 3X Vitamin C + Hyaluronic Acid",
    description: "Brightening",
    subtitle: "Brightening Boost",
    price: "RM 45.00",
    image:
      "https://www.theoriginote.com/cdn/shop/files/id-11134207-7qul1-lhmwc3edkmhz27_c9f389a2-b405-448f-b822-3d1bf9816c53.jpg?v=1702953440&width=600",
    href: "https://www.theoriginote.com/products/hyalu-c-serum",
  },
  {
    id: "niaceramide-sunscreen-mist",
    name: "The Originote Niaceramide Sunscreen Mist SPF 50 PA++++",
    description: "Protection",
    subtitle: "UV Defense",
    price: "RM 25.00",
    image:
      "https://www.theoriginote.com/cdn/shop/files/id-11134207-7qukw-ljlhsq05sfaf10.jpg?v=1704696836&width=600",
    href: "https://www.theoriginote.com/products/the-originote-niaceramide-sunscreen-mist-spf-50-pa",
    badge: "New",
  },
  {
    id: "h-llow-clarifying-toner",
    name: "The Originote H-llow Clarifying Toner AHA + BHA + PHA",
    description: "Toner",
    subtitle: "Clarifying Reset",
    price: "RM 28.00",
    image:
      "https://www.theoriginote.com/cdn/shop/files/id-11134207-7qul4-lhmur52q3904ca_c26194c2-3698-4a37-a2d7-2070bd89ad91.jpg?v=1702953248&width=600",
    href: "https://www.theoriginote.com/products/the-originote-h-llow-clarifying-toner",
  },
  {
    id: "rose-b3-jelly-mask",
    name: "The Originote Rose B3 Brightening Jelly Mask",
    description: "Face Mask",
    subtitle: "Radiance Care",
    price: "RM 42.00",
    image:
      "https://www.theoriginote.com/cdn/shop/files/id-11134207-7qul2-lhmur52q4nkkac_45bf6935-367f-4013-ae5c-f8b3a0c18e38.jpg?v=1702953711&width=600",
    href: "https://www.theoriginote.com/products/the-originote-rose-b3-brightening-jelly-mask",
  },
  {
    id: "lip-oil-serum",
    name: "The Originote Lip Oil Serum Ceramide + Vitamin C",
    description: "Anti-Aging",
    subtitle: "Repair + Glow",
    price: "RM 48.00",
    image:
      "https://www.theoriginote.com/cdn/shop/files/id-11134207-7r98r-llakatk5ghbwc9.jpg?v=1704697875&width=600",
    href: "https://www.theoriginote.com/products/the-originote-lip-oil-serum-ceramide-vitamin-c-with-grapefruit-extract",
  },
];

const productMap = new Map(productCatalog.map((item) => [item.id, item]));

export function parseSelectedProductIds(
  itemsParam?: string | string[],
): string[] {
  const raw = Array.isArray(itemsParam) ? itemsParam.join(",") : itemsParam ?? "";

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getSelectedProducts(ids: string[]): ProductCatalogItem[] {
  const unique = Array.from(new Set(ids));
  return unique
    .map((id) => productMap.get(id))
    .filter((item): item is ProductCatalogItem => Boolean(item));
}
