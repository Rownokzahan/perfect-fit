# 👗 Perfect Fit

**Perfect Fit** is a modern online dress customization and e-commerce platform where users can personalize their outfits with custom designs and measurements for a flawless fit.

🔗 [Live Site](https://perfect-fit-store.vercel.app/)

---

## 🧰 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) with `cacheComponent` for optimized rendering
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Better Auth](https://better-auth.com/) (with MongoDB)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **UI Enhancements**: [Embla Carousel](https://www.embla-carousel.com/), [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🚀 Features

### 👥 User Side

- **Homepage**  
  Hero banner, Why Choose Us section, Category grid, Tailor introductions (static), Latest Products, and Customer reviews (static).

- **Dresses Page**

  - Filter by category
  - Sort by newest, price, or alphabetically
  - Search dresses by name

- **Product Page (Customize Page)**

  - Choose: bodice design, skirt type, sleeve style (or leave default)
  - Add body measurements (length, sleeve length, waist)
  - Special instructions text area
  - Add to cart with all customization data

- **Custom Dress Builder**

  - Select design components
  - Live preview updates with selections
  - Input measurements and submit custom design to cart

- **Cart Page**

  - View items with customizations
  - Edit quantity and view price summary
  - Checkout button

- **Checkout Page**

  - Order summary
  - Provide name, address, phone
  - Cash on Delivery option

- **My Orders & Order Details**
  - See order history
  - Detailed breakdown including all customizations and measurements

---

### 🔧 Admin Panel

- **Product Management**

  - Add, edit, or delete products
  - Image preview before upload

- **Category Management**
  - Add, edit, or delete categories

---

## 💾 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Rownokzahan/perfect-fit

# 2. Move into the project folder
cd perfect-fit

# 3. Install dependencies
pnpm install

# 4. Set environment variables
# Create a .env.local file with:
# - MONGODB_URI
# - MONGODB_DB
# - BETTER_AUTH_SECRET
# - BETTER_AUTH_URL
# - IMGBB_API_KEY
# - GUEST_SECRET

# 5. Run development server
pnpm dev
```

---

## 📸 Screenshots & Demo

Below are some visual previews showcasing key features of **Perfect Fit**:

### Homepage

![Homepage](https://perfect-fit-store.vercel.app/screenshots/home-page.webp)

### Custom Dress Builder

![Custom Dress Builder](https://perfect-fit-store.vercel.app/screenshots/custom-dress.webp)  
Interactive live preview updates in real-time as users customize bodice, skirt, and sleeve designs.

### Admin Panel - Product Management

![Admin Product Management](https://perfect-fit-store.vercel.app/screenshots/admin-products.webp)  
Streamlined interface for adding, editing, and managing dress products with image previews.

### Admin Panel - Category Management

![Admin Category Management](https://perfect-fit-store.vercel.app/screenshots/admin-categories.webp)  
Easy-to-use category creation and management for organizing dress collections.

---

## 📦 Deployment

Deployed on **[Vercel](https://vercel.com/)**:  
👉 [https://perfect-fit-store.vercel.app](https://perfect-fit-store.vercel.app)

---

## 🧑‍💻 Author

**Rownok Zahan**  
[GitHub](https://github.com/Rownokzahan) | [LinkedIn](https://www.linkedin.com/in/rownok-zahan-rupa/)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
