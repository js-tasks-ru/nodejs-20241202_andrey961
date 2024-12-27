import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  HttpException,
} from "@nestjs/common";
import * as fs from "fs";

const FILE_NAME = "errors.log";
const ERROR_500_MESSAGE = "Internal server error";
const ERROR_500_CODE = 500;

@Catch(Error, HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const isInstanceOfHTTP = exception instanceof HttpException;

    const statusCode = isInstanceOfHTTP
      ? exception.getStatus()
      : ERROR_500_CODE;
    const message = exception.message;

    const timestamp = new Date().toISOString();
    const path = request.url;

    const logFileName = FILE_NAME;
    const logMessage = `[${timestamp}] ${statusCode} - ${message}\n`;

    try {
      fs.appendFileSync(logFileName, logMessage);
    } catch (e) {
      console.error(`Failed to write to file: ${logFileName}`, e);
    }

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp,
      path,
      error: null,
    });
  }
}
