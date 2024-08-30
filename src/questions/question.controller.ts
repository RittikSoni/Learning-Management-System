import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuestionService as QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './schemas/questions.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllQuestion(@Query() query: ExpressQuery): Promise<Question[]> {
    return this.questionService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createQuestion(
    @Body()
    question: CreateQuestionDto,
    @Req() req,
  ): Promise<Question> {
    return this.questionService.create(question, req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getQuestion(
    @Param('id')
    id: string,
  ): Promise<Question> {
    return this.questionService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateQuestion(
    @Param('id')
    id: string,
    @Body()
    question: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionService.updateById(id, question);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteQuestion(
    @Param('id')
    id: string,
  ): Promise<Question> {
    return this.questionService.deleteById(id);
  }
}
