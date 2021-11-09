import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Peronel } from './../../inter-pipe/all-inter';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ManageService } from './../../../service/manage.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Listentre } from '../../inter-pipe/all-inter';

@Component({
  selector: 'app-entre',
  templateUrl: './entre.component.html',
  styleUrls: ['./entre.component.scss']
})
export class EntreComponent implements OnInit, OnDestroy, AfterContentChecked {
  Entre!: Listentre[];
  filtinit: string | undefined;
  filtadm: string | undefined;
  subci: Subscription | undefined;
  dateEntre: any;
  getChange!: FormGroup;
  User!: Peronel[];
  constructor(private manaser: ManageService, private route: Router) { }

  ngOnInit(): void {
    this.subci = this.manaser.getAllteach().subscribe((toto: Peronel[]) => {
      this.User = toto;
    });
    let tata = new Date().getDate();
    let toto;
    if (tata.toString().length > 1) {
      toto = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
      this.dateEntre = toto;
    }
    else {
      toto = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-0${new Date().getDate()}`
      this.dateEntre = toto;
    }
    this.getChange = new FormGroup({
      rate: new FormControl(toto, [Validators.required]),
      zeur: new FormControl(null, [Validators.required]),
      lieu: new FormControl(null, [Validators.required]),
      charg: new FormControl(null, [Validators.required]),

    })
    this.subci = this.manaser.getAlletntre().subscribe((toto: Listentre[]) => {
      this.Entre = toto;
      //console.log(this.Entre);
      this.Entre.map((i) => {
        return i.salaire = i.salaire != null ? 'Professionel' : 'Adémique';
      })
    });
  }
  OnSendchangEntre(id_entre: number) {
    const rate = this.getChange?.value.rate
    const zeur = this.getChange?.value.zeur
    const charg = this.getChange?.value.charg
    const lieu = this.getChange?.value.lieu
    const tabname = charg.split(' ')[0];
    const tabpre = charg.split(' ')[1];
    let Userid;
    if (rate >= this.dateEntre) {
      this.User.map((i) => {
        if (tabname === i.nom && tabpre === i.prenom) {
          Userid = i.id;
        }
      })

      this.manaser.OnupdatEntre({
        id_entre: id_entre,
        date_ent: rate,
        heure: zeur,
        lieu: lieu,
        id_pers: Userid
      }).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Modification effectuée avec succès',
          text: `Entretient prévue pour le ${zeur} à ${rate} par ${tabname} ${tabpre} à ${lieu}`

        });
        this.getChange.reset();
      })

    }
    else {
      Swal.fire({
        icon: 'info',
        title: 'Oupss...',
        text: `La date saisir n'est pas correcte`

      });
    }
  }
  Onseah(value: string) {
    this.manaser.filter = value;
  }
  onSwitchpg(el: any) {
    this.manaser.list = el;
    this.route.navigate(['action', 'edit', el.id_stagiaire])
  }
  ngAfterContentChecked() {
    this.filtinit = this.manaser.filter;
    return this.filtinit;
  }
  ngOnDestroy() {
    if (this.subci) {
      this.subci.unsubscribe();
    }
  }
}
