import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, max } from 'rxjs/operators';
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {MapInfoWindow, MapMarker} from '@angular/google-maps';



@Component({
  selector: 'app-device-connected',
  templateUrl: './device-connected.component.html',
  styleUrls: ['./device-connected.component.css']
})
export class DeviceConnectedComponent implements OnInit {
  apiLoaded: Observable<boolean>;
    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
    openInfoWindow(marker: MapMarker) {
      this.infoWindow.open(marker);
    }
    @ViewChild(MapInfoWindow) tinfoWindow: MapInfoWindow;
    openTinfoWindow(marker: MapMarker) {
      this.tinfoWindow.open(getElementById("Trash"));
    }


  constructor(httpClient: HttpClient) { 
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyD_LibaclCk7zdY1BRY4FIsRU_lpgoWzRI', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
          );
          
  }

  ngOnInit(): void {
    
  }

  RobishPosition = {lat: 36.8867,lng: 10.3317};
  RobishIcon= {
    path: faUserCircle.icon[4] as string,
    fillColor: "#1E90FF",
    fillOpacity: 1,
    anchor: new google.maps.Point(
      faUserCircle.icon[0] / 2, 
      faUserCircle.icon[1] 
    ),
    strokeWeight: 0.5,
    strokeColor: "#ffffff",
    scale: 0.075,
  };

  RobishOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
    icon:this.RobishIcon,
  }
  



  mapoptions: google.maps.MapOptions = {
      mapTypeId: 'roadmap',
      zoom: 22,
      center:this.RobishPosition,
      styles:[{
        featureType:'poi',
        stylers:[
          {visibility:'off'}
        ]
      }]
  };

  Trash= {
    path: faTrash.icon[4] as string,
    fillColor: "#00A300",
    fillOpacity: 1,
    anchor: new google.maps.Point(
      faTrash.icon[0] / 2, 
      faTrash.icon[1] 
    ),
    strokeWeight: 0.5,
    strokeColor: "#ffffff",
    scale: 0.050,
  };
  TrashOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
    icon:this.Trash
  }
  TrashPositions :google.maps.LatLngLiteral[]=[
    {lat: 36.8867,lng: 10.3315},
    {lat: 36.8868,lng: 10.3318},
    {lat: 36.8869,lng: 10.3311}]

  Endicon= {
    path: faFlagCheckered.icon[4] as string,
    fillColor: "#000000	",
    fillOpacity: 1,
    anchor: new google.maps.Point(
      faFlagCheckered.icon[0] / 3.5, 
      faFlagCheckered.icon[1] 
    ),
    strokeWeight: 0.5,
    strokeColor: "#ffffff",
    scale: 0.1,
  };
  EndOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
    icon:this.Endicon
  }

}

function getElementById(arg0: string): any {
  throw new Error('Function not implemented.');
}

