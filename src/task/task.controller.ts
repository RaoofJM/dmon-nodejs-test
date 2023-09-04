import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.interface';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Task | null> {
    try {
      return this.tasksService.findById(id);
    } catch (err) {}
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(body);
  }

  @Put(':id')
  @HttpCode(201)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
  ): Promise<Task | null> {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.delete(id);
  }
}
