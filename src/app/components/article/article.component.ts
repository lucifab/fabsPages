import { Component } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  title: string;
  articleDate = new Date();
  //content : string;

  constructor(){
    this.title = 'Sometimes, it is the way it is';
  }
}
