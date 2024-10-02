import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrl: './write-post.component.scss'
})
export class WritePostComponent {

  displaySetting = false;
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
  public myForm = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("")
  });

  constructor(){
  }

  public myTest(){
    console.log(this.myForm);
    this.displaySetting=true;
    this.postPreview = {
      Title: this.postPreview.Title,
      Content: this.postPreview.Content,
      AuthorName: 'Fabiane Arruda',
      AuthorId: 1,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      Id: 0,
      AuthorImageUrl: 'https://lucidev-assets.s3.us-east-2.amazonaws.com/angel.jpeg'
    }
  }
}
