import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, ViewChildren } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnChanges {
  @Input() post!: Post;
  @ViewChildren('articleBody') articleBodies!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      this.updateHtml();
      console.log("Post changed!")
    }
  }
  ngAfterViewInit() {
    this.updateHtml();
  }

  updateHtml(): void {
    if (this.articleBodies)
      this.articleBodies.forEach((articleBody) => {
        this.renderer.setProperty(articleBody.nativeElement, 'innerHTML', this.post.Content);
      });

  }
}
