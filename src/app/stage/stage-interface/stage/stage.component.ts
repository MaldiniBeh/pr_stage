import { Subscription } from 'rxjs';
import { ManageService } from './../../../service/manage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { History } from '../../inter-pipe/all-inter';
import { listanime } from '../../../route.animations';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
  animations: [listanime()]
})
export class StageComponent implements OnInit, OnDestroy {
  Histo1!: History[];
  Histo2!: History[];
  nameEntre = '';
  lastEntre = '';
  teachEntre = '';
  Obsvation = '';
  subs!: Subscription;
  typestage: any;
  takeEntre: any;
  state3 = true;
  constructor(private manage: ManageService) { }

  ngOnInit(): void {
    this.subs = this.manage.getHistory().subscribe((toto: History[]) => {
      this.Histo1 = toto;
    })
    this.subs = this.manage.getHistory2().subscribe((toto: History[]) => {
      this.Histo2 = toto;
    })

  }

  OnsetEntr(id: number) {
    this.subs = this.manage.getEntre(+id).subscribe((res: any) => {
      this.lastEntre = res[0].prenom_entre;
      this.nameEntre = res[0].nom_entre;
      this.teachEntre = res[0].profe_entre;
      this.Obsvation = res[0].observation;
    })
  }
  onChangFichestp() {
    this.state3 = false;

  }
  onChangFichesta() {
    this.state3 = true;

  }
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
