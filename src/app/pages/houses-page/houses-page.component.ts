import { Component, signal } from '@angular/core';
import { MiniMapComponent } from "../../maps/components/mini-map/mini-map.component";

interface HouseProperty {
  id: string;
  name: string;
  description: string;
  price: number;
  lngLat: { lng: number; lat: number };
  tags: string[];
}

@Component({
  selector: 'app-houses-page',
  imports: [MiniMapComponent],
  templateUrl: './houses-page.component.html',
})
export class HousesPageComponent {

  houses = signal<HouseProperty[]>([
    {
      id: crypto.randomUUID(),
      name: 'Propedad 4',
      description:
        'AV.M.ESCANDON 64 CASA 184',
      price: 500_000,
      lngLat: { lng: -99.14053018108784, lat: 19.379685333832537 },
      tags: ['25', 'Casa sola'],
    },
    {
      id: crypto.randomUUID(),
      name: 'Propiedad 5',
      description:
        ' AV.M.ESCANDON 64 CASA 184 ALVARO OBREGON IZTAPALAPA CDMX',
      price: 750_000,
      lngLat: { lng: -99.04125162584347, lat: 19.379662344116973 },
      tags: ['Casa', 'Sol', 'Terrazas'],
    },
    {
      id: crypto.randomUUID(),
      name: 'Propiedad 6',
      description:
        'MECANICOS 27 DEPARTAMENTO 5 MORELOS VENUSTIANO CARRANZA CDMX',
      price: 1_200_000,
      lngLat: { lng:-99.12220475000241, lat: 19.444495210016466 },
      tags: ['Departamento', 'Acabados'],
    },
    {
      id: crypto.randomUUID(),
      name: 'Propiedad 7',
      description:
        'FERNANDO DE ALBA IXTLINOCHITL NO. 145 INT. 5 OBRERA CUAUHTEMOC CDMX',
      price: 950_000,
      lngLat: { lng: -99.14053018108784, lat: 19.444495210016466 },
      tags: ['Departamento', 'Lago', 'Hacienda'],
    },
  ]);

  
 }
