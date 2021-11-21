import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ManageService } from './../../../service/manage.service';
import { Eta } from './../../inter-pipe/all-inter';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn, moveInLeft, moveInLefttab, fallIne } from '../../../route.animations';


@Component({
  selector: 'app-etabli',
  templateUrl: './etabli.component.html',
  styleUrls: ['./etabli.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft(), moveInLefttab(), fallIne()]

})
export class EtabliComponent implements OnInit {
  subs!: Subscription;
  eta!: Eta[];
  valid: any;
  etabipush: Eta[] = [];
  baseUrl = 'http://localhost:8000/api';
  tab = [];
  constructor(private manag: ManageService, private http: HttpClient) { }

  ngOnInit(): void {
    this.subs = this.manag.getAllet().subscribe((toto: Eta[]) => {
      this.eta = toto;
    })
  }
  async onAddeta() {
    const { value: role } = await Swal.fire({
      title: 'Saisir le nom de l\'institue ',
      input: 'text',
      inputPlaceholder: 'Institue',
      showCancelButton: true,
      inputValidator: (value: string) => {
        return new Promise((resolve) => {
          if (value) {
            this.manag
              .getetabli(value).subscribe(
                (res) => {
                  this.ngOnInit();
                }
              );

            Swal.fire({
              icon: 'success',
              title: 'Enrergistrer',
              text: 'Enregistrement de '
                + value +
                ' effectué avec succès'
            });

          }

          else {
            resolve('Veillez entrer l\'institue');
          }
        });
      }
    });


  }
  async Ueta(el: Eta) {

    const { value: role } = await Swal.fire({
      title: 'Modification de l\'institue',
      input: 'text',
      inputPlaceholder: 'Institue',
      showCancelButton: true,
      inputValidator: (value: string) => {
        return new Promise((resolve) => {
          if (value) {
            this.manag
              .OnupdateEta(el, value).subscribe(
                (res) => {
                  this.ngOnInit();
                }
              );

            Swal.fire({
              icon: 'success',
              title: 'Enrergistrer',
              text: 'Enregistrement de '
                + value +
                ' effectué avec succès'
            });

          }

          else {
            resolve('Veillez entrer l\'institue');
          }
        });
      }
    });


  }
  deleta(el: Eta) {
    this.valid = confirm('Voulez-vous vraiment supprimer?');
    if (this.valid === true) {
      this.manag.OndeleEta(el.id).subscribe(
        (res) => {
          this.eta = this.eta.filter(function (item) {
            return item !== el;
          })
        }
      );
    }

  }
}
