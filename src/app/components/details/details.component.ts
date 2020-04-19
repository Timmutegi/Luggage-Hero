import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, AfterViewInit {
  date = new Date();
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
  minDate: Date;
  maxDate: Date;
  workhours: string;
  checkHours: boolean;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router) {
    this.minDate = new Date();
   }

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.params.ID;
    this.api.get('/business/' + this.ID).subscribe(
      res => {
        this.isLoading = false;
        this.business = res;
      }
    );
    this.getBusinessHours();
  }

  ngAfterViewInit() {
    this.api.get('/business/' + this.ID).subscribe(res => {
      this.coordinates = new google.maps.LatLng(
        res.latitude,
        res.longitude
      );
      this.mapOptions = {
        center: this.coordinates,
        zoom: 13
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

  getBusinessHours() {
    this.api.get('/workhours/' + this.ID).subscribe(
      res => {
        const hours = res[this.getWeekDay()];
        this.workhours = `Open Today from ${hours.open} - ${hours.close}`;
      }
    );
  }

  getMonth(month: number) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return months[month];
  }

  getWeekDay() {
    const date = new Date();
    const day = date.getDay();
    const weekDay = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    return weekDay[day];
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

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.workhours = '';
    this.checkHours = true;
    const fullDate = new Date(event.value);
    this.date = fullDate;
    const weekDay = [
       'sunday',
       'monday',
       'tuesday',
       'wednesday',
       'thursday',
       'friday',
       'saturday',
     ];
    const day = weekDay[fullDate.getDay()];
    const month = this.getMonth(fullDate.getMonth());
    const date = fullDate.getDate();

    this.api.get('/workhours/' + this.ID).subscribe(
      res => {
        this.checkHours = false;
        const hours = res[day];
        this.workhours = `Open On ${date} ${month} from ${hours.open} - ${hours.close}`;
    });

  }

  confirm(ID: string) {
    console.log(this.date);
    const user = localStorage.getItem('user');
    const booking = JSON.parse(JSON.stringify(
      {
        customer: user,
        shop: ID,
        status: 'Pending',
        date: this.date
      }
    ));
    this.api.post('/booking/create', booking).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/bookings']);
      }
    );
  }
}
