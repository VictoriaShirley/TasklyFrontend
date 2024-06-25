import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:3005'; // URL do seu backend Nest.js na porta 3001

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknown error during login';
        if (error.error instanceof ErrorEvent) {
          // Erro de rede ou cliente
          errorMessage = `${error.error.message}`;
        } else {
          // Erro no servidor
          errorMessage = `${error.error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));      
      })
    );
  }
}
