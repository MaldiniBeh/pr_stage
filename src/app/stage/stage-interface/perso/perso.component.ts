import { AuthServiceService } from './../../../service/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Peronel } from './../../inter-pipe/all-inter';
import { ManageService } from './../../../service/manage.service';
import { Component, OnDestroy, OnInit, AfterContentChecked, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { moveIn, fallIn, moveInLeft, moveInLefttab, fallIne } from '../../../route.animations';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-perso',
  templateUrl: './perso.component.html',
  styleUrls: ['./perso.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft(), moveInLefttab(), fallIne()]
})
export class PersoComponent implements OnInit, OnDestroy, AfterContentChecked {
  User!: Peronel[];
  valid: any;
  getPer: FormGroup | undefined;
  filtinit: string | undefined;
  subci: Subscription | undefined;
  toggle = true;
  toggle2 = true;
  toggle3 = true;
  state_ani = '';
  getactif: any;
  @ViewChild('changeActif') Active!: ElementRef;

  constructor(private manaser: ManageService,
    private authSer: AuthServiceService, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.subci = this.manaser.getAll().subscribe((toto: Peronel[]) => {
      this.User = toto;

    });

    this.getPer = new FormGroup({
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      insmail: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,6}$/)]),
      mdp: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
  // Ontoggle2(el: Peronel) {
  //   this.toggle2 = !this.toggle2
  // }

  Oncheckact(el: number, el2: number) {

    if (+el2 == 0) {

      this.manaser.OnactifInac(+el, +el2 + 1).subscribe(() => {
        this.ngOnInit();
        Swal.fire({
          html: '<div class="alert alert-success text-center" role="alert><i class="fa font-weight-bolder fa-check m-2 text-success  fa-2x"></i> Personel actif</div>',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        })
      });

      // this.Active.nativeElement.innerHTML = '<div class="alert alert-success text-center" role="alert" [@fallIne]="state_ani"><i class="fa font-weight-bolder fa-check m-2 text-success  fa-2x"></i> Personel actif</div>';
      // setTimeout(() => { this.Active.nativeElement.innerHTML = '' }, 1000)
    }

    else {
      this.manaser.OnactifInac(+el, +el2 - 1).subscribe(() => {
        this.ngOnInit();
        Swal.fire({
          html: '<div class="alert alert-danger text-center" role="alert><i class="fa font-weight-bolder fa-exclamation-triangle text-danger fa-2x"></i> Personel inactif</div>',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        });
      });

      // this.Active.nativeElement.innerHTML = '<div class="alert alert-danger text-center"  role="alert"><i class="fa font-weight-bolder fa-exclamation-triangle m-2 text-danger  fa-2x"></i> Personel inactif</div>'; setTimeout(() => { this.Active.nativeElement.innerHTML = '' }, 1000)
    }

  }

  OnFormPerso() {
    const nom = this.getPer?.value.nom;
    const prenom = this.getPer?.value.prenom;
    const insmail = this.getPer?.value.insmail;
    const mdp = this.getPer?.value.mdp;
    this.authSer.Onsignup(insmail, mdp, nom, prenom, 'perso').then(() => {
      this.getPer?.reset();
      this.ngOnInit();
    })
  }
  delUser(user: Peronel) {

    this.valid = confirm('Voulez-vous vraiment supprimer?');
    if (this.valid === true) {
      this.manaser.Ondeleteser(user.id).subscribe(
        (res) => {
          this.User = this.User.filter(function (item) {
            return item !== user;
          })
        }
      );
    }
  }
  Ontoglebtn() {
    this.toggle = !this.toggle;
  }

  async Uprofes(user: Peronel) {
    const { value: role } = await Swal.fire({
      title: 'Selectionnez la Profession',
      input: 'select',
      inputOptions: {
        'Profession': {
          Ingenieur: 'Ingenieur',
          Secretaire: 'Secrétaire',
          Developpeur: 'Developpeur'
        }
      },
      inputPlaceholder: 'Selectionnez la Profession',
      showCancelButton: true,
      inputValidator: (value: string) => {
        return new Promise((resolve) => {
          if (value) {
            this.manaser
              .Onupdate(user, value).subscribe()

            Swal.fire({
              icon: 'success',
              title: 'Modification',
              text: 'Attribution du Profession '
                + value +
                ' effectué avec succès'
            });

          } else {
            resolve('Veillez choisie la Profession');
          }
        });
      }
    });


  }

  async Udroit(user: Peronel) {
    const { value: role } = await Swal.fire({
      title: 'Selectionnez le droit',
      input: 'select',
      inputOptions: {
        'Role': {
          AdminGenerale: 'Admin Générale',
          Simple: 'Simple'
        }
      },
      inputPlaceholder: 'Selectionnez le droit',
      showCancelButton: true,
      inputValidator: (value: string) => {
        return new Promise((resolve) => {
          if (value === 'AdminGenerale') {
            this.manaser
              .Onupdatedroit(user, value).subscribe(
                (res) => {
                  this.User = this.User.filter(function (item) {
                    return item !== user;
                  })
                }
              );

            Swal.fire({
              icon: 'success',
              title: 'Modification',
              text: 'Attribution du Rôle '
                + value +
                ' effectué avec succès'
            });

          }
          else if (value === 'Simple') {
            Swal.fire({
              icon: 'success',
              title: 'Modification',
              text: 'Attribution du Rôle '
                + value +
                ' effectué avec succès'
            });
          }
          else {
            resolve('Veillez choisie un rôle');
          }
        });
      }
    });
  }
  // async onAddPerso() {
  //   const { value: role } = await Swal.fire({
  //     title: 'Saisir le nom de l\'institue ',
  //     input: 'text',
  //     inputPlaceholder: 'Institue',
  //     showCancelButton: true,
  //     inputValidator: (value: string) => {
  //       return new Promise((resolve) => {
  //         if (value) {
  //           console.log(value);
  //         }
  //       });
  //     }
  //   })
  // }
  toto(value: string) {
    this.manaser.filter = value;
  }
  ngAfterContentChecked() {
    this.filtinit = this.manaser.filter;
    return this.filtinit;
  }
  ngOnDestroy() {
    if (this.subci) { this.subci.unsubscribe() }
  }

}

