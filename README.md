# ![Simple Shopify App](https://img.shields.io/badge/Simple-Shopify-blue?style=flat-square) Simple Shopify App

A modern e-commerce starter app built with **Next.js 13**, **Prisma v5**, **NextAuth**, and **SQLite**, featuring Google, Facebook, and Guest authentication.

[![Next.js](https://img.shields.io/badge/Next.js-13-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)  
[![Prisma](https://img.shields.io/badge/Prisma-v5-blue?style=flat-square&logo=prisma)](https://www.prisma.io/)  
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-blue?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)  
[![NextAuth](https://img.shields.io/badge/NextAuth.js-4-blue?style=flat-square)](https://next-auth.js.org/)  

---

## Table of Contents

- [Technologies](#technologies)  
- [Features](#features)  
- [Getting Started](#getting-started)  
- [Folder Structure](#folder-structure)  
- [Commands](#commands)  
- [Future Improvements](#future-improvements)  

---

## Technologies

- **Frontend & Backend:** Next.js 13 (App Router)  
- **Authentication:** NextAuth.js (OAuth + Guest login)  
- **Database ORM:** Prisma v5  
- **Database:** SQLite (local development)  
- **Styling:** Tailwind CSS  
- **Language:** TypeScript  
- **Version Control:** Git  

---

## Features

- Google, Facebook, and Guest login  
- Prisma-managed database with Users, Accounts, Sessions, Products, Variants, Images, and Options  
- Tailwind CSS styled UI  
- Singleton PrismaClient for safe hot reloading  
- Modular, production-ready architecture  

---

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd shop-app
npm install