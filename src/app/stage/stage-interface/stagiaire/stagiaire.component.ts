import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Comp, Eta, Stagiaire } from './../../inter-pipe/all-inter';
import { ManageService } from './../../../service/manage.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { moveIn, fallIn, moveInLeft, moveInLefttab } from '../../../route.animations';



@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft(), moveInLefttab()]
})
export class StagiaireComponent implements OnInit, OnDestroy, AfterContentChecked {
  year: string | undefined;
  filtinit: string | undefined;
  state_ani = '';
  comp!: Comp[];
  state = false;
  state2 = false;
  state3 = true;
  state4 = true;
  filtpro: string | undefined;
  filtadm: string | undefined;
  helpid: any;
  valid: any;
  toggle = true;
  getSta: FormGroup | undefined;
  getta: FormGroup | undefined;
  getto: FormGroup | undefined;
  gette: FormGroup | undefined;
  getty: FormGroup | undefined;
  eta!: Eta[];
  stagiaire!: Stagiaire[];
  stapro !: Stagiaire[];
  subs!: Subscription;
  stapush: Stagiaire[] = [];
  constructor(private manag: ManageService, private router: Router, private route: Router) { }

  ngOnInit(): void {
    this.subs = this.manag.getAllet().subscribe((toto: Eta[]) => {
      this.eta = toto;
    })

    this.subs = this.manag.getAllstag().subscribe((toto: Stagiaire[]) => {
      this.stagiaire = toto;
    });

    this.year = `${new Date().getFullYear() - 1} - ${new Date().getFullYear()}`

    this.getta = new FormGroup({
      anne: new FormControl(null, [Validators.required]),
    });
    this.getto = new FormGroup({
      fil: new FormControl(null, [Validators.required]),
    });
    this.gette = new FormGroup({
      eta: new FormControl(null, [Validators.required]),
    });
    this.getty = new FormGroup({
      sal: new FormControl(null, [Validators.required, Validators.min(1)]),
    });

    this.getSta = new FormGroup({
      tabmat: new FormArray([
        new FormGroup({
          libele: new FormControl(null, [Validators.required]),
          niv: new FormControl(null, [Validators.required]),
        })
      ]),
      nom: new FormControl(null, [Validators.required]),
      naiss: new FormControl(null, [Validators.required]),
      sexe: new FormControl(null, [Validators.required]),
      tel: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9]{8,18}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,6}$/)]),
      situ: new FormControl(null, [Validators.required]),
      typeg: new FormControl(null, [Validators.required]),
      res: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
    });
  }
  OnFormetu() {
    const sal = this.getty?.value.sal;
    const nom = this.getSta?.value.nom;
    const naiss = this.getSta?.value.naiss;
    const sexe = this.getSta?.value.sexe;
    const tel = this.getSta?.value.tel;
    const email = this.getSta?.value.email;
    const situ = this.getSta?.value.situ;
    const res = this.getSta?.value.res;
    const anne = this.getta?.value.anne;
    const prenom = this.getSta?.value.prenom;
    const fil = this.getto?.value.fil;
    const eta = this.gette?.value.eta;
    const tabcmp = this.getSta?.controls.tabmat.value;

    let competence: any[] = [];

    tabcmp.map((i: Comp, val: number) => {
      competence[val] = `${i.libele}: ${i.niv}\n`
    })
    if (!sal) {
      this.manag.sendSta({
        nom: nom, prenom: prenom, date: naiss,
        sexe: sexe, residence: res, email: email,
        tel: tel,
        salaire: 0,
        situation: situ,
        anne: anne,
        fili: fil,
        competence: competence.join(' '),
        id_etabli: eta
      }).subscribe((user: any) => {
        this.stapush.push(user);
        Swal.fire({
          icon: 'success',
          title: 'Enregistrement effectuée avec succès'
        });
        this.ngOnInit();
      })
    }
    else {
      this.manag.sendStapro({
        nom: nom, prenom: prenom, date: naiss,
        sexe: sexe, residence: res, email: email,
        tel: tel,
        situation: situ,
        competence: competence.join(' '),
        salaire: sal
      }).subscribe((user: any) => {
        this.stapush.push(user);
        Swal.fire({
          icon: 'success',
          title: 'Enregistrement effectuée avec succès'
        });
        this.ngOnInit();
      })
    }


  }
  authstate(event: any) {
    switch (event) {
      case 'academique':
        this.state = true;
        this.state2 = !true;
        break;
      case 'professionel':
        this.state = !true;
        this.state2 = true;
        break;
      default:
        this.state = !true;
        this.state2 = !true;
        break;
    }

  }
  // onChastp() {
  //   this.state3 = false;

  // }
  // onChasta() {
  //   this.state3 = true;

  // }

  // delUser(user: Stagiaire) {

  //   this.valid = confirm('Voulez-vous vraiment supprimer?');
  //   if (this.valid === true) {
  //     this.manag.Ondeletepro(user.id).subscribe(
  //       (res) => {
  //         this.stapro = this.stapro.filter(function (item) {
  //           return item !== user;
  //         })
  //       }
  //     );
  //   }
  // }
  delUser2(user: Stagiaire) {

    this.valid = confirm('Voulez-vous vraiment supprimer?');
    if (this.valid === true) {
      this.manag.Ondeletepro2(user.id).subscribe(
        (res) => {
          this.stagiaire = this.stagiaire.filter(function (item) {
            return item !== user;
          })
        }
      );
    }
  }
  // Udroit(user: Stagiaire) {
  //   this.helpid = user.id;
  //   this.state4 = false;
  //   this.getSta = new FormGroup({
  //     nom: new FormControl(user.nom, [Validators.required]),
  //     naiss: new FormControl(user.date, [Validators.required]),
  //     sexe: new FormControl(user.sexe, [Validators.required]),
  //     tel: new FormControl(user.tel, [Validators.required, Validators.minLength(8)]),
  //     email: new FormControl(user.email, [Validators.required, Validators.email]),
  //     situ: new FormControl(user.situation, [Validators.required]),
  //     typeg: new FormControl(null, [Validators.required]),
  //     res: new FormControl(user.residence, [Validators.required]),
  //     prenom: new FormControl(user.prenom, [Validators.required]),
  //   });

  //   this.getty = new FormGroup({
  //     sal: new FormControl(user.salaire, [Validators.required]),
  //   });

  // }
  /***update stagiaire */
  Udroit2(user: Stagiaire) {
    this.toggle = true;
    setTimeout(() => {
      this.toggle = false;
    }, 500);
    this.state4 = false;
    this.helpid = user.id;
    let typeg;
    typeg = +user.salaire > 0 ? 'professionel' : 'academique';
    this.authstate(typeg);
    let ittreable: any[];

    ittreable = user.competence.split('\n');
    for (let i = 0; i < ittreable.length - 1; i++) {
      setTimeout(() => {
        (this.getSta?.get('tabmat') as FormArray).push(new FormGroup({
          libele: new FormControl(ittreable[i].slice(0, ittreable[i].search(':')).trim(), [Validators.required]),
          niv: new FormControl(ittreable[i].slice(ittreable[i].search(':') + 1).trim(), [Validators.required])
        }));
      }, 50);
    }

    this.getSta = new FormGroup({
      tabmat: new FormArray([
        new FormGroup({
          libele: new FormControl(null, [Validators.required]),
          niv: new FormControl(null, [Validators.required]),
        })
      ]),
      nom: new FormControl(user.nom, [Validators.required]),
      naiss: new FormControl(user.date, [Validators.required]),
      sexe: new FormControl(user.sexe, [Validators.required]),
      tel: new FormControl(user.tel, [Validators.required, Validators.minLength(8)]),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      situ: new FormControl(user.situation, [Validators.required]),
      typeg: new FormControl(typeg, [Validators.required]),
      res: new FormControl(user.residence, [Validators.required]),
      prenom: new FormControl(user.prenom, [Validators.required]),
    });
    if (+user.salaire === 0) {
      this.subs = this.manag.getEntre(user.id, 'opt').subscribe((toto: any) => {
        this.getta = new FormGroup({
          anne: new FormControl(toto[0].anne, [Validators.required]),
        });
        this.getto = new FormGroup({
          fil: new FormControl(toto[0].fili, [Validators.required]),
        });
        this.gette = new FormGroup({
          eta: new FormControl(toto[0].id_etabli, [Validators.required]),
        });
      })
    }
    else {
      this.getty = new FormGroup({
        sal: new FormControl(+user.salaire, [Validators.required]),
      });
    }
    setTimeout(() => {
      this.onDeletemat(0);
    }, 50);
  }
  onModife() {
    const sal = this.getty?.value.sal;
    const nom = this.getSta?.value.nom;
    const naiss = this.getSta?.value.naiss;
    const sexe = this.getSta?.value.sexe;
    const tel = this.getSta?.value.tel;
    const email = this.getSta?.value.email;
    const situ = this.getSta?.value.situ;
    const res = this.getSta?.value.res;
    const anne = this.getta?.value.anne;
    const prenom = this.getSta?.value.prenom;
    const fil = this.getto?.value.fil;
    const eta = this.gette?.value.eta;
    let competence: any[] = [];
    const tabcmp = this.getSta?.controls.tabmat.value;
    tabcmp.map((i: Comp, val: number) => {
      competence[val] = `${i.libele}: ${i.niv}\n`
    })

    if (!sal) {
      this.manag.updateSta({
        nom: nom, prenom: prenom, date: naiss,
        sexe: sexe, residence: res, email: email,
        tel: tel,
        salaire: 0,
        situation: situ,
        anne: anne,
        fili: fil,
        competence: competence.join(' '),
        id: parseInt(this.helpid, 10),
        id_etabli: parseInt(eta, 10)
      }).subscribe((res) => {
        this.state4 = true;
        this.ngOnInit();
      })
    }
    else {
      this.manag.updateStapro({
        nom: nom, prenom: prenom, date: naiss,
        sexe: sexe, residence: res, email: email,
        tel: tel,
        situation: situ,
        competence: competence.join(' '),
        id: parseInt(this.helpid, 10),
        salaire: sal
      }).subscribe((res) => {
        this.state4 = true;
        Swal.fire({
          icon: 'success',
          title: 'Modification effectuée avec succès'
        });
        this.ngOnInit();
      })
    }
  }
  Ontoglebtn() {
    this.toggle = !this.toggle;
  }
  async onAddeta() {
    const { value: role } = await Swal.fire({
      title: 'Saisir le nom de l\'institue ',
      input: 'text',
      inputPlaceholder: 'Institue',
      showCancelButton: true,
      inputValidator: (value: string) => {
        return new Promise((resolve) => {
          if (value) {
            this.manag
              .getetabli(value).subscribe(
                (res) => {
                  this.eta.push(res);
                }
              );

            Swal.fire({
              icon: 'success',
              title: 'Enrergistrer',
              text: 'Enregistrement de '
                + value +
                ' effectué avec succès'
            });
          }
          else {
            resolve('Veillez entrer l\'institue');
          }
        });
      }
    });


  }

  // tata(value: string) {
  //   this.changeSearch = 'pro'
  //   this.manag.filter = value;
  // }
  toto(value: string) {
    // this.changeSearch = 'aca'
    this.manag.filter = value;
  }
  ngAfterContentChecked() {
    // if (this.changeSearch === 'pro') {
    //   this.filtinit = this.manag.filter;
    //   return this.filtinit;
    // }

    this.filtinit = this.manag.filter;
    return this.filtinit;

  }
  onEdit(sta: Stagiaire) {
    this.manag.stagiaire = sta
    this.router.navigate(['action', 'meet', sta.id])
  }
  onAddlevel() {
    (this.getSta?.get('tabmat') as FormArray).push(new FormGroup({
      libele: new FormControl(null, [Validators.required]),
      niv: new FormControl(null, [Validators.required])
    }));

  }
  onDeletemat(index: number) {
    (this.getSta?.get('tabmat') as FormArray).removeAt(index);
  }
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
