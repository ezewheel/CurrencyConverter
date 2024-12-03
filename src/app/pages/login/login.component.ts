import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  invalidUsername = false;
  invalidPassword = false;

  async login(loginForm: NgForm){
    const {username, password} = loginForm.value;
    this.invalidUsername = !username;
    this.invalidPassword = !password;
    const loginData = {username: username, password: password};
    const res = await this.authService.login(loginData)
    if(res?.message == "Success") this.router.navigate(['/converter'])
  }
}
