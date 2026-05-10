# Perfect Fit

Perfect Fit is a dress customization and e-commerce application built with Next.js. Customers can browse products, customize dress details, add measurements, manage carts and wishlists, and place orders. The project also includes an admin area for managing products, categories, customers, and orders.

Live site: <https://perfect-fit-store.vercel.app/>

## Highlights

- Browse dresses with category filters, sorting, and search.
- Customize products with style options, measurements, and special instructions.
- Build a custom dress with live preview updates.
- Support guest cart flows and signed-in user flows.
- Save wishlist items and review order history.
- Manage catalog and store operations from the admin area.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- MongoDB with Mongoose
- React Hook Form
- Zustand
- Embla Carousel
- React Hot Toast

## Performance Notes

- Uses the `cacheComponents` opt-in feature in Next.js 16.
- `cacheComponents: true` is enabled in [next.config.ts](C:/Users/Admin/Documents/projects/perfect-fit/next.config.ts:4).
- Cached query paths also use the `"use cache"` directive in server-side data fetching code.

## App Areas

### Customer experience

- Home page with hero content, categories, latest arrivals, reviews, and promotional sections.
- Dresses listing page with search, sorting, and category-based browsing.
- Product detail pages with dress customization options.
- Custom dress builder flow.
- Cart, wishlist, checkout, and order history pages.
- Authentication and protected account flows.

### Admin experience

- Dashboard layout for store management.
- Product create, update, soft delete, restore, and status management.
- Category create, update, and delete flows.
- Customer and order management pages.
- Admin route protection based on user role.

## Project Structure

```text
src/
  app/          App Router pages, layouts, API routes, and admin UI
  actions/      Server actions for products, cart, orders, wishlist, and categories
  components/   Shared UI components
  lib/          Auth, database, services, and utilities
  models/       Database models
  stores/       Client state stores
  types/        Shared TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- pnpm
- MongoDB database

### Installation

```bash
git clone https://github.com/Rownokzahan/perfect-fit
cd perfect-fit
pnpm install
```

### Environment Variables

Copy the example file and fill in your values.

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

macOS/Linux:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DB` | MongoDB database name |
| `BETTER_AUTH_SECRET` | Better Auth secret |
| `BETTER_AUTH_URL` | Base URL used by Better Auth |
| `IMGBB_API_KEY` | ImgBB API key for image uploads |
| `GUEST_SECRET` | Secret used to sign guest identifiers |

### Run the app

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`.

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Authentication and Access Control

- Better Auth powers sign-in and session handling.
- Checkout and order pages require authentication.
- Admin routes are protected and require a user with the `admin` role.
- Guest users can still build carts before signing in.

## Screenshots

### Homepage

![Homepage](https://perfect-fit-store.vercel.app/screenshots/home-page.webp)

### Custom Dress Builder

![Custom Dress Builder](https://perfect-fit-store.vercel.app/screenshots/custom-dress.webp)

### Admin Product Management

![Admin Product Management](https://perfect-fit-store.vercel.app/screenshots/admin-products.webp)

### Admin Category Management

![Admin Category Management](https://perfect-fit-store.vercel.app/screenshots/admin-categories.webp)

## Deployment

The production site is deployed on Vercel:

<https://perfect-fit-store.vercel.app/>

## Author

Rownok Zahan

- GitHub: <https://github.com/Rownokzahan>
- LinkedIn: <https://www.linkedin.com/in/rownok-zahan-rupa/>
