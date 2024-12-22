import { Injectable, NotFoundException } from "@nestjs/common";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersService } from "../users/users.service";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    private readonly notificationService: NotificationsService,
    private readonly userService: UsersService
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;

    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);
    
    const currentUser = this.userService.getUserById(assignedTo);
    const subject = 'Новая задача';
    const message = `Вы назначены ответственным за задачу: "${title}"`;
    
    this.notificationService.sendEmail(currentUser.email, subject, message);
    
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    Object.assign(task, updateTaskDto);
    
    const to = this.userService.getUserById(task.assignedTo).phone;
    const message = `Статус задачи "${task.title}" обновлён на "${task.status}"`
    
    this.notificationService.sendSMS(to, message);
    return task;
  }
}
