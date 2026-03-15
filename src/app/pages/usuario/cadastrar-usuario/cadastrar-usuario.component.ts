import { Role } from './../../../shared/models/role';
import { UsuarioService } from './../../../shared/services/usuario.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent {

  registerForm: FormGroup;

  submitting = false;
  error: string | null = null;
  successMessage: string | null = null;

  roles = Object.values(Role);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    //private usuarioService: UsuarioService,
    private authService: AuthService
  ) {


    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [Role.USER]
    });

  }

  handleSubmit() {

  if (this.registerForm.invalid) return;

  this.submitting = true;
  this.error = null;
  this.successMessage = null;

  this.authService.register(this.registerForm.value)
    .subscribe({

      next: () => {
        this.successMessage = 'Usuário criado com sucesso. Você já pode fazer login.';

        setTimeout(() => {
          this.router.navigate(['/login'], {
            state: { registered: true }
          });
        }, 1200);
      },

      error: (err) => {
        const backendMessage = err?.error?.message;
        this.error = backendMessage || 'Erro ao criar usuário. Tente novamente.';
      },

      complete: () => {
        this.submitting = false;
      }

    });
}

/*   handleSubmit() {

    if (this.registerForm.invalid) return;

    this.submitting = true;
    this.error = null;
    this.successMessage = null;

    this.usuarioService.register(this.registerForm.value)
      .subscribe({

        next: () => {

          this.successMessage = 'Usuário criado com sucesso. Você já pode fazer login.';

          setTimeout(() => {
            this.router.navigate(['/login'], {
              state: { registered: true }
            });
          }, 1200);

        },

        error: (err) => {

          const backendMessage = err?.error?.message;

          this.error = backendMessage || 'Erro ao criar usuário. Tente novamente.';
          this.submitting = false;

        },

        complete: () => {
          this.submitting = false;
        }

      });

  } */

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
