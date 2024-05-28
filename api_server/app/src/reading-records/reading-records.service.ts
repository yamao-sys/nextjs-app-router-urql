import { Injectable } from '@nestjs/common';
import { CreateReadingRecordInput } from './dto/create-reading-record.input';
import { UpdateReadingRecordInput } from './dto/update-reading-record.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReadingRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReadingRecordInput: CreateReadingRecordInput) {
    return await this.prisma.readingRecord.create({ data: createReadingRecordInput });
  }

  async findAll() {
    return await this.prisma.readingRecord.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.readingRecord.findFirst({ where: { id } });
  }

  async update(id: number, updateReadingRecordInput: UpdateReadingRecordInput) {
    return await this.prisma.readingRecord.update({
      where: { id },
      data: updateReadingRecordInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.readingRecord.delete({
      where: { id },
    });
  }
}
