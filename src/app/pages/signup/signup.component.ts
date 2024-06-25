import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from '../../services/signup.service';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private signupService: SignupService,
    private toastService: ToastrService
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  submit(){
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      this.signupService.register(name, email, password).subscribe({
        next: () => {
          this.toastService.success("Cadastro realizado com sucesso!");
          this.router.navigate(["login"]);
        },
        error: (error) => {
          console.error('Erro durante o cadastro:', error);
          this.toastService.error("Falha ao cadastrar usuário. Por favor, tente novamente mais tarde.");
        }
      });
    } else {
      this.toastService.error("Por favor, preencha todos os campos corretamente.");
    }
  }

  navigate(){
    this.router.navigate(["login"]);
  }
}