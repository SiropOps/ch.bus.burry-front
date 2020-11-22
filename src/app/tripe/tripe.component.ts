import { Component, OnInit } from '@angular/core';
import { GpsService } from '../service/gps.service';

declare let L;

@Component({
  selector: 'app-tripe',
  templateUrl: './tripe.component.html',
  styleUrls: ['./tripe.component.css']
})
export class TripeComponent implements OnInit {

  constructor(private gpsService: GpsService) { }

  ngOnInit() {
    const map = L.map('map').setView([46.237206667, 6.082325], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '@<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const myRenderer = L.canvas({ padding: 0.5 });

    this.gpsService.getAll().subscribe((list) => {

      list.forEach((coord, index) => {
        const latLng = new L.LatLng(coord.longitude, coord.latitude);
        L.circleMarker(latLng, {
          renderer: myRenderer,
          color: '#3388ff',
          radius: 2
        }).addTo(map);
      });
    });
  }

}
