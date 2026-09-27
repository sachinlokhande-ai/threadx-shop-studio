export interface ThreadxProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  description: string;
}
export interface ThreadxCategory {
  name: string;
  number: string;
  tint: string;
  image: string;
}
export declare const products: ThreadxProduct[];
export declare const categories: ThreadxCategory[];
export declare const formatINR: (amount: number) => string;
