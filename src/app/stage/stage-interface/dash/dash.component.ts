import { Subscription } from 'rxjs';
import { Stag } from './../../inter-pipe/all-inter';
import { ManageService } from './../../../service/manage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { moveInLefte, fallIne } from '../../../route.animations';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
  animations: [moveInLefte(), fallIne()]
})
export class DashComponent implements OnInit, OnDestroy {
  ListeStage!: Stag[];
  state_ani = '';
  Subs!: Subscription;
  Cours = 0;
  Wait = 0;
  Done = 0;
  constructor(private manage: ManageService) { }

  ngOnInit(): void {
    this.Subs = this.manage.getSate().subscribe((toto: Stag[]) => {
      this.ListeStage = toto;
      this.ListeStage.map((i) => {
        switch (i.etat_sta) {
          case 'attente':
            this.Wait++;
            break;
          case 'cours':
            this.Cours++;
            break;
          case 'effectue':
            this.Done++;
            break;

          default:
            break;
        }

      })
    });
  }

  ngOnDestroy() {
    if (this.Subs) {
      this.Subs.unsubscribe();
    }
  }

}
