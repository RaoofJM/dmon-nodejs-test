import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task, Task as TaskSchema } from './task.schema';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskSchema>,
  ) {}

  async findAll(page: number, limit: number): Promise<Task[]> {
    const skip = (page - 1) * limit;

    return this.taskModel.find().skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<TaskSchema | null> {
    try {
      return this.taskModel.findById(id).exec();
    } catch (err) {
      throw new NotFoundException('no task found');
    }
  }

  async create(task: CreateTaskDto): Promise<TaskSchema> {
    const createdTask = new this.taskModel(task);
    return createdTask.save();
  }

  async update(id: string, task: UpdateTaskDto): Promise<TaskSchema | null> {
    try {
      return this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
    } catch (err) {
      throw new NotFoundException('no task found');
    }
  }

  async delete(id: string): Promise<TaskSchema | null> {
    try {
      return this.taskModel.findByIdAndRemove(id).exec();
    } catch (err) {
      throw new NotFoundException('no task found');
    }
  }
}
