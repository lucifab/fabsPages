import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { WebPostsAPIService } from 'src/app/services/data-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-read-post',
    templateUrl: './read-post.component.html',
    styleUrl: './read-post.component.scss',
    providers: [WebPostsAPIService],
    standalone: false
})
export class ReadPostComponent implements AfterViewInit, OnDestroy, OnInit {

  private readonly pageSize = environment.blog.pageSize;
  private observer?: IntersectionObserver;

  @ViewChild('loadMoreSentinel') loadMoreSentinel!: ElementRef<HTMLElement>;

  public posts: Post[] = [];
  public isLoading = false;
  public hasMorePosts = true;
  public hasLoadedInitialPage = false;

  constructor(private apiService: WebPostsAPIService){
  }

  ngOnInit(): void {
    this.getPostsData();
  }

  ngAfterViewInit(): void {
    const scrollRoot = this.loadMoreSentinel.nativeElement.closest('.bodyContainer');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.getPostsData();
        }
      },
      {
        root: scrollRoot,
        rootMargin: '250px 0px',
        threshold: 0.1
      }
    );

    this.observer.observe(this.loadMoreSentinel.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  getPostsData(): void {
    if (this.isLoading || !this.hasMorePosts) {
      return;
    }

    this.isLoading = true;
    const lastPost = this.posts[this.posts.length - 1];

    this.apiService.getPosts({
      pageSize: this.pageSize,
      cursorId: lastPost?.id
    }).subscribe(
      (response) => {
        this.posts = [...this.posts, ...response];
        this.hasMorePosts = response.length === this.pageSize;
        this.hasLoadedInitialPage = true;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.hasLoadedInitialPage = true;
        this.isLoading = false;
      }
    );
  }

}
