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
import { QuestionService as QuestionService } from './test.service';
import { CreateQuestionDto } from './dto/create-test.dto';
import { UpdateQuestionDto } from './dto/update-test.dto';
import { Question } from './schemas/test.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('tests')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get()
  async getAllQuestion(@Query() query: ExpressQuery): Promise<Question[]> {
    return this.questionService.findAll(query);
  }

  @Post()
  async createQuestion(
    @Body()
    question: CreateQuestionDto,
    @Req() req,
  ): Promise<Question> {
    return this.questionService.create(question, req.user);
  }

  @Get(':id')
  async getQuestion(
    @Param('id')
    id: string,
  ): Promise<Question> {
    return this.questionService.findById(id);
  }

  @Put(':id')
  async updateQuestion(
    @Param('id')
    id: string,
    @Body()
    question: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionService.updateById(id, question);
  }
}
