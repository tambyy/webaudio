const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Tags
  const popTag = await prisma.tag.create({
    data: { name: "Pop", color: "#142b6b", bgcolor: "#dee7ff" },
  });

  const hitTag = await prisma.tag.create({
    data: { name: "Hit", color: "#b35619", bgcolor: "#ffeee3" },
  });

  const eteTag = await prisma.tag.create({
    data: { name: "Eté", color: "#20590c", bgcolor: "#dbebd5" },
  });

  const danseTag = await prisma.tag.create({
    data: { name: "Dance", color: "#350766", bgcolor: "#ede4f7" },
  });

  const alternatifTag = await prisma.tag.create({
    data: { name: "Alternatif", color: "#ad1538", bgcolor: "#fadce3" },
  });

  const electroTag = await prisma.tag.create({
    data: { name: "Electro", color: "#0099AA", bgcolor: "#DDEEFF" },
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
