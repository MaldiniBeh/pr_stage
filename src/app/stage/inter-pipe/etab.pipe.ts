import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etab'
})
export class EtabPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
