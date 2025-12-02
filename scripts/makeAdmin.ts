import { prisma } from "../lib/prisma";

async function main() {
  await prisma.user.update({
    where: { email: "jarethbaur0223@gmail.com" },
    data: { role: "admin" },
  });
  console.log("User updated to admin");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
