import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthInterceptorService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: string;
  motdepasse!: string;
  login!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthInterceptorService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initialForm();
  }
  private initialForm() {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motdepasse: ['', Validators.required],
    });
  }

  OnConnect() {
    if (this.login.valid) {
      //rajouter un findoneby email pour checker l'accès
      let email = this.login.value.email;
      let motdepasse = this.login.value.motdepasse;
      this.authService.login(email, motdepasse).subscribe({
        next: (response: any) => {
          console.log('Réponse complète du serveur :', response);
          if (response && response.accessToken) {
            // Stocker le token dans le localStorage
            localStorage.setItem('access_token', response.accessToken);
            this.showMessageLogIn();
            console.log('Connexion réussie et token stocké!');
            setTimeout(() => {
              this.router.navigate(['/product']);
            }, 2000);
          } else {
            console.error('Token non reçu dans la réponse.');
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la connexion:', error);
          this.showMessageError();
        },
      });
    }
  }

  showMessageLogIn() {
    this.messageService.add({
      severity: 'success',
      summary: 'Félicitations',
      detail: 'Vous êtes connecté, Bienvenue.',
    });
  }

  showMessageError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'E-mail ou mot de passe incorrect',
    });
  }
}
