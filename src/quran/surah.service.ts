import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SurahService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.surah.findMany({
      orderBy: { number: 'asc' },
    });
  }

  async findOne(number: number) {
    const surah = await this.prisma.surah.findUnique({
      where: { number },
      include: { ayahs: { orderBy: { number: 'asc' } } },
    });
    
    if (!surah) {
      throw new NotFoundException(`Surah with number ${number} not found`);
    }
    
    return surah;
  }
}
