import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class WebPostsAPIService {

  private apiUrl='http://localhost:5087'

  constructor(private http: HttpClient) { }

  getData():Observable<Array<Post>>{

    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get<Array<Post>>(`${this.apiUrl}/posts`,{headers:headers});
  }

  pushData(post:Post):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/posts`,{headers:headers});
  }
}
