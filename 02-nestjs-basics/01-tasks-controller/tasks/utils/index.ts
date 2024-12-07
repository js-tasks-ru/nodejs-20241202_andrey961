import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from '../task.model';

const showErrorMessage = ({ message='Oops! Task not found', code }: { message?: string, code?: number }):void => {
	switch(code) {
		case 404: throw new NotFoundException(message);
		default: throw new BadRequestException(message);
	}
};

export const isTask = (obj: any): obj is Task => {
	return (
		(obj && typeof obj === 'object') &&
		(obj.id === undefined || typeof obj.id === 'string') &&
		typeof obj.title === 'string' &&
		typeof obj.description === 'string' &&
		Object.values(TaskStatus).includes(obj.status)
	);
}

export const findById = (array: Task[], id: string) => {
	const item = array.find(item => item.id === id);
	
	if (!item) {
		showErrorMessage({ code: 404 });
		return;
	}
	
	return item;
}

export const findIndexById = (array: Task[], id: string) => {
	const index = array.findIndex(item => item.id === id);
	
	if (index === -1) {
		showErrorMessage({ code: 404 });
		return;
	}
	
	return index;
}

export const updateById = (array: Task[], id: string, obj: Task) => {
	const item = findById(array, id);
	
	if (!item) {
		showErrorMessage({ code: 404 });
		return;
	}
	
	if (!isTask(item)) {
		showErrorMessage({ message: 'Validation failed. Check your data' });
	}
	
		for (const key in obj) {
			if (key in item) {
				item[key] = obj[key];
			}
		}
}

export const addNewTask = (array: Task[], task: Task):Task => {
	if (!isTask(task)) {
		showErrorMessage({ message: 'Validation failed. Check your data' });
		return;
	}
	
	const newTask = {...task, id: String(array.length + 1) }; // id не уникальные получаются, но в контекст текущей задачии это не входит
	array.push(newTask);
	
	return newTask;
}
