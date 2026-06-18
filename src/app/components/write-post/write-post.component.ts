import { Component, ElementRef, inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post, UpsertPostRequest } from 'src/app/models/post.model';
import { faWarning, faEye, faUpload, faSquareXmark, faSquareCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { WebPostsAPIService } from 'src/app/services/data-service.service';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { catchError, concatMap, debounceTime, tap } from 'rxjs/operators';
import { CognitoService } from 'src/app/services/cognito-service.service';
import { CognitoUserData } from 'src/app/models/cognito-user-data.model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-write-post',
    templateUrl: './write-post.component.html',
    styleUrl: './write-post.component.scss',
    standalone: false
})
export class WritePostComponent implements OnDestroy, OnInit {

  public readonly cognitoService = inject(CognitoService);
  private autoSaveChanges$ = new Subject<void>();
  private autoSaveSubscription?: Subscription;

  //Visual
  faWarning = faWarning;
  faSquareCheck = faSquareCheck;
  faSquareXmark = faSquareXmark;
  faEye = faEye;
  faUpload = faUpload;
  faPlus = faPlus;

  //Settings
  previewDisplaySetting = false;
  apiResponse: string = '';
  infoMessageIconType: string = ''; //warning, load, success, error
  loadingDisplay = false;
  autoSaveStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle';
  autoSaveMessage = 'No draft saved yet';
  isPublishing = false;
  @ViewChild('messageBoxElement') messageBoxElement!: ElementRef;

