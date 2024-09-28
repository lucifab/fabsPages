import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input() post!:Post;
  safeContent!: SafeHtml; // Variable to hold sanitized content

  constructor(private sanitizer: DomSanitizer){
  }

  ngOnInit():void{
    this.safeContent=this.sanitizer.bypassSecurityTrustHtml(this.post.Content);
  }
}
