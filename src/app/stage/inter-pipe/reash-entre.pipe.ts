import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reashEntre'
})
export class ReashEntrePipe implements PipeTransform {

  transform(value: any[], filtstring: string): any {
    return value ? value.filter(item =>
      item.date_ent.search(new RegExp(filtstring, 'i')) > -1 ||
      item.heure.search(new RegExp(filtstring, 'i')) > -1 ||
      item.lieu.search(new RegExp(filtstring, 'i')) > -1 ||
      item.nom.search(new RegExp(filtstring, 'i')) > -1 ||
      item.prenom.search(new RegExp(filtstring, 'i')) > -1 ||
      item.salaire.search(new RegExp(filtstring, 'i')) > -1 ||
      item.nomp.search(new RegExp(filtstring, 'i')) > -1 ||
      item.prenomp.search(new RegExp(filtstring, 'i')) > -1


    ) : [];
  }

}