  //Post variables
  infoMessage: string = '';
  postId?: number;
  postPreview: Post = {
    title: '',
    content: '',
    authorName: '',
    cognitoId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 0,
    authorImageUrl: '',
    isActive: true
  }
  postNew: UpsertPostRequest = {
    title: '',
    content: ''
  }
  public myForm = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("")
  });

  constructor(private apiService: WebPostsAPIService, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.autoSaveSubscription = this.autoSaveChanges$
      .pipe(
        debounceTime(environment.writePost.autoSaveDelayMs),
        concatMap(() => this.autoSaveDraft())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.autoSaveSubscription?.unsubscribe();
  }

  public setMessageIcon (typeIcon: string){
    this.infoMessageIconType=typeIcon;
    this.removeMessageBoxClass();
    switch (typeIcon){
      case 'error':
        this.renderer.addClass(this.messageBoxElement.nativeElement,'messagebox-error');
        break;
      case 'warning':
        this.renderer.addClass(this.messageBoxElement.nativeElement,'messagebox-warn');
        break;
      case 'success':
        this.renderer.addClass(this.messageBoxElement.nativeElement,'messagebox-success');
        break;       
    }
  }

  public removeMessageBoxClass(){
    this.renderer.removeClass(this.messageBoxElement.nativeElement,'messagebox-success');
    this.renderer.removeClass(this.messageBoxElement.nativeElement,'messagebox-warn');
    this.renderer.removeClass(this.messageBoxElement.nativeElement,'messagebox-error');
  }

  public testButton(value: string) {
    this.setMessageIcon(value);
    this.infoMessage = 'Test '+value;
  }

  public timerDone() {
    this.loadingDisplay = false;
  }

  public publishPost() {
    if (this.autoSaveStatus === 'saving') {
      this.setMessageIcon('warning');
      this.infoMessage = 'Please wait for autosave to finish before publishing.';
      return;
    }

    if (this.isPostValid()){
      this.isPublishing = true;
      this.setMessageIcon('load');
      this.infoMessage = 'Publishing...';
      this.apiService.publishPost(this.buildPostRequest()).subscribe({
        next: (r) => {
          this.postId = r.id;
          this.apiResponse = JSON.stringify(r);
          this.infoMessage = 'The post was published successfully!';
          this.setMessageIcon('success');
          this.autoSaveStatus = 'saved';
          this.autoSaveMessage = `Published post #${this.postId}`;
        },
        error: (e) => {
          console.error('Error publishing post:', e);
          this.infoMessage = 'There was an error publishing the post.';
          this.setMessageIcon('error');
          this.isPublishing = false;
        },
        complete: () => {
          console.info('Completed publishPost');
          this.loadingDisplay = false;
          this.isPublishing = false;
        }
      })
    }
  }

  public queueAutoSave(): void {
    if (!this.hasDraftContent()) {
      return;
    }

    this.autoSaveStatus = 'idle';
    this.autoSaveMessage = 'Unsaved changes';
    this.autoSaveChanges$.next();
  }

  public createNewPost(): void {
    this.postId = undefined;
    this.postNew = this.createEmptyPostRequest();
    this.postPreview = this.createEmptyPostPreview();
    this.previewDisplaySetting = false;
    this.infoMessage = '';
    this.apiResponse = '';
    this.autoSaveStatus = 'idle';
    this.autoSaveMessage = 'No draft saved yet';
    this.setMessageIcon('');
  }

  public isPostValid() {
    const userProfile = this.cognitoService.currentUserProfile;
    let valid = this.postNew.title && this.postNew.content && userProfile?.sub;
    if (!valid) {
      let missingParts: string[] = [];
      let finalText: string = '';
      if (!this.postNew.title)
        missingParts.push('Title');
      if (!this.postNew.content)
        missingParts.push('Content');
      if (!userProfile?.sub)
        missingParts.push('Authenticated user');
      finalText = missingParts.join(', ');
      this.setMessageIcon('warning');
      this.infoMessage = 'Missing information: ' + finalText;
    }
    else {
      this.infoMessage = '';
      this.setMessageIcon('');
    }
    return valid;
  }

  public previewPost() {
    console.log(this.myForm);
    if (this.isPostValid()) {
      this.previewDisplaySetting = true;
      this.postPreview = this.buildPostPreview();
    }
  }

  private autoSaveDraft() {
    if (this.isPublishing) {
      return EMPTY;
    }

    if (!this.hasDraftContent()) {
      return EMPTY;
    }

    if (!this.cognitoService.isAuthenticated) {
      this.autoSaveStatus = 'error';
      this.autoSaveMessage = 'Sign in to autosave';
      return EMPTY;
    }

    this.autoSaveStatus = 'saving';
    this.autoSaveMessage = 'Autosaving...';

    return this.apiService.upsertDraftPost(this.buildPostRequest()).pipe(
      tap({
        next: (response) => {
        this.postId = response.id;
        this.autoSaveStatus = 'saved';
        this.autoSaveMessage = `Draft saved #${this.postId}`;
        },
        error: (error) => {
        console.error('Error autosaving draft:', error);
        this.autoSaveStatus = 'error';
        this.autoSaveMessage = 'Autosave failed';
        }
      }),
      catchError(() => EMPTY)
    );
  }

  private buildPostPreview(): Post {
    const userProfile = this.cognitoService.currentUserProfile;

    return {
      title: this.postNew.title,
      content: this.postNew.content,
      authorName: this.getAuthorName(userProfile),
      cognitoId: userProfile?.sub ?? '',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: this.postId ?? 0,
      authorImageUrl: this.getAuthorImageUrl(userProfile),
      isActive: true
    };
  }

  private buildPostRequest(): UpsertPostRequest {
    const request: UpsertPostRequest = {
      title: this.postNew.title,
      content: this.postNew.content
    };

    if (this.postId !== undefined) {
      request.id = this.postId;
    }

    return request;
  }

  private createEmptyPostRequest(): UpsertPostRequest {
    return {
      title: '',
      content: ''
    };
  }

  private createEmptyPostPreview(): Post {
    return {
      title: '',
      content: '',
      authorName: '',
      cognitoId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 0,
      authorImageUrl: '',
      isActive: true
    };
  }

  private hasDraftContent(): boolean {
    return Boolean(this.postNew.title?.trim() || this.postNew.content?.trim());
  }

  private getAuthorName(userProfile: CognitoUserData | null): string {
    return userProfile?.name
      || userProfile?.preferred_username
      || userProfile?.email
      || userProfile?.['cognito:username']
      || userProfile?.sub
      || 'Authenticated user';
  }

  private getAuthorImageUrl(userProfile: CognitoUserData | null): string {
    return typeof userProfile?.picture === 'string' ? userProfile.picture : '';
  }
}
