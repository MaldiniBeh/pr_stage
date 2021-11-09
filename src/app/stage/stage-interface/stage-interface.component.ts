import { Peronel } from './../inter-pipe/all-inter';
import { ManageService } from './../../service/manage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';

@Component({
  selector: 'app-stage-interface',
  templateUrl: './stage-interface.component.html',
  styleUrls: ['./stage-interface.component.scss']
})
export class StageInterfaceComponent implements OnInit {
  User!: Peronel[];
  display: any;
  constructor(private ngxscrip: ScriptService, private manag: ManageService,
    private auth: AngularFireAuth) {
    this.ngxscrip.loadScript('/assets/js/script.js').subscribe(() => {
      console.log('finis');
    })
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      this.manag.Onverifuser(user?.email, 'opt2').subscribe((data: Peronel[]) => {
        this.User = data;
        console.log(this.User);
        this.display = user?.displayName;
      });
    })

  }

}
