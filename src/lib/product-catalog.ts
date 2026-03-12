export type ProductBenefitIcon =
  | "droplets"
  | "sparkles"
  | "shield"
  | "leaf"
  | "sun"
  | "heart";

export type ProductBenefit = {
  icon: ProductBenefitIcon;
  title: string;
  description: string;
};

export type ProductCatalogItem = {
  id: string;
  name: string;
  description: string;
  subtitle: string;
  price: string;
  image: string;
  badge?: "Best Seller" | "New";
  category: string;
  volume: string;
  ingredients: string;
  overview: string;
  details: string[];
  howToUse: string[];
  goodFor: string[];
  benefits: ProductBenefit[];
  rating: string;
  reviewLabel: string;
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
    badge: "Best Seller",
    category: "Moisturizer",
    volume: "50 ml",
    ingredients: "Hyaluronic Acid, Ceramide, and Chlorella Extract",
    overview:
      "A light gel moisturizer that helps your skin feel calm, soft, and fresh without feeling heavy.",
    details: [
      "This gel texture absorbs fast and sits well under sunscreen or makeup.",
      "It helps lock in water so skin feels smooth through the day.",
      "The formula is easy to use in both morning and night routines.",
    ],
    howToUse: [
      "Apply after serum on clean face and neck.",
      "Use a small amount and spread gently until absorbed.",
      "In the morning, follow with sunscreen.",
    ],
    goodFor: ["Dry skin", "Normal skin", "Dehydrated skin"],
    benefits: [
      {
        icon: "droplets",
        title: "Daily hydration",
        description: "Helps skin stay soft and comfortable for hours.",
      },
      {
        icon: "shield",
        title: "Barrier support",
        description: "Supports the skin barrier so it feels less dry.",
      },
      {
        icon: "leaf",
        title: "Light finish",
        description: "Feels fresh on skin and does not feel greasy.",
      },
    ],
    rating: "4.8",
    reviewLabel: "1.2k reviews",
  },
  {
    id: "hyalu-c-serum",
    name: "The Originote Hyalu-C Serum 3X Vitamin C + Hyaluronic Acid",
    description: "Brightening",
    subtitle: "Brightening Boost",
    price: "RM 45.00",
    image:
      "https://www.theoriginote.com/cdn/shop/files/id-11134207-7qul1-lhmwc3edkmhz27_c9f389a2-b405-448f-b822-3d1bf9816c53.jpg?v=1702953440&width=600",
    category: "Serum",
    volume: "20 ml",
    ingredients: "3X Vitamin C, Hyaluronic Acid, and Grapefruit Extract",
    overview:
      "A brightening serum made to help dull skin look more fresh, even, and healthy over time.",
    details: [
      "The formula adds light moisture while working on uneven tone.",
      "It layers easily under moisturizer without feeling sticky.",
      "It is a simple option for people starting a brightening routine.",
    ],
    howToUse: [
      "Use after toner on clean and dry skin.",
      "Apply 2 to 3 drops and pat gently.",
      "Follow with moisturizer, and use sunscreen in the morning.",
    ],
    goodFor: ["Dull skin", "Uneven tone", "Early dark spots"],
    benefits: [
      {
        icon: "sparkles",
        title: "Fresh glow",
        description: "Helps skin look brighter and less tired.",
      },
      {
        icon: "droplets",
        title: "Soft moisture",
        description: "Adds a light layer of hydration to the skin.",
      },
      {
        icon: "shield",
        title: "Smooth look",
        description: "Supports a more even and refined skin tone.",
      },
    ],
    rating: "4.7",
    reviewLabel: "980 reviews",
  },
  {
    id: "niaceramide-sunscreen-mist",
    name: "The Originote Niaceramide Sunscreen Mist SPF 50 PA++++",
    description: "Protection",
    subtitle: "UV Defense",
    price: "RM 25.00",
    image:
      "https://www.theoriginote.com/cdn/shop/files/id-11134207-7qukw-ljlhsq05sfaf10.jpg?v=1704696836&width=600",
    badge: "New",
    category: "Sun Protection",
    volume: "80 ml",
    ingredients: "Niacinamide, UV Filters, and Panthenol",
    overview:
      "A fine sunscreen mist that makes reapplying sun protection quick, clean, and easy during the day.",
    details: [
      "The mist format is practical for travel, office days, and outdoor breaks.",
      "It helps protect skin from strong UV exposure while feeling light.",
      "It can be used over makeup when you need a quick refresh.",
    ],
    howToUse: [
      "Shake the bottle before use.",
      "Spray evenly from a short distance over face and neck.",
      "Reapply every 2 to 3 hours during sun exposure.",
    ],
    goodFor: ["Outdoor days", "Busy routines", "Easy reapplication"],
    benefits: [
      {
        icon: "sun",
        title: "High protection",
        description: "Helps protect skin from daily sun exposure.",
      },
      {
        icon: "shield",
        title: "Easy top-up",
        description: "Makes sunscreen reapplication simple during the day.",
      },
      {
        icon: "sparkles",
        title: "Comfortable wear",
        description: "Feels light and fresh instead of thick or heavy.",
      },
    ],
    rating: "4.6",
    reviewLabel: "760 reviews",
  },
  {
    id: "h-llow-clarifying-toner",
    name: "The Originote H-llow Clarifying Toner AHA + BHA + PHA",
    description: "Toner",
    subtitle: "Clarifying Reset",
    price: "RM 28.00",
    image:
      "https://www.theoriginote.com/cdn/shop/files/id-11134207-7qul4-lhmur52q3904ca_c26194c2-3698-4a37-a2d7-2070bd89ad91.jpg?v=1702953248&width=600",
    category: "Toner",
    volume: "80 ml",
    ingredients: "AHA, BHA, and PHA",
    overview:
      "A clarifying toner that helps reduce rough texture and remove leftover oil after cleansing.",
    details: [
      "It helps the skin feel cleaner and more balanced after washing.",
      "The formula is useful for areas that often feel rough or look congested.",
      "It works well when used slowly and consistently in a simple routine.",
    ],
    howToUse: [
      "Use after cleansing on dry skin.",
      "Apply with hands or a cotton pad 2 to 3 nights each week.",
      "Avoid the eye area and use sunscreen the next morning.",
    ],
    goodFor: ["Oily skin", "Clogged pores", "Rough texture"],
    benefits: [
      {
        icon: "sparkles",
        title: "Smoother texture",
        description: "Helps rough skin feel softer and more even.",
      },
      {
        icon: "shield",
        title: "Cleaner pores",
        description: "Supports a clearer look in areas with oil build-up.",
      },
      {
        icon: "leaf",
        title: "Routine prep",
        description: "Prepares skin so the next steps absorb more easily.",
      },
    ],
    rating: "4.5",
    reviewLabel: "690 reviews",
  },
  {
    id: "rose-b3-jelly-mask",
    name: "The Originote Rose B3 Brightening Jelly Mask",
    description: "Face Mask",
    subtitle: "Radiance Care",
    price: "RM 42.00",
    image:
      "https://www.theoriginote.com/cdn/shop/files/id-11134207-7qul2-lhmur52q4nkkac_45bf6935-367f-4013-ae5c-f8b3a0c18e38.jpg?v=1702953711&width=600",
    category: "Mask",
    volume: "50 ml",
    ingredients: "Rose Water, Niacinamide, and Vitamin B3",
    overview:
      "A cooling jelly mask that helps skin feel calm, moist, and brighter after a long day.",
    details: [
      "The jelly texture feels soothing and easy to spread on the skin.",
      "It gives the face a fresher look without a heavy after-feel.",
      "It is a nice weekly treatment when skin looks tired or dry.",
    ],
    howToUse: [
      "Apply an even layer after cleansing.",
      "Leave it on for 10 to 15 minutes.",
      "Rinse gently and continue with moisturizer.",
    ],
    goodFor: ["Dull skin", "Tired skin", "Weekly self-care"],
    benefits: [
      {
        icon: "heart",
        title: "Comfort care",
        description: "Helps skin feel calm and refreshed after a busy day.",
      },
      {
        icon: "sparkles",
        title: "Brighter look",
        description: "Supports a clearer and more awake-looking complexion.",
      },
      {
        icon: "droplets",
        title: "Soft finish",
        description: "Leaves skin feeling moist, smooth, and bouncy.",
      },
    ],
    rating: "4.7",
    reviewLabel: "840 reviews",
  },
  {
    id: "lip-oil-serum",
    name: "The Originote Lip Oil Serum Ceramide + Vitamin C",
    description: "Anti-Aging",
    subtitle: "Repair + Glow",
    price: "RM 48.00",
    image:
      "https://www.theoriginote.com/cdn/shop/files/id-11134207-7r98r-llakatk5ghbwc9.jpg?v=1704697875&width=600",
    category: "Lip Care",
    volume: "12 ml",
    ingredients: "Ceramide, Vitamin C, and Grapefruit Extract",
    overview:
      "A glossy lip treatment that helps dry lips feel softer, smoother, and more comfortable.",
    details: [
      "It gives lips a healthy shine while helping with dryness.",
      "The texture feels nourishing but still easy to wear every day.",
      "It can be used alone or on top of lip color for extra comfort.",
    ],
    howToUse: [
      "Apply directly to clean lips any time of day.",
      "Add another layer before bed for overnight care.",
      "Reapply when lips feel dry or need extra shine.",
    ],
    goodFor: ["Dry lips", "Daily touch-ups", "Comfortable shine"],
    benefits: [
      {
        icon: "heart",
        title: "Lip comfort",
        description: "Helps dry or tight lips feel softer right away.",
      },
      {
        icon: "sparkles",
        title: "Healthy shine",
        description: "Adds a fresh glossy look without feeling sticky.",
      },
      {
        icon: "shield",
        title: "Care layer",
        description: "Leaves a protective feel that helps reduce dryness.",
      },
    ],
    rating: "4.8",
    reviewLabel: "1.1k reviews",
  },
];

const productMap = new Map(productCatalog.map((item) => [item.id, item]));

export function getProductDetailHref(productId: string) {
  return `/products/${productId}`;
}

export function getProductById(productId: string) {
  return productMap.get(productId);
}

export function getRecommendedProducts(productId: string, limit = 4) {
  return productCatalog.filter((item) => item.id !== productId).slice(0, limit);
}

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
