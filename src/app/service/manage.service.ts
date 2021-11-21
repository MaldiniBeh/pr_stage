import Swal from 'sweetalert2';
import { Eta, Peronel, Stag, Stagiaire, Entre, Listentre, History } from './../stage/inter-pipe/all-inter';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  baseUrl = 'http://localhost:8000/api';
  filter: string | undefined;
  stagiaire!: Stagiaire;
  list!: Listentre;


  constructor(private http: HttpClient) { }
  getAll(): Observable<Peronel[]> {
    return this.http.get<Peronel[]>(`${this.baseUrl}/list.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  getAllteach(): Observable<Peronel[]> {
    return this.http.get<Peronel[]>(`${this.baseUrl}/entre/list.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  getAllstag(): Observable<Stagiaire[]> {
    return this.http.get<Stagiaire[]>(`${this.baseUrl}/listesta.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  getHistory(): Observable<History[]> {

    return this.http.get<History[]>(`${this.baseUrl}/historique.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getHistory2(): Observable<History[]> {

    return this.http.get<History[]>(`${this.baseUrl}/history3.php`).pipe(
      map((res: any) => {
        return res['data2'];
      })
    );
  }

  getAllstapro(): Observable<Stagiaire[]> {
    return this.http.get<Stagiaire[]>(`${this.baseUrl}/listepro.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  //listesta.php
  sendSta(user: Stagiaire): Observable<Stagiaire[]> {

    return this.http.post<Stagiaire[]>(`${this.baseUrl}/stains.php`, { data: user })
      .pipe(
        map((res: any) => {
          return res["data"];
        })
      );
  }
  /***send entre */

  sendEntre(user: Entre): Observable<Entre[]> {
    return this.http.post<Entre[]>(`${this.baseUrl}/entre/sendEntre.php`, { data: user })
      .pipe(
        map((res: any) => {
          return res["data"];
        })
      );
  }
  OnactifInac(user: number, valac: number) {
    return this.http.put(`${this.baseUrl}/personel/update_actif.php`, { id: user, valactif: valac });
  }
  updateStapro(user: Stagiaire) {

    return this.http.put(`${this.baseUrl}/updatestpro.php`, { data: user });
  }

  updateSta(user: Stagiaire) {

    return this.http.put(`${this.baseUrl}/updatesta.php`, { data: user });
  }

  sendStapro(user: Stagiaire): Observable<Stagiaire[]> {
    return this.http.post<Stagiaire[]>(`${this.baseUrl}/inspro.php`, { data: user })
      .pipe(
        map((res: any) => {
          return res["data"];
        })
      );
  }
  getEntre(idStg: any, opt?: string) {
    if (opt) {
      let obj = { id: idStg, opt: opt }
      return this.http.post(`${this.baseUrl}/history2.php`, { data: obj })
        .pipe(
          map((res: any) => {
            return res["data"];
          })
        );
    }
    else {
      return this.http.post(`${this.baseUrl}/history2.php`, { data: idStg })
        .pipe(
          map((res: any) => {
            return res["data"];
          })
        );
    }

  }
  getAllet(): Observable<Eta[]> {
    return this.http.get<Eta[]>(`${this.baseUrl}/listeEta.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  Onupdate(user: Peronel, valeur: string) {
    user.profession = valeur;
    return this.http.put(`${this.baseUrl}/upuser.php`, { data: user });
  }
  OnupdatEntre(user: Entre) {
    return this.http.put(`${this.baseUrl}/entre/upEntre.php`, { data: user });
  }
  Ondeleteser(user?: number) {
    return this.http.put(`${this.baseUrl}/deluser.php`, { data: user })
    //return this.http.post(`${this.baseUrl}/deluser.php`, { data: user })
  }
  Ondeletepro(user?: number) {
    return this.http.post(`${this.baseUrl}/deluserpro.php`, { data: user })
    //return this.http.put(`${this.baseUrl}/deluserpro.php`, { data: user });
  }
  Ondeletepro2(user?: number) {
    return this.http.put(`${this.baseUrl}/deluserpro2.php`, { data: user });
    //return this.http.post(`${this.baseUrl}/deluserpro2.php`, { data: user })
  }
  OndeleEntre(entre?: number, stag?: number) {
    let obj = { entre: entre, stag: stag }
    return this.http.put(`${this.baseUrl}/entre/delentre.php`, { data: obj });
  }
  OndeleEta(eta?: number) {
    // return this.http.put(`${this.baseUrl}/delusetat.php`, { data: eta })
    return this.http.post(`${this.baseUrl}/delusetat.php`, { data: eta })
  }

  Onupdatedroit(user: Peronel, valeur: string) {
    user.role = valeur;
    return this.http.put(`${this.baseUrl}/updroit.php`, { data: user });
  }
  /**Observation */
  OnObservation(valeur: string, idst: any, opt?: string) {
    let obj = { valeur: valeur, opt: opt, idst: idst }
    return this.http.put(`${this.baseUrl}/entre/sendEntre.php`, { data: obj });
  }
  OnStag(Stag: Stag) {
    return this.http.put(`${this.baseUrl}/Stag.php`, { data: Stag });
  }
  getetabli(eta: string) {

    return this.http.post(`${this.baseUrl}/etab.php`, { data: eta })
      .pipe(
        map((res: any) => {
          return res["data"];
        })
      );
  }
  OnupdateEta(eta: Eta, value: string) {
    eta.nom = value;
    return this.http.put(`${this.baseUrl}/upuserEta.php`, { data: eta });
  }

  getAllatt(): Observable<Peronel[]> {
    return this.http.get<Peronel[]>(`${this.baseUrl}/entre/entre.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  getAlletntre(): Observable<Listentre[]> {
    return this.http.get<Listentre[]>(`${this.baseUrl}/entre/Alletntre.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  getSate(): Observable<Stag[]> {
    return this.http.get<Stag[]>(`${this.baseUrl}/satis.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  Onverifuser(valeur: any, opt?: string) {
    if (opt === 'opt') {
      let obj = { valeur: valeur, opt: opt }
      return this.http.post(`${this.baseUrl}/auth.php`, { data: obj })
        .pipe(
          map((res: any) => {
            return res["data"];
          })
        );
    }
    else {
      return this.http.post(`${this.baseUrl}/auth.php`, { data: valeur })
        .pipe(
          map((res: any) => {
            return res["data"];
          })
        );
    }

  }

}
