import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ManageService } from './../../service/manage.service';
import { AuthServiceService } from './../../service/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { moveIn, fallIn, moveInLeft } from '../../route.animations';

@Component({
  selector: 'app-auth2',
  templateUrl: './auth2.component.html',
  styleUrls: ['./auth2.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft()]
})
export class Auth2Component implements OnInit {

  isHide = true;
  unlock = false;
  state = '';
  Conneform2: FormGroup | undefined;
  constructor(private AuthSer: AuthServiceService,
    private Manag: ManageService, private auth: AngularFireAuth) { }

  ngOnInit(): void {

    this.Conneform2 = new FormGroup({
      cmdp: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      cmail: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,6}$/)])

    })
  }

  onChangeeyes(): void {
    this.isHide = !this.isHide;
  }
  OnFormeconnect2(): void {

    const mail = this.Conneform2?.value.cmail;
    const pass = this.Conneform2?.value.cmdp;
    this.Manag.Onverifuser(mail).subscribe((data: any) => {
      if (data.res !== 'lose') {
        this.AuthSer.Onsignin(mail, pass).then(() => {
          this.auth.onAuthStateChanged((user) => {
            if (user?.emailVerified === true) {
              this.unlock = true;
              this.AuthSer.OnsetCookie(data);
            }
            else if (user?.emailVerified === false) {
              Swal.fire({
                icon: 'info',
                title: 'Information...',
                text: 'Veillez bien vouloir confirmé le mail avant de vous connectez. '
              });
            }
          })

        })
      }
      else {
        Swal.fire({
          icon: 'info',
          title: 'Information...',
          text: 'Contactez l\'administrateur avant de vous connectez. '
        });

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
