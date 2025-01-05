import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  getPosts() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:5000/api/post'; 

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/`,{headers});
  }

  getPostsByUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/user/${userId}`,{headers});
  }


  createPost(content: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}`, { content },{headers});
  }



  likePost(postId: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/${postId}/like`, {},{headers});
  }

  commentPost(postId: string, content: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/${postId}/comment`, { content },{headers});
  }

 

  
}
