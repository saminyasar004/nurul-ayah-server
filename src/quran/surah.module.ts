import { Module } from '@nestjs/common';
import { SurahController } from './surah.controller';
import { SurahService } from './surah.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SurahController],
  providers: [SurahService, PrismaService],
  exports: [SurahService],
})
export class SurahModule {}
