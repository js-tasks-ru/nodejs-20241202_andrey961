import { PipeTransform, BadRequestException } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const res = parseInt(value, 10);
    
    if (isNaN(res)) {
      throw new BadRequestException(`"${value}" не является числом`)
    }
    
    return res
  }
}
