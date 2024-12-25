import { Module, MiddlewareConsumer } from "@nestjs/common";
import { LoggingMiddleware } from "../middlewares/logging.middleware";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("");
  }
}
