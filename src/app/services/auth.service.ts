import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl='http://localhost:5000/api/users/';
  private currentUserId: string | null = null;

  constructor(private http:HttpClient) { }


  
  register(userData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/register`, userData)
  }
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
  handleLogin(response: any) {
    if (response && response.user && response.user.id) {
      this.currentUserId = response.user.id;
      localStorage.setItem('userId', this.currentUserId!);
    } else {
      console.error('Invalid response:', response);
    }
  }
  getCurrentUserId(): string | null {
   
    if (!this.currentUserId) {
      this.currentUserId = localStorage.getItem('userId'); 
    }
    return this.currentUserId;
  }
  isAuthenticated(): boolean {
    
   

    const token = localStorage.getItem('token');
    console.log(token);
    return !!token; 
  
  
  
}
logout(): void {
  this.currentUserId = null;
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}
  
}


