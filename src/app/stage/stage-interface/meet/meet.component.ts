import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Stagiaire, Peronel } from './../../inter-pipe/all-inter';
import { ManageService } from './../../../service/manage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss']
})
export class MeetComponent implements OnInit, OnDestroy {
  getEntre!: FormGroup;
  detail!: Stagiaire;
  User!: Peronel[];
  typestage = false;
  dateEntre: any;
  subci: Subscription | undefined;
  constructor(private manag: ManageService, private route: Router) { }

  ngOnInit(): void {
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
    this.subci = this.manag.getAllteach().subscribe((toto: Peronel[]) => {
      this.User = toto;
    });
    this.getEntre = new FormGroup({
      date_e: new FormControl(toto, [Validators.required]),
      heur_e: new FormControl(null, [Validators.required]),
      lieu_e: new FormControl(null, [Validators.required]),
      encad: new FormControl(null, [Validators.required]),
    })
    this.detail = this.manag.stagiaire;
    if (!this.detail.salaire) {
      this.typestage = true;
    }
  }
  OnFormEntre() {
    const date_e = this.getEntre?.value.date_e;
    const heur_e = this.getEntre?.value.heur_e
    const lieu_e = this.getEntre?.value.lieu_e
    const encad = this.getEntre?.value.encad
    const tabname = encad.split(' ')[0];
    const tabpre = encad.split(' ')[1];
    let Userid;
    if (date_e >= this.dateEntre) {
      this.User.map((i) => {
        console.log(i);
        if (tabname === i.nom && tabpre === i.prenom) {
          Userid = i.id;
        }
      })
      this.manag.sendEntre({
        date_ent: date_e,
        heure: heur_e,
        lieu: lieu_e,
        id_stagiaire: this.detail.id,
        id_pers: Userid
      }).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Entretien programmé avec succès',
          text: `Le stagiare ${this.detail.nom} ${this.detail.prenom} est programmé pour le ${date_e} à ${heur_e} par ${tabname} ${tabpre}`

        });
        this.ngOnInit();
        this.route.navigate(['action', 'entre'])
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

  ngOnDestroy() {
    if (this.subci) {
      this.subci.unsubscribe();
    }
  }

}
