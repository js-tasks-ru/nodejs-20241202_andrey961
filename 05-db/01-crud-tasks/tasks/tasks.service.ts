import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_LIMIT } from "./dto/constants";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    await this.taskRepository.save(task);

    return task;
  }

  async findAll(
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<Task[]> {
    const skip = (page - 1) * limit;

    return await this.taskRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.update(id, updateTaskDto);

    if (task.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return await this.taskRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const task = await this.taskRepository.delete(id);

    if (task.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
