import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      userId: userId,
    });
    return await this.tasksRepository.save(task);
  }

  async findByUser(userId: number): Promise<Task[]> {
    return await this.tasksRepository.find({
      where: { userId: userId },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }
}
