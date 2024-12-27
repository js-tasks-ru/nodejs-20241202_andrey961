import { Module } from "@nestjs/common";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersService } from "../users/users.service";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService, UsersService, NotificationsService],
})
export class TasksModule {}
