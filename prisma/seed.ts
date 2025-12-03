import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Sample products
  const products = [
    {
      title: "Wireless Headphones",
      body_html: "High-quality wireless headphones with noise-canceling feature.",
      vendor: "AudioTech",
      product_type: "Electronics",
      status: "active",
      images: {
        create: [
          { src: "/images/headphones1.jpg", alt: "Wireless Headphones" },
          { src: "/images/headphones2.jpg", alt: "Side View" },
        ],
      },
      variants: {
        create: [
          { title: "Black", price: 2999, sku: "WH-BLK-001", inventory_quantity: 20 },
          { title: "White", price: 2999, sku: "WH-WHT-001", inventory_quantity: 15 },
        ],
      },
      tags: {
        create: [{ name: "Audio" }, { name: "Wireless" }],
      },
    },
    {
      title: "Smartphone Case",
      body_html: "Durable TPU smartphone case with anti-slip grip.",
      vendor: "CaseCo",
      product_type: "Accessories",
      status: "active",
      images: { create: [{ src: "/images/case1.jpg", alt: "Smartphone Case" }] },
      variants: {
        create: [
          { title: "Black", price: 499, sku: "SC-BLK-001", inventory_quantity: 50 },
          { title: "Blue", price: 499, sku: "SC-BLU-001", inventory_quantity: 35 },
        ],
      },
      tags: { create: [{ name: "Phone" }, { name: "Case" }] },
    },
    {
      title: "Coffee Mug",
      body_html: "Ceramic coffee mug with 350ml capacity.",
      vendor: "Kitchenware Co",
      product_type: "Home & Kitchen",
      status: "active",
      images: { create: [{ src: "/images/mug1.jpg", alt: "Coffee Mug" }] },
      variants: { create: [{ title: "Standard", price: 250, sku: "MUG-STD-001", inventory_quantity: 100 }] },
      tags: { create: [{ name: "Kitchen" }, { name: "Drinkware" }] },
    },
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log("Seed complete ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
