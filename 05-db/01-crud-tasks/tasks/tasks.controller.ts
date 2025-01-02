import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  BadRequestException,
  Query,
} from "@nestjs/common";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_LIMIT } from "./dto/constants";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query("page") page: string, @Query("limit") limit: string) {
    const pageNumber = page ? parseInt(page, 10) : DEFAULT_PAGE_NUMBER;
    const limitNumber = limit ? parseInt(limit, 10) : DEFAULT_PAGE_LIMIT;

    return this.tasksService.findAll(pageNumber, limitNumber);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException("id must be an integer");
    }

    return this.tasksService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    if (isNaN(+id)) {
      throw new BadRequestException("id must be an integer");
    }

    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException("id must be an integer");
    }

    return this.tasksService.remove(+id);
  }
}
