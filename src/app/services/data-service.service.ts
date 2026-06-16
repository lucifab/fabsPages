import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post, PostRequest } from '../models/post.model';
import { environment } from '../../environments/environment';
import { CognitoService } from './cognito-service.service';

@Injectable({
  providedIn: 'root'
})
export class WebPostsAPIService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cognitoService: CognitoService) { }

  getData():Observable<Post[]>{

    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get<Post[]>(`${this.apiUrl}/posts`,{headers:headers});
  }

  pushData(post: PostRequest): Observable<any> {
    return this.cognitoService.getAccessToken().pipe(
      switchMap((accessToken) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        });

        return this.http.post<any>(`${this.apiUrl}/posts`, post, { headers });
      })
    );
  }
}
