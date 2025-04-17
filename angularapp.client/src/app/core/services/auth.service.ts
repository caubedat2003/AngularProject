import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


export interface DecodedToken {
  email: string;
  given_name: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7000/api/Account/login';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded: DecodedToken = jwtDecode(token);
    return decoded.role || null;
  }
}
