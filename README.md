# 📚 Demo Seller Panel — Internship Assignment

This is my submission for the internship assignment for the **Demo Seller Panel**.  
It is a **multi-seller book portal** with a seller dashboard, authentication, and clean responsive UI.

Test account:- email:- admin@admin.com, password:- admin1234

---

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (with TypeScript)
- **Backend**: Next.js API Routes
- **Authentication**: JWT-based auth
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (via [Neon](https://neon.tech/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 Features Implemented

- **Authentication**

  - Seller registration & login
  - JWT-based authentication

- **Dashboard Pages**

  - **My Listings** → View all books added by the seller
  - **New Listing** → Add new books (title, price, stock, image URL)
  - **Sales** → Display dummy sales data
  - **Profile** → View seller details

- **Responsive UI**

  - Clean, minimal, and mobile-friendly design using Tailwind CSS

- **API Routes**
  - Functional Next.js API routes
  - Connected to PostgreSQL via Prisma ORM

---

## 📊 Database Schema

```prisma
model Seller {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  books     Book[]
  createdAt DateTime @default(now())
}

model Book {
  id        String   @id @default(cuid())
  sellerId  String
  title     String
  price     Float
  stock     Int
  imageUrl  String
  seller    Seller   @relation(fields: [sellerId], references: [id])
  sales     Sale[]
  createdAt DateTime @default(now())
}

model Sale {
  id        String   @id @default(cuid())
  bookId    String
  quantity  Int
  total     Float
  book      Book     @relation(fields: [bookId], references: [id])
  createdAt DateTime @default(now())
}
```
