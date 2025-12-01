Simple Shopify App

A modern e-commerce starter app built with Next.js 13, Prisma v5, NextAuth, and SQLite, featuring Google, Facebook, and Guest authentication.

Tech Stack

Frontend & Backend: Next.js 13 (App Router)

Authentication: NextAuth.js (OAuth + Guest login)

Database ORM: Prisma v5

Database: SQLite (local development)

Styling: Tailwind CSS

Language: TypeScript

Version Control: Git

Features

Google, Facebook, and Guest login

Prisma-managed database with Users, Accounts, Sessions, Products, Variants, Images, and Options

Tailwind CSS styled UI

Singleton PrismaClient for safe hot reloading

Modular, production-ready structure

Getting Started
1. Clone & Install
git clone <repo-url>
cd shop-app
npm install

2. Setup Environment Variables

Create .env:

NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

DATABASE_URL="file:./dev.db"

3. Initialize Database
npx prisma generate
npx prisma db push

4. Start Development Server
npm run dev


Open http://localhost:3000/auth/signin

to test authentication.

Folder Structure
app/
  auth/signin/page.tsx         # SignIn page
  api/auth/[...nextauth]/route.ts   # NextAuth API route
lib/prisma.ts                  # Prisma client
prisma/schema.prisma           # Database schema
.env                            # Environment variables

Commands
Command	Description
npm run dev	Start dev server
npm run build	Build production app
npm start	Start production server
npx prisma generate	Generate Prisma client
npx prisma db push	Apply schema to database
npx prisma studio	Open database GUI