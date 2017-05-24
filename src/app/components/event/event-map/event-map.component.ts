import { Component, OnInit, Input } from '@angular/core';
import { PhysicalLocation } from '../../../models/physical-location.model'
import { BrowserModule } from '@angular/platform-browser'
import { AgmCoreModule } from 'angular2-google-maps/core'

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styles: [`
    .sebm-google-map-container {
    height: 200px;
    }`]
})
export class EventMapComponent implements OnInit {

  @Input() location : PhysicalLocation;
  @Input() zoom? = 12

  constructor() { }

  ngOnInit() {
  }

}
