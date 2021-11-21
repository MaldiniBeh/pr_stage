import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Peronel } from './../../inter-pipe/all-inter';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ManageService } from './../../../service/manage.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Listentre } from '../../inter-pipe/all-inter';
import { listanime } from '../../../route.animations';

@Component({
  selector: 'app-entre',
  templateUrl: './entre.component.html',
  styleUrls: ['./entre.component.scss'],
  animations: [listanime()]
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
  delEntr(entre: Listentre) {
    let cnf = confirm('Voulez-vous vraiment supprimer?');
    if (cnf === true) {
      this.manaser.OndeleEntre(entre.id_entre, entre.id_stagiaire).subscribe(
        (res) => {
          this.Entre = this.Entre.filter(function (item) {
            return item !== entre;
          })
        }
      );
    }
  }
  Onseah(value: string) {
    this.manaser.filter = value;
  }
  async onSwitchpg(el: Listentre) {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      title: 'Vos observations',
      inputPlaceholder: 'Observation...',
      inputAttributes: {
        'aria-label': 'Observation'
      },
      showCancelButton: true,
      inputValidator: (value: string) => {
        return new Promise((resolve) => {
          if (value) {
            console.log(value + '' + el.id_entre);

            this.manaser
              .OnObservation(value, el.id_entre, 'opt').subscribe(
                () => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Observation ajoutée'

                  }).then(() => {
                    this.manaser.list = el;
                    this.route.navigate(['action', 'edit', el.id_stagiaire])
                  });

                }
              );

          }
          else {
            resolve('Champ vide');
          }
        });
      }

    })

  }
  Onnavigate(el: Listentre) {
    this.manaser.list = el;
    console.log(el);
    console.log(this.manaser.list);

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
