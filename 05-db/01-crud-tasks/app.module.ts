import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./tasks/entities/task.entity";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Task],
    synchronize: true,
  })],
})
export class AppModule {}
