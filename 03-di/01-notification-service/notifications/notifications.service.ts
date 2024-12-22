import { Injectable, Logger } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger("NotificationsService");
  
  sendEmail(to: string, subject: string, message: string): void {
    const logFileName = 'nest.log';
    const logFilePath = path.join(process.cwd(), logFileName);
    const logMessage = `Email sent to ${to}: ${subject} ${message}\n`
    
    this.logger.log(logMessage);
    
    try {
      fs.writeFileSync(logFilePath, logMessage, { flag: 'a+' });
      this.logger.log(`Successfully wrote to file: ${logFilePath}`);
    } catch (err) {
      this.logger.error(`Failed to write to file: ${logFilePath}`, err);
    }
  };
  
  sendSMS(to: string, message: string): void {
    this.logger.log(`SMS sent to ${to}: ${message}`);
  }
}
