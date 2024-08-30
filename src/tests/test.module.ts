import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { QuestionController } from './test.controller';
import { QuestionService } from './test.service';
import { QuestionSchema } from './schemas/test.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
