import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styles: `
  div {
    width: 100%;
    height: 260px;
  }`
})
export class MiniMapComponent implements AfterViewInit{
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{lng: number, lat: number}>();
  zoom = input<number>(10);

  async ngAfterViewInit(){
    if(!this.divElement) {
      console.error('Map container element not found');
      return;
    }
    const element = this.divElement()!.nativeElement ;
    const map = new maplibregl.Map({
      container: element,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=sm6H7S00Ll4ZLvPIuHry',
      center: this.lngLat(), 
      zoom: this.zoom(),
      attributionControl: false,
      interactive: true,
      pitch: 30
    });

    new maplibregl.Marker().setLngLat(this.lngLat()).addTo(map);

  } 

}
