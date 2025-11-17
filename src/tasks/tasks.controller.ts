import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const userId = (req as any).user?.userId;
    if (!userId) {
      throw new Error('User ID is required');
    }
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId = (req as any).user?.userId;
    if (!userId) {
      throw new Error('User ID is required');
    }
    return this.tasksService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
