import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { updateById, findById, findIndexById, addNewTask } from './utils';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return findById(this.tasks, id);
  }

  createTask(task: Task): Task {
    return addNewTask(this.tasks, task);
  }

  updateTask(id: string, update: Task): Task {
    updateById(this.tasks, id, update);
    return findById(this.tasks, id);
  }

  deleteTask(id: string): Task {
    const targetIndex = findIndexById(this.tasks, id);
    
    const taskToDelete = this.tasks.splice(targetIndex, 1); // удаляем таску из стора, одновременно возвращаем ее для ответа
    return taskToDelete[0]; // массив из одной удаленной таски, возвращаем этот объект
  }
}
