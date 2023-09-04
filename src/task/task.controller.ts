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
import { Task } from './task.schema';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { FindAllTasksDto } from './dto/finaAllTasks.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  async findAll(@Body() body: FindAllTasksDto): Promise<Task[]> {
    const page = body.page ? parseInt(body.page.toString()) : 1;
    const limit = body.limit ? parseInt(body.limit.toString()) : 5;
    return this.tasksService.findAll(page, limit);
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
