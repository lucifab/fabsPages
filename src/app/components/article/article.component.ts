import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input('articleTitle') title: string;
  @Input('articleDate') articleDate = new Date();
  @Input('articleContents') content : string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque, ligula ac pellentesque dictum, turpis eros varius quam, non viverra eros justo a ante. Nam elit erat, varius sed ligula laoreet, molestie consequat tellus. Morbi malesuada facilisis neque, condimentum vestibulum dui. Donec vel diam mi. Nunc luctus odio sapien, eu dapibus justo suscipit nec. Duis porttitor urna in posuere pharetra. Ut massa justo, efficitur sodales ex vitae, efficitur malesuada felis. Ut posuere sem vitae augue fringilla dapibus at non augue. Vivamus lobortis, massa sed fermentum ullamcorper, tellus ex mattis ipsum, a venenatis lectus ligula non augue. Donec lobortis massa a nulla finibus fringilla. Nulla egestas orci sed massa placerat, sit amet aliquam ipsum auctor.";

  constructor(){
    this.title = 'Sometimes, it is the way it is';
  }
}
