import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:3001'; // URL do seu backend Nest.js na porta 3001

  constructor(private httpClient: HttpClient) { }

  login(name: string, password: string){
    return this.httpClient.post<LoginResponse>("/login", {name, password}).pipe(
      tap((value) => {//tap torna o valor sincrono
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }
}
