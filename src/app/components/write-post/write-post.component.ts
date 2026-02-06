import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { faWarning, faEye, faUpload, faSquareXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { WebPostsAPIService } from 'src/app/services/data-service.service';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
    selector: 'app-write-post',
    templateUrl: './write-post.component.html',
    styleUrl: './write-post.component.scss',
    standalone: false
})
export class WritePostComponent {

  //Visual
  faWarning = faWarning;
  faSquareCheck = faSquareCheck;
  faSquareXmark = faSquareXmark;
  faEye = faEye;
  faUpload = faUpload;

  //Settings
  previewDisplaySetting = false;
  apiResponse: string = '';
  infoMessageIconType: string = ''; //warning, load, success, error
  loadingDisplay = false;
  @ViewChild('messageBoxElement') messageBoxElement!: ElementRef;

  //Post variables
  infoMessage: string = '';
  postPreview: Post = {
    title: '',
    content: '',
    authorName: 'Fabiane Arruda',
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 0,
    authorImageUrl: '',
    isActive: true
  }
  postNew: Post = {
    title: '',
    content: '',
    authorName: '',
    authorId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 0,
    authorImageUrl: '',
    isActive: true
  }
  public myForm = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("")
  });

  constructor(private apiService: WebPostsAPIService, private renderer: Renderer2) {
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

  public pushPostData() {
    if (this.isPostValid()){
      this.setMessageIcon('load');
      this.infoMessage = 'Loading...';
      this.apiService.pushData(this.postPreview).subscribe({
        next: (r) => {
          this.apiResponse = r;
          console.log(r);
          this.infoMessage = 'The post was pushed successfully!';
          this.setMessageIcon('success');
        },
        error: (e) => {
          console.error('Error fetching data:', e);
          this.infoMessage = 'There was an error fetching the data.';
          this.setMessageIcon('error');
        },
        complete: () => {
          console.info('Completed pushPostData');
          this.loadingDisplay = false;
        }
      })
    }
  }

  public isPostValid() {
    let valid = this.postNew.title && this.postNew.content;
    if (!valid) {
      let missingParts: string[] = [];
      let finalText: string = '';
      if (!this.postNew.title)
        missingParts.push('Title');
      if (!this.postNew.content)
        missingParts.push('Content');
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
      this.postPreview = {
        title: this.postNew.title,
        content: this.postNew.content,
        authorName: 'Fabiane Arruda',
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: 0,
        authorImageUrl: 'https://lucidev-assets.s3.us-east-2.amazonaws.com/angel.jpeg',
        isActive:true
      }
    }
  }
}
