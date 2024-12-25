import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

Injectable();
export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = new Date().getTime();
    
    return next.handle().pipe(
      map((data) => ({
        ...data,
        apiVersion: "1.0",
        executionTime: `${new Date().getTime() - start}ms`,
      })),
    );
  }
}
