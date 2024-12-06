import { z } from 'zod';

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(TaskStatus)
});

export type Task = z.infer<typeof taskSchema>;
