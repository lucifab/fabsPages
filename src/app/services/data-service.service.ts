import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebPostsAPIService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData():Observable<Post[]>{

    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get<Post[]>(`${this.apiUrl}/posts`,{headers:headers});
  }

  pushData(post:Post):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/posts`,{headers:headers});
  }
}
