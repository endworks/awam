import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../../../models/review.model'

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  @Input() reviews: Array<Review>;
  constructor() { }

  ngOnInit() {

  }

}
