import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";
import { ZodValidationPipe } from './pipes';
import { TasksService } from "./tasks.service";
import { taskSchema, Task } from './task.model';

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string): Task|undefined {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(taskSchema))
  createTask(@Body() task: Task): Task {
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() task: Task): Task|undefined {
    return this.tasksService.updateTask(id, task);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string): Task {
    return this.tasksService.deleteTask(id);
  }
}
