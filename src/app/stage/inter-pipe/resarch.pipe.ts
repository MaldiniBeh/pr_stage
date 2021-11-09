import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resarch'
})

export class ResarchPipe implements PipeTransform {


  transform(value: any[], filtstring: string): any {

    return value ? value.filter(item =>
      item.nom.search(new RegExp(filtstring, 'i')) > -1 ||
      item.prenom.search(new RegExp(filtstring, 'i')) > -1 ||
      item.tel.search(new RegExp(filtstring, 'i')) > -1 ||
      // item.fili.search(new RegExp(filtstring, 'i')) > -1 ||
      // item.anne.search(new RegExp(filtstring, 'i')) > -1 ||
      // item.etabli.search(new RegExp(filtstring, 'i')) > -1 ||
      item.email.search(new RegExp(filtstring, 'i')) > -1 ||
      // item.competence.search(new RegExp(filtstring, 'i')) > -1
      item.salaire.search(new RegExp(filtstring, 'i')) > -1

    ) : [];


  }


}
