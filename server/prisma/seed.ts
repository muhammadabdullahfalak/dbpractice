// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
    },
  });

  const category = await prisma.category.create({
    data: { name: "Test Category" },
  });

  const product = await prisma.product.create({
    data: {
      name: "Test Product",
      price: 9.99,
      categoryId: category.id,
    },
  });

  console.log("Seeded:", { user, product });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
