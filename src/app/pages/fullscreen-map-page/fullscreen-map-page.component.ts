import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
  div {
    width: 100vw;
    height: calc(100vh - 64px);
  }`
})
export class FullscreenMapPageComponent implements AfterViewInit {
  maptilerToken = environment.maptiler;
  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map | null>(null);
  zoom = signal(15);
  coordenadas = signal({
    lat: 19.352455408296155,
    lng: -99.19085
  });

  async ngAfterViewInit(){
    if (!this.divElement) {
      console.error('Map container element not found');
      return;
    }
    const element = this.divElement()!.nativeElement ;
    const {lat, lng} = this.coordenadas();
    
    const map = new maplibregl.Map({
      container: element, // container id
      style: `https://api.maptiler.com/maps/streets/style.json?key=${this.maptilerToken}`,
      center: [lng, lat], 
      zoom: this.zoom(),
    });
    this.mapListenerer(map);
    
    const marker = new maplibregl.Marker({
      draggable: true,
      color: 'blue',

    })
    .setLngLat([-99.19085, 19.352455408296155])
    .addTo(map);
  }

  mapListenerer(map: maplibregl.Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', (event) => {
      const center = event.target.getCenter();
      this.coordenadas.set(center);
    });

    map.on('load', () => {
      console.log('Map loaded');
    });

    map.addControl(new maplibregl.FullscreenControl(), 'top-right');
    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
    map.addControl(new maplibregl.ScaleControl(), 'bottom-left');
    
    this.map.set(map);
  }

 }
