import { AuthServiceService } from './../../service/auth-service.service';
import { Peronel } from './../inter-pipe/all-inter';
import { ManageService } from './../../service/manage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';

@Component({
  selector: 'app-stage-interface',
  templateUrl: './stage-interface.component.html',
  styleUrls: ['./stage-interface.component.scss']
})
export class StageInterfaceComponent implements OnInit {
  User!: Peronel[];
  display: any;
  @ViewChild('modalcontainer') modalcontainer!: ElementRef;
  @ViewChild('body') body!: ElementRef;
  constructor(private ngxscrip: ScriptService, private manag: ManageService,
    private auth: AngularFireAuth, private authSer: AuthServiceService) { }

  ngOnInit(): void {
    this.User = this.authSer.User;
    console.log(this.User);

    // this.auth.onAuthStateChanged((user) => {
    //   this.manag.Onverifuser(user?.email, 'opt2').subscribe((data: Peronel[]) => {
    //     this.User = data;
    //     this.display = user?.displayName;
    //   });
    // })

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
    return this.User[0].role === 'AdminGenerale' ? this.authSer.Onlogout('adm') : this.authSer.Onlogout();
  }

}
