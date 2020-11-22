import { Component, OnInit, OnDestroy } from '@angular/core';
import { GpsService } from '../service/gps.service';
import { Observable, timer, Subscription } from 'rxjs';


declare let L: any;

@Component({
  selector: 'app-road',
  templateUrl: './road.component.html',
  styleUrls: ['./road.component.css']
})
export class RoadComponent implements OnInit, OnDestroy {
  source$: Observable<number> = timer(0, 1000);
  private subscription: Subscription;


  constructor(private gpsService: GpsService) { }

  ngOnInit() {
    const map = L.map('map').setView([46.237206667, 6.082325], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '@<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const myRenderer = L.canvas({ padding: 0.5 });

    // const layerGroup = L.layerGroup().addTo(map);

    this.subscription = this.source$.subscribe(() => this.gpsService.get().subscribe((res) => {

      // layerGroup.clearLayers();
      const latLng = new L.LatLng(res.longitude, res.latitude);
      map.panTo(latLng);
      // L.marker([res.longitude, res.latitude]).addTo(map);

      L.circleMarker(latLng, {
        renderer: myRenderer,
        color: '#3388ff',
        radius: 2
      }).addTo(map);

    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
