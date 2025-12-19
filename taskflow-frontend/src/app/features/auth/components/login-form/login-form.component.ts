import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  @Output() login = new EventEmitter<{ email: string; password: string }>();

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['demo@taskflow.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.login.emit(this.loginForm.value)
    }
  }

}
