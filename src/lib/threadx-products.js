import editorial from "@/assets/threadx-editorial.jpg";
import whiteTee from "@/assets/threadx-product-white.jpg";
import blackTee from "@/assets/threadx-product-black.jpg";
import graphicTee from "@/assets/threadx-product-graphic.jpg";

export const products = [
  { id: "core-white", name: "The Everyday Oversized Tee", category: "Oversized", price: 799, originalPrice: 999, discount: 20, image: whiteTee, colors: ["White", "Moss", "Cloud"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.8, reviews: 126, isNew: true, description: "Your new most-reached-for tee. Made from breathable 240 GSM cotton with a relaxed, considered drape." },
  { id: "core-black", name: "The Heavyweight Essential", category: "Regular Fit", price: 699, originalPrice: 899, discount: 22, image: blackTee, colors: ["Black", "White", "Slate"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.7, reviews: 98, isNew: true, description: "A seriously good staple, cut from soft heavyweight cotton and finished with a collar that keeps its shape." },
  { id: "sun-daze", name: "Sun Daze Graphic Tee", category: "Graphic Tees", price: 999, originalPrice: 1199, discount: 17, image: graphicTee, colors: ["Rust", "Moss", "White"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.9, reviews: 84, isNew: true, description: "A little sunshine for the everyday. This easy-wearing graphic tee is printed in soft, breathable cotton." },
  { id: "coast-white", name: "Coastal Oversized Tee", category: "Oversized", price: 899, originalPrice: 1099, discount: 18, image: whiteTee, colors: ["White", "Sky", "Sand"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.6, reviews: 72, isNew: true, description: "Roomy where it counts and just right everywhere else. Made for sunny plans and doing nothing in particular." },
  { id: "after-hours", name: "After Hours Tee", category: "Graphic Tees", price: 1199, originalPrice: 1499, discount: 20, image: blackTee, colors: ["Black", "Slate"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.9, reviews: 203, isNew: false, description: "A mood, not just a tee. Substantial cotton, a clean graphic and an effortlessly oversized fit." },
  { id: "soft-structure", name: "Soft Structure Tee", category: "Regular Fit", price: 699, originalPrice: 799, discount: 13, image: whiteTee, colors: ["Cloud", "White", "Moss"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.5, reviews: 61, isNew: false, description: "An uncomplicated everyday essential in impossibly soft cotton. Easy fit, easy care, even easier to wear." },
  { id: "terracotta", name: "Terracotta Studio Tee", category: "Graphic Tees", price: 999, originalPrice: 1199, discount: 17, image: graphicTee, colors: ["Rust", "Black", "Cloud"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.8, reviews: 110, isNew: true, description: "A warm pop of colour and a graphic worth looking twice at. Printed on soft, easy-fit cotton." },
  { id: "weekender", name: "The Weekender", category: "Oversized", price: 899, originalPrice: 999, discount: 10, image: blackTee, colors: ["Black", "White", "Sand"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.7, reviews: 146, isNew: false, description: "Friday feeling, seven days a week. A relaxed unisex fit in durable, responsibly chosen cotton." },
  { id: "day-one", name: "Day One Classic", category: "Plain Tees", price: 499, originalPrice: 699, discount: 29, image: whiteTee, colors: ["White", "Black", "Sky"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.6, reviews: 248, isNew: false, description: "The one you'll wish you bought two of. Our simplest, softest cotton tee at an easy-on-the-wallet price." },
  { id: "north-star", name: "North Star Tee", category: "Graphic Tees", price: 1199, originalPrice: 1399, discount: 14, image: graphicTee, colors: ["Rust", "Sky", "Black"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.8, reviews: 67, isNew: true, description: "A wearable little reminder to find your own way. Artful print and a relaxed everyday fit." },
  { id: "frame-regular", name: "Frame Regular Tee", category: "Regular Fit", price: 799, originalPrice: 999, discount: 20, image: blackTee, colors: ["Black", "Moss", "Cloud"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.4, reviews: 55, isNew: false, description: "Reliable, comfortable and beautifully uncomplicated. A classic everyday shape in midweight cotton." },
  { id: "open-road", name: "Open Road Oversized Tee", category: "Oversized", price: 999, originalPrice: 1199, discount: 17, image: whiteTee, colors: ["White", "Rust", "Slate"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.9, reviews: 184, isNew: true, description: "Made for the long way round. A little extra room, a lot of soft cotton, and nowhere else to be." },
];

export const categories = [
  { name: "Oversized", number: "01", tint: "category-mint", image: whiteTee },
  { name: "Regular Fit", number: "02", tint: "category-lilac", image: blackTee },
  { name: "Graphic Tees", number: "03", tint: "category-blue", image: graphicTee },
  { name: "Plain Tees", number: "04", tint: "category-coral", image: whiteTee },
];

export const formatINR = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);