import { prisma } from '../src/lib/prisma';
import { defaultServices } from '../src/data/default-services';

async function main() {
  for (const s of defaultServices) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  
  console.log('Database seeded with initial services.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
