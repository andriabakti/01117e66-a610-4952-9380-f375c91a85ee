import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class IntParserPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    if (value === undefined || value === '') return null;

    const parseVal = parseInt(value, 10);
    if (isNaN(parseVal)) {
      throw new BadRequestException('Validation Failed');
    }
    return parseVal;
  }
}
