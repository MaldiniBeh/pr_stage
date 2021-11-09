import { Peronel } from './../stage/inter-pipe/all-inter';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isready = false;
  userislog = false;
  stockuid: any;
  userins: Peronel[] = [];
  baseUrl = 'http://localhost:8000/api';
  User!: Peronel[];
  Users: Peronel = {
    nom: '',
    prenom: '',
    profession: '',
    email: '',
    role: ''
  };
  constructor(private auth: AngularFireAuth, private router: Router, private http: HttpClient) {
    this.OnstatusUser();
    this.stockuid = this.auth.onAuthStateChanged((user) => {
      user?.uid;
    });
  }

  Onsignin(email: string, password: string) {
    // tslint:disable-next-line: ban-types
    // return new Promise((resolve, reject) => {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(usersigin => {
        // tslint:disable-next-line: max-line-length
        if (usersigin.user && usersigin.user?.emailVerified === true) {
          /***auth */
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: 'success',
            title: 'Connectez avec succèss'
          }).then(() => {
            this.router.navigate(['action']);
          });

          /***auth end */
          // this.tab = this.firestore.collection('User').doc(usersigin.user?.uid).get().subscribe((userid) => {
          //   const data = userid.data() as User;
          //   switch (data.typeCount) {
          //     case 'AdminG':
          //       const Toast = Swal.mixin({
          //         toast: true,
          //         position: 'top-end',
          //         showConfirmButton: false,
          //         timer: 3000,
          //         timerProgressBar: true,
          //         didOpen: (toast) => {
          //           toast.addEventListener('mouseenter', Swal.stopTimer);
          //           toast.addEventListener('mouseleave', Swal.resumeTimer);
          //         }
          //       });
          //       Toast.fire({
          //         icon: 'success',
          //         title: 'Connectez avec succèss'
          //       }).then(() => {
          //         this.router.navigate(['hostAdmin']);

          //       });

          //       break;

          //     case 'Acceuil':
          //       Swal.fire({
          //         icon: 'info',
          //         title: 'Information...',
          //         text: 'Acceuil'
          //       });
          //       break;
          //     case 'Infirmier':
          //       Swal.fire({
          //         icon: 'info',
          //         title: 'Information...',
          //         text: 'Infirmier'
          //       });
          //       break;
          //     case 'Prélèvement':
          //       Swal.fire({
          //         icon: 'info',
          //         title: 'Information...',
          //         text: 'Prélèvement'
          //       });
          //       break;
          //     default:
          //       Swal.fire({
          //         icon: 'info',
          //         title: 'Information...',
          //         text: 'Contactez l\'administrateur avant de vous connectez. '
          //       });
          //       this.Onlogout();
          //       break;
          //   }
          // });
        }

      })
      .catch((error: Error) => {
        console.log(error.message);
        switch (error.message) {

          case 'Firebase: A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred. (auth/network-request-failed).':
            Swal.fire(
              'Vous n\'êtes pas connecter a Internet?',
              'Verifier votre connection et réessayer',
              'question'
            );

            break;
          case 'Firebase: The operation has timed out. (auth/timeout).':
            Swal.fire(
              'Vous n\'êtes pas connecter a Internet?',
              'Verifier votre connection et réessayer',
              'question'
            );
            // reject();
            break;
          case 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).':

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Vous n\'êtes pas autoriser à effectuer une opération. Inscrivez-vous ou vérifiez bien vos identifants!'

            });
            break;
          case 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).':
            Swal.fire({
              icon: 'info',
              title: 'Information...',
              text: 'Le mot de passe saisir n\'est pas correcte. Si vous l\'avez oublié veillez appuyer sur mot de passe oublié'

            });
            break;
          case 'Firebase:Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
            Swal.fire({
              icon: 'warning',
              title: 'Trop de tentation',
              text: 'L\'accès à ce compte est temporairement bloqué en raison de nombreuses tentatives de connexion infructueuses.Vous pouvez le restaurer immédiatement en réinitialisant votre mot de passe ou vous pouvez réessayer plus tard'

            });
            break;

          default:
            break;
        }
      });
    // });
  }
  Onsaveser(user: Peronel): Observable<Peronel[]> {
    return this.http.post<Peronel[]>(`${this.baseUrl}/sendlogin.php`, { data: user })
      .pipe(
        map((res: any) => {
          return res["data"];
        })
      );
  }

  Onsignup(email: string, password: string, name: string, last: string, opt?: string) {

    return this.auth.createUserWithEmailAndPassword(email, password).then(result => {
      result.user?.updateProfile({ displayName: `${name.toUpperCase()} ${last.replace(last.charAt(0), last.charAt(0).toUpperCase())}` });
      this.Users = { nom: name, prenom: last, email: email, profession: 'Non connu', role: 'AdminGenerale' }
      this.Onsaveser(this.Users).subscribe((user: any) => {
        this.userins.push(user)
      })
      if (result.user?.sendEmailVerification()) {
        let chng = 'Un mail a été envoyé a cette adresse.Veillez confirmé pour continuer';
        if (opt === 'perso') {
          chng = 'Un mail a été envoyé a ce personel.Veillez le contacté pour la validation du mail avant la connexion'
        }
        Swal.fire({
          title: chng,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        });
      }
      else {
        Swal.fire({
          icon: 'info',
          title: 'Avez-vous recu le mail?',
          text: 'Apuyer sur ce button pour recevoir un nouveau',
          confirmButtonText: 'J\'ai pas recu.Renvoyer'
        }).then(btnconf => {
          if (btnconf.isConfirmed) {
            result.user?.sendEmailVerification();
            Swal.fire(
              'Email envoyé!',
              'Vérifier votre boîte mail',
              'success'
            );
          }
        });
      }
    })
      .catch((error: Error) => {
        console.log(error.message);

        switch (error.message) {
          case 'Firebase: A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred. (auth/network-request-failed).':
            Swal.fire(
              'Vous n\'êtes pas connecter a Internet?',
              'Verifier votre connection et réessayer',
              'question'
            );
            break;
          case 'Firebase: The operation has timed out. (auth/timeout).':
            Swal.fire(
              'Vous n\'êtes pas connecter a Internet?',
              'Verifier votre connection et réessayer',
              'question'
            );
            break;
          case 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).':
            Swal.fire({
              icon: 'error',
              title: 'Désolé...',
              text: 'Cette addresse est déjà utilisée.Veuillez réessayer à nouveau',
            });
            break;
          default:
            break;
        }
      });

  }

  OnpasswordRecover(email: string): void {
    this.auth.sendPasswordResetEmail(email)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Envoyé...',
          text: 'Consulté votre boîte Email!'

        });
      })
      .catch((error: Error) => {
        switch (error.message) {
          case 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.':
            Swal.fire(
              'Vous n\'êtes pas connecter a Internet?',
              'Verifier votre connection et réessayé',
              'question'
            );
            break;
          case 'Firebase: The operation has timed out. (auth/timeout).':
            Swal.fire(
              'Vous n\'êtes pas connecter a Internet?',
              'Verifier votre connection et réessayer',
              'question'
            );

            break;
          case 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).':
            Swal.fire({
              icon: 'info',
              title: 'Information...',
              text: 'L\'adresse email saisir ne correspond à aucune addresse. Veuillez réessayer '

            });
            break;
          default:
            break;
        }

      });
  }

  OnstatusUser(): void {
    this.auth.onAuthStateChanged(user => {
      this.stockuid = user?.uid;
      this.isready = true;
      if (user === null) {
        this.userislog = false;
      } else {

        if (user.emailVerified) {
          this.userislog = true;
        } else {
          this.userislog = false;
        }
      }
    });
  }

  Onlogout(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['']);
    });

  }
  // tslint:disable-next-line: typedef
  isAuthticated() {
    return this.userislog;
  }

}
