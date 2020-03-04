import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lng = 37.015567399999995;
  lat = -1.1069468999999998;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
  };
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: 'You',
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    }
  });
  markers = [
    {
      position: new google.maps.LatLng(-1.03326, 37.06933),
      map: this.map,
      title: 'Marker 2',
    },
    {
      position: new google.maps.LatLng(-0.28333, 36.06667),
      map: this.map,
      title: 'Marker 3'
    }
  ];

  constructor() {}

  ngAfterViewInit() {
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
    this.markers.forEach(markerInfo => {
      const marker = new google.maps.Marker({
        ...markerInfo
      });
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap(), marker);
      });
      marker.setMap(this.map);
    });
  }
}
