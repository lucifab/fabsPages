import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebPostsAPIService {

  private apiUrl='http://127.0.0.1:3000/api'

  constructor(private http: HttpClient) { }

  getData():Observable<any>{
    var body = {
      "Action":"getPosts"
    }
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'
    });
    return this.http.post<any>(`${this.apiUrl}`,JSON.stringify(body),{headers});
  }
}
