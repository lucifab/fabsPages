import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { faWarning, faEye, faUpload } from '@fortawesome/free-solid-svg-icons';
import { WebPostsAPIService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrl: './write-post.component.scss'
})
export class WritePostComponent {

  //Visual
  faWarning = faWarning;
  faEye = faEye;
  faUpload = faUpload;

  //Settings
  displaySetting = false;
  apiResponse: string = '';

  //Post variables
  infoMessage: string = '';
  postPreview: Post = {
    Title: '',
    Content: '',
    AuthorName: 'Fabiane Arruda',
    AuthorId: 1,
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
    Id: 0,
    AuthorImageUrl: ''
  }
  postNew: Post = {
    Title: '',
    Content: '',
    AuthorName: '',
    AuthorId: 0,
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
    Id: 0,
    AuthorImageUrl: ''
  }
  public myForm = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("")
  });

  constructor(private apiService: WebPostsAPIService) {
  }

  public pushPostData() {
    if (this.isPostValid())
      this.apiService.pushData(this.postPreview).subscribe(
        (response) => {
          this.apiResponse = response;
          console.log(response);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      )
  }

  public isPostValid() {
    let valid = this.postNew.Title && this.postNew.Content;
    if(!valid){
      let missingParts:string[] = [];
      let finalText:string='';
      if (!this.postNew.Title)
        missingParts.push('Title');
      if (!this.postNew.Content)
        missingParts.push('Content');
      finalText = missingParts.join(', ');
      this.infoMessage = 'Missing information for the post: ' + finalText;
    }
    else{
      this.infoMessage = '';
    }
    return valid;
  }

  public previewPost() {
    console.log(this.myForm);
    if (this.isPostValid()) {
      this.displaySetting = true;
      this.postPreview = {
        Title: this.postNew.Title,
        Content: this.postNew.Content,
        AuthorName: 'Fabiane Arruda',
        AuthorId: 1,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Id: 0,
        AuthorImageUrl: 'https://lucidev-assets.s3.us-east-2.amazonaws.com/angel.jpeg'
      }
    }
  }
}
