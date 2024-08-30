import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Question } from './schemas/questions.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: mongoose.Model<Question>,
  ) {}

  async findAll(query: Query): Promise<Question[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const questions = await this.questionModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return questions;
  }

  async create(question: Question, user: User): Promise<Question> {
    const data = Object.assign(question, { user: user._id });

    const res = await this.questionModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Question> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const question = await this.questionModel.findById(id);

    if (!question) {
      throw new NotFoundException('Question not found.');
    }

    return question;
  }

  async updateById(id: string, question: Question): Promise<Question> {
    return await this.questionModel.findByIdAndUpdate(id, question, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Question> {
    return await this.questionModel.findByIdAndDelete(id);
  }
}
