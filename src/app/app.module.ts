
import { AuthGuardGuard } from './stage/auth/auth-guard.guard';
import { EtabliComponent } from './stage/stage-interface/etabli/etabli.component';
import { ProfileComponent } from './stage/stage-interface/profile/profile.component';
import { PersoComponent } from './stage/stage-interface/perso/perso.component';
import { EntreComponent } from './stage/stage-interface/entre/entre.component';
import { StageComponent } from './stage/stage-interface/stage/stage.component';
import { StagiaireComponent } from './stage/stage-interface/stagiaire/stagiaire.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './stage/auth/auth.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { StageInterfaceComponent } from './stage/stage-interface/stage-interface.component';
import { environment } from 'src/environments/environment.prod';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashComponent } from './stage/stage-interface/dash/dash.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ResarchPipe } from './stage/inter-pipe/resarch.pipe';
import { Reash2Pipe } from './stage/inter-pipe/reash2.pipe';
import { EtabPipe } from './stage/inter-pipe/etab.pipe';
import { EditComponent } from './stage/stage-interface/edit/edit.component';
import { MeetComponent } from './stage/stage-interface/meet/meet.component';
import { ReashEntrePipe } from './stage/inter-pipe/reash-entre.pipe';
import { Auth2Component } from './stage/auth2/auth2.component';
import { FortoforComponent } from './stage/fortofor/fortofor.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    StageInterfaceComponent,
    StagiaireComponent,
    StageComponent,
    EntreComponent,
    PersoComponent,
    ProfileComponent,
    EtabliComponent,
    DashComponent,
    ResarchPipe,
    Reash2Pipe,
    EtabPipe,
    EditComponent,
    MeetComponent,
    ReashEntrePipe,
    Auth2Component,
    FortoforComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      "radius": 100,
      "maxPercent": 100,
      "space": -10,
      "outerStrokeWidth": 20,
      "outerStrokeColor": "#4882c2",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "title": "UI",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
    }),
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
