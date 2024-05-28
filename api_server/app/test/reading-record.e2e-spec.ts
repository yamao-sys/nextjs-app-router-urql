import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';
import { resetTestDatabase } from './resetTestDatabase';
import { ReadingRecord } from '@prisma/client';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let prisma: PrismaService;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  // テストで起動したNestアプリを終了しないとJestで警告が発生するため、以下のコードで終了
  afterEach(async () => {
    await resetTestDatabase();
    await app.close();
    await moduleFixture.close();
  });

  describe('Query findAll()', () => {
    let firstReadingRecord: ReadingRecord;
    let secondReadingRecord: ReadingRecord;

    beforeEach(async () => {
      firstReadingRecord = await prisma.readingRecord.create({
        data: {
          title: 'test title 1',
          learnedContent: 'test learned content 1',
          impression: 'test impression 1',
        },
      });
      secondReadingRecord = await prisma.readingRecord.create({
        data: {
          title: 'test title 2',
          learnedContent: 'test learned content 2',
          impression: 'test impression 2',
        },
      });
    });

    it('指定したfieldが取得できること', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query readingRecords {
              readingRecords {
                id,
								title,
								learnedContent,
								impression
              }
            }
          `,
        })
        .expect(200);
      expect(body.data.readingRecords.length).toEqual(2);
      expect(body.data.readingRecords[0].id).toEqual(firstReadingRecord.id);
      expect(body.data.readingRecords[0].title).toEqual(firstReadingRecord.title);
      expect(body.data.readingRecords[0].learnedContent).toEqual(firstReadingRecord.learnedContent);
      expect(body.data.readingRecords[0].impression).toEqual(firstReadingRecord.impression);

      expect(body.data.readingRecords[1].id).toEqual(secondReadingRecord.id);
      expect(body.data.readingRecords[1].title).toEqual(secondReadingRecord.title);
      expect(body.data.readingRecords[1].learnedContent).toEqual(
        secondReadingRecord.learnedContent,
      );
      expect(body.data.readingRecords[1].impression).toEqual(secondReadingRecord.impression);
    });
  });

  describe('Query findOne()', () => {
    let readingRecord: ReadingRecord;

    beforeEach(async () => {
      readingRecord = await prisma.readingRecord.create({
        data: {
          title: 'test title 1',
          learnedContent: 'test learned content 1',
          impression: 'test impression 1',
        },
      });
    });

    it('指定したfieldが取得できること', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query readingRecord {
              readingRecord(id: ${readingRecord.id}) {
                id,
								title,
								learnedContent,
								impression
              }
            }
          `,
        })
        .expect(200);
      expect(body.data.readingRecord.id).toEqual(readingRecord.id);
      expect(body.data.readingRecord.title).toEqual(readingRecord.title);
      expect(body.data.readingRecord.learnedContent).toEqual(readingRecord.learnedContent);
      expect(body.data.readingRecord.impression).toEqual(readingRecord.impression);
    });
  });

  describe('Mutation createReadingRecord()', () => {
    it('読書記録が作成できること', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
						mutation createReadingRecord {
							createReadingRecord(createReadingRecordInput: {
								title: "test title",
								learnedContent: "test learnedContent"
							}) {
								id,
								title,
								learnedContent,
								impression
							}
						}					
          `,
        })
        .expect(200);
      expect(body.data.createReadingRecord.title).toEqual('test title');
      expect(body.data.createReadingRecord.learnedContent).toEqual('test learnedContent');
      expect(body.data.createReadingRecord.impression).toBeNull();

      const createdReadingRecord = await prisma.readingRecord.findFirst({
        where: { title: 'test title' },
      });
      expect(!!createdReadingRecord).toBeTruthy();
    });
  });

  describe('Mutation updateReadingRecord()', () => {
    let readingRecord: ReadingRecord;

    beforeEach(async () => {
      readingRecord = await prisma.readingRecord.create({
        data: {
          title: 'test title',
          learnedContent: 'test learned content',
          impression: 'test impression',
        },
      });
    });

    it('読書記録が更新できること', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
						mutation updateReadingRecord {
							updateReadingRecord(updateReadingRecordInput: {
								id: ${readingRecord.id},
								title: "test updated title",
								learnedContent: "test updated learned content",
								impression: "test updated impression",
							}) {
								title,
								learnedContent,
								impression
							}
						}
          `,
        })
        .expect(200);

      // NOTE: レスポンスが返って来ることの確認
      expect(body.data.updateReadingRecord.title).toEqual('test updated title');
      expect(body.data.updateReadingRecord.learnedContent).toEqual('test updated learned content');
      expect(body.data.updateReadingRecord.impression).toEqual('test updated impression');

      // NOTE: DBに保存されていることの確認
      const updatedReadingRecord = await prisma.readingRecord.findFirst({
        where: { id: readingRecord.id },
      });
      expect(updatedReadingRecord?.title).toEqual('test updated title');
      expect(updatedReadingRecord?.learnedContent).toEqual('test updated learned content');
      expect(updatedReadingRecord?.impression).toEqual('test updated impression');
    });
  });

  describe('Mutation removeTodo()', () => {
    let readingRecord: ReadingRecord;

    beforeEach(async () => {
      readingRecord = await prisma.readingRecord.create({
        data: {
          title: 'test title',
          learnedContent: 'test learned content',
          impression: 'test impression',
        },
      });
    });

    it('読書記録が削除できること', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation removeReadingRecord {
              removeReadingRecord(id: ${readingRecord.id}) {
                id
              }
            }
          `,
        })
        .expect(200);
      expect(body.data.removeReadingRecord.id).toEqual(readingRecord.id);

      const removedReadingRecord = await prisma.readingRecord.findFirst({
        where: { id: readingRecord.id },
      });
      expect(!!removedReadingRecord).toBeFalsy();
    });
  });
});
