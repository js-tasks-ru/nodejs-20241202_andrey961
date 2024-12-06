import { NotFoundException } from '@nestjs/common';
import { Task } from '../task.model';

export const findById = (array: Task[], id: string) => {
	const item = array.find(item => item.id === id);
	if (item) {
		return item;
	}
	
	throw new NotFoundException(`Oops! Task id${id} not found`);
}

export const updateById = (array: Task[], id: string, obj: Task) => {
	const item = findById(array, id);
	
	if (item) {
		for (const key in obj) {
			if (key in item) {
				item[key] = obj[key];
			}
		}
	}
}
