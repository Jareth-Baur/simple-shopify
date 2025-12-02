// scripts/make-admin.js
import { prisma } from "../lib/prisma.js"; // make sure this path is correct

async function main() {
  const email = process.argv[2]; // get email from command line

  if (!email) {
    console.log("Usage: node scripts/make-admin.js user@example.com");
    process.exit(1);
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });

    console.log(`✅ User ${user.email} is now an ADMIN.`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
