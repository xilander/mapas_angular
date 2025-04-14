import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import maplibregl, { LngLatLike } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { environment } from '../../../environments/environment';
import { JsonPipe } from '@angular/common';

interface Marker{
  id: string;
  mapLibreMarker: maplibregl.Marker;
}


@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map | null>(null);
  coordenadas = signal({
    lat: 19.352455408296155,
    lng: -99.19085
  });
  markers = signal<Marker[]>([]);
  maptilerToken = environment.maptiler;

  async ngAfterViewInit() {
    if (!this.divElement) {
      console.error('Map container element not found');
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 80));
    const element = this.divElement()!.nativeElement ;
    const {lat, lng} = this.coordenadas();
    const map = new maplibregl.Map({
      container: element,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${this.maptilerToken}`,
      center: [lng, lat],
      zoom: 15,
      attributionControl: false,
    });  
    this.mapListenerer(map);
  }

  mapListenerer(map: maplibregl.Map) {
    map.on('click', (event) => this.mapClick(event));

    map.addControl(new maplibregl.FullscreenControl(), 'top-right');
    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
    map.addControl(new maplibregl.ScaleControl(), 'bottom-left');
    
    this.map.set(map);
  }

  mapClick(event: maplibregl.MapMouseEvent) {
    if (!this.map()) return;
    const map = this.map()!;
    const coords = event.lngLat;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marker = new maplibregl.Marker({
      color: color
    })
    .setLngLat(coords)
    .addTo(map);

    const newMarker: Marker = {
      id: crypto.randomUUID(),
      mapLibreMarker: marker
    }

    this.markers.set([newMarker, ...this.markers()]);

  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map()) return;
    
    this.map()?.flyTo({
      center: lngLat,
    });
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;
    const map = this.map()!;

    marker.mapLibreMarker.remove();
    this.markers.set(this.markers().filter(m => m.id !== marker.id));
  
  }
  
 }
