import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { updateById, findById } from './utils';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task|undefined {
    return findById(this.tasks, id);
  }

  createTask(task: Task): Task {
    const newTask = {...task, id: String(this.tasks.length + 1) }; // id не уникальные получаются, но в контекст текущей задачии это не входит
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, update: Task): Task|undefined {
    updateById(this.tasks, id, update);
    return findById(this.tasks, id);
  }

  deleteTask(id: string): Task {
    const targetIndex = this.tasks.findIndex(item => item.id === id); // находим индекс таски
    const taskToDelete = this.tasks.splice(targetIndex, 1); // удаляем таску из стора, одновременно возвращаем ее для ответа
    return taskToDelete[0]; // массив из одной удаленной таски, возвращаем этот объект
  }
}
