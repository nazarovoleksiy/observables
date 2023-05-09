import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from "rxjs";

import { Post } from "./post.model";
import { PostService } from "./post.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(
    private http: HttpClient,
    private postService: PostService,
  ) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(
      errorMessage => {
        this.error = errorMessage;
      }
    );
    this.postService.fetchPost()
      .subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },error => {
          this.error = error.message;
          console.log(error);
        }
    )
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.postService.fetchPost()
      .subscribe(
        posts => {
          this.isFetching = false;
          this.loadedPosts = posts;
        }, error => {
          this.error = error.message
        });
  }

  onClearPosts() {
    this.postService.deletePost()
      .subscribe(
      () => {
        this.loadedPosts = [];
      }
    )
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

}
