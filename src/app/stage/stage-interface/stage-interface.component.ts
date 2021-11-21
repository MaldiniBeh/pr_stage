import { AuthServiceService } from './../../service/auth-service.service';
import { ManageService } from './../../service/manage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-stage-interface',
  templateUrl: './stage-interface.component.html',
  styleUrls: ['./stage-interface.component.scss']
})
export class StageInterfaceComponent implements OnInit {
  User!: any;
  role!: any;
  @ViewChild('modalcontainer') modalcontainer!: ElementRef;
  @ViewChild('body') body!: ElementRef;
  constructor(private ngxscrip: ScriptService,
    private manag: ManageService,
    private auth: AngularFireAuth,
    private cookie: CookieService,
    private authSer: AuthServiceService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.User = this.cookie.get('name');
      this.role = this.cookie.get('role');
    }, 500);

  }
  OnpowerToggle() {
    this.modalcontainer
      .nativeElement
      .classList.add('seven');
    this.body.nativeElement.classList.add('modal-active');
  }
  OnadminNologout() {
    this.modalcontainer
      .nativeElement
      .classList.add('out');
    this.body.nativeElement.classList.remove('modal-active');
  }

  OnadminLogout() {
    this.cookie.delete('name');
    this.cookie.delete('role');
    return this.role === 'AdminGenerale' ? this.authSer.Onlogout('adm') : this.authSer.Onlogout();
  }

}
