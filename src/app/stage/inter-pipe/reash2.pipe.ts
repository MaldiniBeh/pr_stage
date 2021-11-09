import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reash2'
})
export class Reash2Pipe implements PipeTransform {

  transform(value: any[], filtstring: string): any {
    return value ? value.filter(item =>
      item.nom.search(new RegExp(filtstring, 'i')) > -1 ||
      item.prenom.search(new RegExp(filtstring, 'i')) > -1 ||
      item.profession.search(new RegExp(filtstring, 'i')) > -1 ||
      item.role.search(new RegExp(filtstring, 'i')) > -1 ||
      item.email.search(new RegExp(filtstring, 'i')) > -1
      // item.salaire.search(new RegExp(filtstring, 'i')) > -1

    ) : [];
  }

}
