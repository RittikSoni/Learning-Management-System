import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionSchema } from './schemas/questions.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
