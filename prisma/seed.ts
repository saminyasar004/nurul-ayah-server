import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning existing data...');
  await prisma.ayah.deleteMany();
  await prisma.surah.deleteMany();

  console.log('Seeding Quran data...');

  for (let i = 1; i <= 114; i++) {
    try {
      console.log(`Fetching Surah ${i}...`);
      const response = await axios.get(`https://raw.githubusercontent.com/risan/quran-json/master/dist/chapters/en/${i}.json`);
      const data = response.data;

      const surah = await prisma.surah.create({
        data: {
          number: data.id,
          name: data.name,
          transliteration: data.transliteration,
          translation: data.translation,
          type: data.type,
          totalVerses: data.total_verses,
          ayahs: {
            create: data.verses.map((v: any) => ({
              number: v.id,
              textArabic: v.text,
              textEnglish: v.translation,
            })),
          },
        },
      });

      console.log(`Successfully seeded Surah ${i}: ${surah.transliteration}`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || error;
      console.error(`Error seeding Surah ${i}:`, errorMessage);
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
