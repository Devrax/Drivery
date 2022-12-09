import { Geolocation } from '@capacitor/geolocation';
import { AfterViewInit, Directive,  ElementRef, EventEmitter, Input, Output } from "@angular/core";
import * as mapboxgl from 'mapbox-gl';


@Directive({
  selector: '[mapbox-map]',
  standalone: true
})
export class MapboxMap implements AfterViewInit{

  private map: mapboxgl.Map | undefined;

  @Output('map-instance') mapInstance: EventEmitter<mapboxgl.Map> = new EventEmitter();
  @Output('click-map') clickMap: EventEmitter<mapboxgl.MapTouchEvent> = new EventEmitter();

  @Input('has-directions') hasDirections = false;

  constructor(private el: ElementRef) {}

  private initMap(coords: mapboxgl.LngLat) {

    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiZGV2cmFmeCIsImEiOiJja3VscGgwNG8xNDhqMm9wODZwN2l6YTk2In0.jDdxYysLDjPUBZspwNmRyw',
      container: this.el.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coords,
      zoom: 14,
      attributionControl: false
    });

    this.map.on('touchstart', (e) => {
      console.log('A touchstart event occurred.', e);
      this.clickMap.emit(e);
    });

    this.map.on('load', () => {
      this.mapInstance.emit(this.map);
    })

  }

  public ngAfterViewInit(): void {
    Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(({ coords: { latitude: lat, longitude: lng} }) => {
      this.initMap(new mapboxgl.LngLat(lng, lat));
    });
  }

}
