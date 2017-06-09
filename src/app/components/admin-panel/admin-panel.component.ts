import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { Event } from '../../models/event.model';
import { PhysicalLocation } from '../../models/physical-location.model';
import {} from '@types/googlemaps';

const wantedComponents = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'long_name',
        administrative_area_level_2: 'long_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  providers: [ GoogleMapsAPIWrapper ]
})
export class AdminPanelComponent implements OnInit {
  inputEvent: Event =  new Event();
  locationInput: FormControl;
  location: PhysicalLocation = new PhysicalLocation();
  venue: string;

  @ViewChild("pickupInput")
   public pickupInputElementRef: ElementRef;

  constructor(public db: DatabaseService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.locationInput = new FormControl();
    this.mapsAPILoader.load().then(() => {
          let autocomplete = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
            types: ["establishment", "geocode"]
          });
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {

              //get the place result
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();

              console.log(place.address_components)
              for (let component of place.address_components) {
                let type = component["types"][0];
                if(type in wantedComponents){
                  this.location[type] = component[wantedComponents[type]];
                }
              }

              //verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }

              //set latitude and longitude
              this.location.supplyCoordinates(place.geometry.location.lat(), place.geometry.location.lng());
              console.log(this.location)
          });
      });
    });
  }



}
