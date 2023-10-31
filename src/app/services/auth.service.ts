import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  private bddURL = 'http://localhost:3000/api/auth';
  isConnected: boolean = false;

  constructor(private http: HttpClient) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

  login(email: string, motdepasse: string): Observable<Login> {
    const body = { email: email, motdepasse: motdepasse };
    return this.http.post<Login>(this.bddURL + '/login', body);
  }

  checkConnexion(): boolean {
    this.isConnected = !!localStorage.getItem('access_token');
    return this.isConnected;
  }
}
