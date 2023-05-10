import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({providedIn: "root"})
export class PostService {
  error = new Subject<string>();

  constructor(
    private http: HttpClient,
  ) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http.post<{ name: string }>('https://ng-complete-guide-nazarov-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response'
      }
    )
      .subscribe(
        responseData => {
          console.log(responseData);
        }, error => {
          this.error.next(error.message);
        }
      );
  }

  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('customPar', 'customVal');

    return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-nazarov-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({'Custom-Header': 'Hello'}),
        params: searchParams,
      }
    )
      .pipe(
        map(responseData => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key], id: key});
            }
          }
          return postArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  deletePost() {
    return this.http.delete('https://ng-complete-guide-nazarov-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events'
      }
    ).pipe(tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Sent) {
          console.log(event.type);
        }
        if (event.type === HttpEventType.Response){
          console.log(event.body);
        }
      })
    )
  }
}
