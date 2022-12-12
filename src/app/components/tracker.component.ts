import { CoordsTrackerService } from './../core/services/coords-tracker.service';
import { IonHeader, IonicModule } from '@ionic/angular';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapboxMap } from '../core/maps/directives/mapbox.directive';
import { CommonModule } from '@angular/common';
import { Marker } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'tracker',
  standalone: true,
  imports: [MapboxMap, IonicModule, CommonModule],

  template: `
    <ion-header #header>
      <ion-toolbar>
        <ion-title>Mapa</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content [ngStyle]="processStyle(header)">
      <div
        mapbox-map
        (map-instance)="setMarkers($event)"
        style="position: absolute; top: 0; bottom: 0; width: 100%;"
      ></div>
    </ion-content>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackerComponent {

  constructor(public coordTracker: CoordsTrackerService) {}

  public setMarkers(map: mapboxgl.Map) {
    new Marker({
      color: '#FF0000',
    })
      .setLngLat(map.getCenter())
      .addTo(map);

      this.coordTracker.getNewcoords().subscribe(test => console.log(test));
  }

  public processStyle(header: IonHeader) {
    return {
      height: `calc(100vh - ${header['el'].offsetHeight}px)`,
    };
  }
}

//       const currentPosition = new Marker({
//         color: '#FF0000',
//       })
//         .setLngLat(map.getCenter())
//         .addTo(map);

//       const fakeDelivery = new Marker({
//         color: '#00FF00',
//       })
//         .setLngLat({ lng: -69.86188, lat: 18.54064 })
//         .addTo(map);

//       const direction = new Directions({
//         accessToken: 'pk.eyJ1IjoiZGV2cmFmeCIsImEiOiJja3VscGgwNG8xNDhqMm9wODZwN2l6YTk2In0.jDdxYysLDjPUBZspwNmRyw',
//         styles: mapstyle,
//         unit: 'metric',
//         profile: 'mapbox/driving-traffic',
//         congestion: true,
//         zoom: 9,
//         interactive: false,
//         controls: {
//           inputs: false,
//           instructions: false,
//           profileSwitcher: false
//         }
//       }).setOrigin([-69.86205,18.54502]).setDestination([-69.86188,18.54064]);

//       map.addControl(direction, 'top-left');

// }
