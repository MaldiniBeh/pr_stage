import { MeetComponent } from './stage/stage-interface/meet/meet.component';
import { EditComponent } from './stage/stage-interface/edit/edit.component';
import { DashComponent } from './stage/stage-interface/dash/dash.component';
import { AuthGuardGuard } from './stage/auth/auth-guard.guard';
import { EtabliComponent } from './stage/stage-interface/etabli/etabli.component';
import { ProfileComponent } from './stage/stage-interface/profile/profile.component';
import { PersoComponent } from './stage/stage-interface/perso/perso.component';
import { EntreComponent } from './stage/stage-interface/entre/entre.component';
import { StageComponent } from './stage/stage-interface/stage/stage.component';
import { StagiaireComponent } from './stage/stage-interface/stagiaire/stagiaire.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { StageInterfaceComponent } from './stage/stage-interface/stage-interface.component';
import { AuthComponent } from './stage/auth/auth.component';
import { Auth2Component } from './stage/auth2/auth2.component';
import { FortoforComponent } from './stage/fortofor/fortofor.component';

const routes: Routes = [
  { path: '', component: Auth2Component, pathMatch: 'full' },
  { path: 'romeAdm', component: AuthComponent },

  {
    path: 'action',
    component: StageInterfaceComponent,
    canActivate: [AuthGuardGuard],
    children: [
      { path: '', component: DashComponent },
      { path: 'stagiaire', component: StagiaireComponent },
      { path: 'histo', component: StageComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'meet/:id', component: MeetComponent },
      { path: 'entre', component: EntreComponent },
      { path: 'perso', component: PersoComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'eta', component: EtabliComponent }
    ]

  },
  { path: 'not-found', component: FortoforComponent },
  { path: '**', redirectTo: 'not-found' }

];
//, canActivate: [AuthGuardGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
