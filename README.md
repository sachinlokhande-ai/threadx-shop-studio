# ThreadX Style Shop

Create a modern, responsive e-commerce website for a T-shirt brand called "THREADX".

Tech stack:

- React

- Vite

- JavaScript

- Tailwind CSS

- Use local mock product data

- No backend required for now

Design:

- Clean, modern fashion e-commerce UI

- White/light background with black text and subtle gray borders

- Professional typography

- Mobile, tablet, and desktop responsive

- Smooth hover effects and simple animations

- Do not make the design overly complicated

Pages:

1. HOME PAGE

- Navbar with:

  - Logo: THREADX

  - Home

  - Shop

  - Categories

  - About

  - Search icon

  - Cart icon with item count

- Hero section with:

  - Large T-shirt fashion image

  - Heading: "EVERYDAY TEES. BETTER."

  - Short description

  - "Shop Now" button

- Featured categories:

  - Oversized

  - Regular Fit

  - Graphic Tees

  - Plain Tees

- Featured products section

- "New Arrivals" section

- Small promotional banner:

  "Free shipping on orders above ₹999"

- Footer

2. SHOP PAGE

- Display all T-shirts in a responsive product grid.

- Product card should contain:

  - Product image

  - Product name

  - Price in ₹

  - Original price if discounted

  - Discount percentage

  - Rating

  - "Add to Cart" button

- Add filters:

  - Category

  - Size

  - Color

  - Price

- Add sorting:

  - Price: Low to High

  - Price: High to Low

  - Newest

  - Popular

3. PRODUCT DETAILS PAGE

- Large product image

- Product name

- Price

- Discount

- Description

- Available colors

- Size selection: S, M, L, XL, XXL

- Quantity selector

- "Add to Cart" button

- "Buy Now" button

- Product details

- Customer reviews

- Related products

4. CART PAGE

- Show all added products

- Product image

- Name

- Selected size

- Selected color

- Quantity controls (+ / -)

- Individual item price

- Remove button

- Automatically calculate:

  - Subtotal

  - Discount

  - GST

  - Delivery charge

  - Final total

- Show "Proceed to Checkout" button

- Cart must update immediately when quantity changes.

5. CHECKOUT PAGE

- Customer information:

  - Full Name

  - Email

  - Phone

  - Address

  - City

  - State

  - Pincode

- Order summary

- Selected products

- Quantity

- Subtotal

- GST

- Delivery

- Final total

- "Place Order" button

6. ORDER SUCCESS PAGE

- Show:

  "Order Placed Successfully!"

- Generate a simple order ID

- Show order summary

- "Continue Shopping" button

FUNCTIONAL REQUIREMENTS:

- Products should come from a JavaScript array/object.

- Add to Cart must work.

- Remove from Cart must work.

- Quantity increase/decrease must work.

- Cart total must automatically recalculate.

- Product filtering must work.

- Product sorting must work.

- Search must work.

- Cart should persist using localStorage.

- Selected size and color should be stored with each cart item.

- Prevent adding a product without selecting a size.

- Show a small notification when a product is added to cart.

- Use React Router for navigation.

- Do not use hardcoded cart totals.

- Keep components reusable and organized.

PRODUCT DATA:

Create at least 12 sample T-shirts with:

- id

- name

- category

- price

- originalPrice

- discount

- image

- colors

- sizes

- rating

- description

Use realistic Indian prices such as ₹499, ₹699, ₹799, ₹999, ₹1,199.

IMPORTANT:

- Make the website fully functional, not just a static UI.

- Avoid unnecessary libraries.

- Keep the code beginner-friendly and well organized.

- Create reusable components such as Navbar, ProductCard, ProductGrid, FilterSidebar, CartItem, Footer, etc.

- Make sure there are no console errors.

- Make the UI look like a real modern T-shirt shopping website.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://threadx-shop-studio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/65cd0d92-3bf0-508f-81f8-f700d137cb03).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
