import { Injectable } from '@angular/core';
import { AuthResponse, DecodedToken, LoginCredentials, RegisterCredentials } from '../../interfaces/auth';
import { apiUrl } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decodeToken(token: string){
    const decodedJwtData = window.atob(token.split('.')[1]);
    return JSON.parse(decodedJwtData);
  }

  async login(loginData: LoginCredentials){
    const res = await fetch(apiUrl + 'auth',{
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(loginData),
    })
    
    if(res.status !== 200) return;

    const resJson: AuthResponse = await res.json();
    const decodedToken: DecodedToken = this.decodeToken(resJson.data);
    localStorage.setItem("token", resJson.data);
    if (decodedToken.role) {
      localStorage.setItem("role", decodedToken.role);
    }
    return resJson;
  }

  async register(registerData: RegisterCredentials){
    const res = await fetch(apiUrl + 'auth/register',{
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(registerData),
    })
    
    if(res.status !== 200) return;

    const resJson: AuthResponse = await res.json();
    localStorage.setItem("token", resJson.data);
    return resJson;
  }
}