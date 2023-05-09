import {Component, OnDestroy, OnInit} from '@angular/core';

import {interval, Observable, Subscription} from 'rxjs';
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {

     const customIntervalObservable = Observable.create((observer) => {
       let count = 0;
       setInterval(() => {
         observer.next(count);
         if (count === 5) {
           observer.complete();
         }
         count++
       }, 1000)
     });



     this.firstObsSubscription = customIntervalObservable
       .pipe(
         map((data => {
       return `Round: ${data}`;
     }))
         )
       .subscribe(data => {
         console.log(data)
       }, error => {
         console.log(error);
         alert(error.message)
       }, () => {
         console.log('Interval completed !')
       })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
