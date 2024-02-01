import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class IntParserPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    if (value === undefined || value === '') return undefined;

    const parseVal = parseInt(value, 10);
    if (isNaN(parseVal)) {
      throw new Error('Method not implemented.');
    }
    return parseVal;
  }
}
