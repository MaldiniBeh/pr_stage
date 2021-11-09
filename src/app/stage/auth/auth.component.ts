import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ManageService } from './../../service/manage.service';
import { AuthServiceService } from './../../service/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { moveIn, fallIn, moveInLeft } from '../../route.animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft()]
})
export class AuthComponent implements OnInit {
  isLog = true;
  isHide = true;
  unlock = false;
  state = '';
  Conneform: FormGroup | undefined;
  Insform: FormGroup | undefined;
  constructor(private AuthSer: AuthServiceService,
    private Manag: ManageService, private auth: AngularFireAuth) { }

  ngOnInit(): void {

    this.Conneform = new FormGroup({
      cmdp: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      cmail: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,6}$/)])

    })
    this.Insform = new FormGroup({
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      insmail: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,6}$/)]),
      mdp: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
  Onswichmode(): void {
    this.isLog = !this.isLog;
  }
  onChangeeyes(): void {
    this.isHide = !this.isHide;
  }
  OnFormeconnect(): void {

    const mail = this.Conneform?.value.cmail;
    const pass = this.Conneform?.value.cmdp;
    this.Manag.Onverifuser(mail, 'opt').subscribe((data: any) => {
      if (data.res !== 'lose') {
        this.AuthSer.Onsignin(mail, pass).then(() => {
          this.unlock = true;
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Accès refusé...',
          text: 'Vous n\'avez pas accès. Contactez l\'administrateur avant de vous connectez.'
        });

      }
    })


  }
  OnFormelogin(): void {
    const mail = this.Insform?.value.insmail;
    const pass = this.Insform?.value.mdp;
    const name = this.Insform?.value.nom;
    const last = this.Insform?.value.prenom;
    this.AuthSer.Onsignup(mail, pass, name, last).then(() => {
      if (this.auth.user) {
        this.Insform?.reset();
        this.isLog = true;
      }
    })
  }
  async Onforgetpass(): Promise<void> {
    const { value: email } = await Swal.fire({
      title: 'Saisir email de réinitialisation du mot de passe. ',
      input: 'email',
      inputPlaceholder: 'Entrer addresse Email'
    });

    if (email) {
      this.AuthSer.OnpasswordRecover(email);
    }
  }
}
