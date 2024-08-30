import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

export enum Category {
  HISTORY = 'History',
  GK = 'Gk',
  MATHS = 'Maths',
  ENGLISH = 'English',
}

@Schema({
  timestamps: true,
})
export class Question {
  @Prop()
  title: string;

  @Prop()
  answer: string;

  @Prop()
  difficulty: number;

  @Prop()
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
