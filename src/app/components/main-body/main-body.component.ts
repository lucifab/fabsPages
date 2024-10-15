import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Post } from 'src/app/models/post.model';
import { WebPostsAPIService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss'],
  providers: [WebPostsAPIService]
})
export class MainBodyComponent implements OnChanges {

  public posts!: Post[];

  @Input() selectedContent: string;

  constructor(private apiService: WebPostsAPIService){
    this.selectedContent = ''; // Populated within app.component.ts; if you want to change initial starting page
    this.getPostsData();
  }

  ngOnChanges(changes: SimpleChanges): void { // Use ngOnChanges to monitor updates of @Input
    if(changes['selectedContent']){
      var changed=changes['selectedContent'];
      console.log("PREVIOUS:" + changed.previousValue);
      console.log("CURRENT:" + changed.currentValue);
      if(changed.currentValue=="blog" && changed.previousValue!=null){
        console.log("Retrieving refreshed blog data.");
        this.getPostsData();
      }
    }
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
