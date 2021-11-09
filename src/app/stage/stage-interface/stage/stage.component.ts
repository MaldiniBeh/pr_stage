import { Subscription } from 'rxjs';
import { ManageService } from './../../../service/manage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { History } from '../../inter-pipe/all-inter';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit, OnDestroy {
  Histo!: History[];
  subs!: Subscription;
  typestage: any;
  constructor(private manage: ManageService) { }

  ngOnInit(): void {
    this.subs = this.manage.getHistory().subscribe((toto: History[]) => {
      this.Histo = toto;
      this.Histo.map((i) => {
        return this.typestage = i.salaire != null ? 'Professionel' : 'Académique'
      })
    })

  }
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
