import {Component, OnDestroy, OnInit} from '@angular/core';

import {interval, Observable, Subscription} from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000)
    //   .subscribe((count) => {
    //     console.log(count)
    // })

     // const customIntervalObservable = Observable.create((observer) => {
     //   let count = 2;
     //   setInterval(() => {
     //     observer.next(count);
     //     count++
     //   }, 1000)
     // });
     //
     // customIntervalObservable
     //   .subscribe(data => {
     //     console.log(data)
     //   })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
