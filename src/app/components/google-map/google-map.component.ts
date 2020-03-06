import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lng: number;
  lat: number;
  coordinates: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
  marker: google.maps.Marker;
  businessMarker: google.maps.Marker;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {}

  ngAfterViewInit() {
    this.lat = this.activatedRoute.snapshot.params.LAT;
    this.lng = this.activatedRoute.snapshot.params.LONG;
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptions = {
      center: this.coordinates,
      zoom: 7
    };
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
      title: 'You',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      }
    });
    this.mapInitializer();
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

    // ADDS OTHER MARKERS
    this.loadAllMarkers();
  }

  loadAllMarkers() {
    this.apiService.get('/business').subscribe(
      res => {
        res.forEach(business => {
          this.businessMarker = new google.maps.Marker({
            position: new google.maps.LatLng(business.latitude, business.longitude),
            map: this.map,
            title: business.name
          });
          const infoWindow = new google.maps.InfoWindow({
            content: this.businessMarker.getTitle()
          });
          this.businessMarker.addListener('click', () => {
            infoWindow.open(this.businessMarker.getMap(), this.businessMarker);
          });
          this.businessMarker.setMap(this.map);
        });
      }
    );
  }
}
