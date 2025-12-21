import { Component } from '@angular/core';
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin(credentials: { email: string; password: string}) {
    this.authService.login(credentials).subscribe({
      next: () => {
        console.log('Login successful')
        this.router.navigate(['/projects']);
      },
      error: (err) => console.error('Login failed', err)
    });
  }
}
