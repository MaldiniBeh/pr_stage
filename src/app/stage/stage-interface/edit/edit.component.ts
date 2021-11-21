import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Stagiaire, Listentre, Peronel } from './../../inter-pipe/all-inter';
import { ManageService } from './../../../service/manage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  detail!: Listentre;
  subsId!: Subscription;
  getId: any;
  dateEntre1: any;
  User!: Peronel[];
  dateEntre2: any;
  getStanext: FormGroup | undefined;
  getStatheme!: FormGroup;
  changeState: any;
  changeval: any;
  constructor(private manag: ManageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.changeState = 'En cours';
    this.changeval = 'cours'
    this.subsId = this.manag.getAllteach().subscribe((toto: Peronel[]) => {
      this.User = toto;
    });
    let tata = new Date().getDate();
    let toto;
    let stoto;
    if (tata.toString().length > 1) {
      toto = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
      stoto = `${new Date().getFullYear()}-${new Date().getMonth() + 2}-${new Date().getDate()}`
      this.dateEntre1 = toto;
      this.dateEntre2 = stoto;
    }
    else {
      toto = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-0${new Date().getDate()}`
      stoto = `${new Date().getFullYear()}-${new Date().getMonth() + 2}-0${new Date().getDate()}`
      this.dateEntre1 = toto;
      this.dateEntre2 = stoto;
    }
    this.detail = this.manag.list;
    this.getStanext = new FormGroup({
      ddep: new FormControl(toto, [Validators.required]),
      dfin: new FormControl(stoto, [Validators.required]),
      etat: new FormControl(this.changeval, [Validators.required]),
      encad: new FormControl(null, [Validators.required]),
      theme: new FormControl(null)
    });


  }
  OnFormVal() {
    this.subsId = this.route.params
      .subscribe((val: Params) => { this.getId = val.id; })
    const theme = this.getStanext?.value.theme;
    const ddep = this.getStanext?.value.ddep;
    const dfin = this.getStanext?.value.dfin;
    const etat = this.getStanext?.value.etat;
    const encad = this.getStanext?.value.encad;
    const tabname = encad.split(' ')[0];
    const tabpre = encad.split(' ')[1];
    //console.log(`${theme} ${ddep} ${dfin} ${etat} ${encad}`);
    let Userid;

    this.User.map((i) => {
      if (tabname === i.nom && tabpre === i.prenom) {
        Userid = i.id;
      }
    })
    if (ddep >= dfin || ddep < this.dateEntre1 || dfin < this.dateEntre2) {
      Swal.fire({
        icon: 'info',
        title: 'Oupss...',
        text: 'Veillez verifier les dates '
      });
    }
    else if (ddep > this.dateEntre1 && etat === 'cours') {
      Swal.fire({
        icon: 'info',
        title: 'Oupss...',
        text: 'Selectionnez l\'état avant de continuer '
      });
    }
    else {
      this.manag.OnStag({ theme: theme, etat_sta: etat, dure_d: ddep, dure_f: dfin, id_stagiaire: this.getId, id_pers: Userid }).subscribe(() => {

        Swal.fire({
          icon: 'success',
          title: 'Opération éffectuée avec succès',
          text: `Le stagiare ${this.detail.nom} ${this.detail.prenom} est programmé pour un stage du ${ddep} au ${dfin}`

        });

        this.ngOnInit();
        this.router.navigate(['action', 'stagiaire']);
      });
    }

  }
  OngetDate(event: any, eve: any) {
    if (event > this.dateEntre1) {
      this.changeval = 'attente';
      this.changeState = 'En attente'
    }
    else if (event === this.dateEntre1) {
      this.changeval = 'cours';
      this.changeState = 'En cours'
    }
    // this.getStanext = new FormGroup({
    //   ddep: new FormControl(event, [Validators.required]),
    //   etat: new FormControl(this.changeval, [Validators.required]),
    //   encad: new FormControl(null, [Validators.required]),
    //   theme: new FormControl(null)
    // });

  }
  ngOnDestroy() {
    if (this.subsId) {
      this.subsId.unsubscribe();

    }
  }
}
