import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { WebPostsAPIService } from 'src/app/services/data-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-read-post',
    templateUrl: './read-post.component.html',
    styleUrl: './read-post.component.scss',
    providers: [WebPostsAPIService],
    standalone: false
})
export class ReadPostComponent {

  public posts!: Post[];

  constructor(private apiService: WebPostsAPIService){
    this.getPostsData();
  }

  getPostsData(): void {
    this.apiService.getData().subscribe(
      (response) => {
        this.posts = response;
        console.log(this.posts[0].Title);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
