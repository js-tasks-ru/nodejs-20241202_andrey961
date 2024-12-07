import { BadRequestException } from '@nestjs/common';
import { Task, TaskStatus, SortableKeys } from '../task.model';

const OFFSET = 1;
const VALIDATION_ERROR_MESSAGE = 'Validation error. Check your data';

export const getTasksByStatus = (tasks: Task[], status?: TaskStatus): Task[] => {
	if (!status) {
		return tasks;
	}
	
	if (status === TaskStatus.COMPLETED || status === TaskStatus.IN_PROGRESS || status === TaskStatus.PENDING) {
		return tasks.filter((task) => task.status === status);
	}
	
	throw new BadRequestException(VALIDATION_ERROR_MESSAGE);
}

export const getPagination = (tasks: Task[], page?: number, limit?: number): Task[] => {
	const totalPages = Math.ceil(tasks.length / limit);
	const start = page - OFFSET;
	
	if (!page && !limit) {
		return tasks;
	}
	
	if (page < 0 || limit < 0) {
		throw new BadRequestException(VALIDATION_ERROR_MESSAGE);
	}
	
	return tasks.slice(start, limit);
}

export const getSorted = (tasks: Task[], key?: SortableKeys) => {
	if (!key) {
		return tasks;
	}

	if (key === SortableKeys.TITLE || key === SortableKeys.STATUS) {
		return tasks.sort((a, b) => a[key].localeCompare(b[key]));
	}
	
	throw new BadRequestException(VALIDATION_ERROR_MESSAGE)
}
