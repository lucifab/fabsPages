import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post, PostRequest, PostsPageRequest } from '../models/post.model';
import { environment } from '../../environments/environment';
import { CognitoService } from './cognito-service.service';

@Injectable({
  providedIn: 'root'
})
export class WebPostsAPIService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cognitoService: CognitoService) { }

  getData(): Observable<Post[]> {
    return this.getPosts();
  }

  getPosts(pageRequest?: PostsPageRequest): Observable<Post[]> {

    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let params = new HttpParams();

    if (pageRequest?.pageSize !== undefined) {
      params = params.set('pageSize', pageRequest.pageSize);
    }

    if (pageRequest?.cursorId !== undefined) {
      params = params.set('cursorId', pageRequest.cursorId);
    }

    return this.http.get<Post[]>(`${this.apiUrl}/posts`, { headers, params });
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
