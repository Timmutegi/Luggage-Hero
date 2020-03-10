import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, AfterViewInit {
  ID: string;
  business: any;
  isLoading = true;
  starList: boolean[] = [true, true, true, true, true];
  rating: number;
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lng: number;
  lat: number;
  coordinates: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
  marker: google.maps.Marker;
  businessMarker: google.maps.Marker;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.params.ID;
    this.api.get('/business/' + this.ID).subscribe(
      res => {
        this.isLoading = false;
        this.business = res;
      }
    );
  }

  ngAfterViewInit() {
    this.api.get('/business/' + this.ID).subscribe(res => {
      this.coordinates = new google.maps.LatLng(
        res.latitude,
        res.longitude
      );
      this.mapOptions = {
        center: this.coordinates,
        zoom: 10
      };
      this.marker = new google.maps.Marker({
        position: this.coordinates,
        map: this.map,
        title: this.business.name
      });

      this.mapInitializer();
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    // ADDING CLICK EVENT TO DEFAULT MARKER
    this.marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });
    // ADDS DEFAULT MARKER TO MAP
    this.marker.setMap(this.map);
  }

  setRating(data: any) {
    this.rating = data + 1;
    for (let i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      } else {
        this.starList[i] = true;
      }
    }
  }

  confirm(ID: string) {
    const user = localStorage.getItem('user');
    const booking = JSON.parse(JSON.stringify(
      {
        customer: user,
        shop: ID,
        status: 'pending'
      }
    ));
    this.api.post('/booking/create', booking).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/bookings']);
      }
    );
  }

  cancel() {
    this.router.navigate(['/home']);
  }

}
