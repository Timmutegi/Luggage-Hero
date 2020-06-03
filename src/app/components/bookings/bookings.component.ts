import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  pending: Subject<boolean> = new Subject<boolean>();
  active: Subject<boolean> = new Subject<boolean>();
  completed: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    if (tabChangeEvent.index === 0) {
      this.pending.next(true);
    }
    if (tabChangeEvent.index === 1) {
      this.active.next(true);
    }
    if (tabChangeEvent.index === 2) {
      this.completed.next(true);
    }
  }

}
