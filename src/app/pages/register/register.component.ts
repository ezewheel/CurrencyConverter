import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  invalidUsername = false;
  invalidName = false;
  invalidPassword = false;

  async register(registerForm: NgForm){
    const {username, name, password} = registerForm.value;
    this.invalidUsername = !username;
    this.invalidName = !name;
    this.invalidPassword = !password;
    const registerData = {username: username, name: name, password: password};
    const res = await this.authService.register(registerData)
    if(res?.message == "Success") this.router.navigate(['/converter']);
  }
}
