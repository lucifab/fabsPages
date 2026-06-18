import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post, PostsPageRequest, UpsertPostRequest, UpsertPostResponse } from '../models/post.model';
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

  upsertDraftPost(post: UpsertPostRequest): Observable<UpsertPostResponse> {
    return this.cognitoService.getAccessToken().pipe(
      switchMap((accessToken) => {
        const headers = this.buildAuthorizedHeaders(accessToken);

        return this.http.put<UpsertPostResponse>(`${this.apiUrl}/posts/draft`, post, { headers });
      })
    );
  }

  publishPost(post: UpsertPostRequest): Observable<UpsertPostResponse> {
    return this.cognitoService.getAccessToken().pipe(
      switchMap((accessToken) => {
        const headers = this.buildAuthorizedHeaders(accessToken);

        return this.http.post<UpsertPostResponse>(`${this.apiUrl}/posts/publish`, post, { headers });
      })
    );
  }

  private buildAuthorizedHeaders(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });
  }
}
