import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private baseUrl = 'http://localhost:3005'; // URL do seu backend Nest.js na porta 3001

  constructor(private httpClient: HttpClient) { }

  register(name: string, email: string, password: string) {
    return this.httpClient.post<any>(`${this.baseUrl}/auth/register`, { name, email, password }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    if (error.error instanceof ErrorEvent) {
      // Erro do cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erro do servidor
      errorMessage = `Error during request: ${error.status}, ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));      
  }
}
