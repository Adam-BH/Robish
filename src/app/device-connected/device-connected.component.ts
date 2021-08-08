
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, max } from 'rxjs/operators';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

import { RoomCrudService } from '../services/room-crud.service';


@Component({
  selector: 'app-device-connected',
  templateUrl: './device-connected.component.html',
  styleUrls: ['./device-connected.component.css']
})
export class DeviceConnectedComponent implements OnInit {

  harmfulList: any;
  harmlessList: any;
  destination: any;
  location: any;
  battery: any;


  RobishPosition!:any
  
  TrashPositions: google.maps.LatLngLiteral[]
  EndPosition!:any

ngOnInit(): void {
    this.secondFunction()


  }
  show() {
    console.log(this.RobishPosition, this.TrashPositions, this.EndPosition)
  }

  apiLoaded: Observable<boolean>;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }


  constructor(httpClient: HttpClient, private roomservice: RoomCrudService) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyD_LibaclCk7zdY1BRY4FIsRU_lpgoWzRI', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );

  }


  RobishIcon = {
    path: faRobot.icon[4] as string,
    fillColor: "#1E90FF",
    fillOpacity: 1,
    anchor: new google.maps.Point(
      faRobot.icon[0] / 2,
      faRobot.icon[1]
    ),
    strokeWeight: 0.5,
    strokeColor: "#ffffff",
    scale: 0.075,
  };

  RobishOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
    icon: this.RobishIcon,
  }




  mapoptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoom: 22,
    center: this.RobishPosition
    ,
    styles: [{
      featureType: 'poi',
      stylers: [
        { visibility: 'off' }
      ]
    }]
  };

  Trash = {
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
    icon: this.Trash
  }



  Endicon = {
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
    icon: this.Endicon,
    position: this.EndPosition
  }

  // bounds: google.maps.LatLngBoundsLiteral = {
  //   east: this.RobishPosition?.lng,
  //   north: this.EndPosition?.lat,
  //   south: this.RobishPosition?.lat,
  //   west: this.EndPosition?.lng,
  // };

  UserPosition = { lat: 36.88671, lng: 10.33171 };
  UserIcon = {
    path: faUserCircle.icon[4] as string,
    fillColor: "#FF0000",
    fillOpacity: 1,
    anchor: new google.maps.Point(
      faUserCircle.icon[0] / 2,
      faUserCircle.icon[1]
    ),
    strokeWeight: 0.5,
    strokeColor: "#ffffff",
    scale: 0.075,
  };

  UserOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
    icon: this.UserIcon,
  }





  getElementById(arg0: string): any {
    throw new Error('Function not implemented.');
  }

  getAll(_callback) {
    this.roomservice.getAll().snapshotChanges().
      pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(rs => {
        console.log('robot');
        console.log(rs[0].battery.percentage);
        console.log(rs[0].location);
        console.log(rs[0].destination);
        console.log(Object.values(rs[0].harmful));
        this.battery = rs[0].battery.percentage
        this.RobishPosition = rs[0].location
        this.TrashPositions = Object.values(rs[0].harmful)
        this.EndPosition = rs[0].destination
        
      })
      _callback();  
  }
  getLocation(): any {
    let result: any;
    this.roomservice.getAll().snapshotChanges().
      pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(rs => {
        result= rs[0].location
      })
      return result
  }
  secondFunction(){

    this.getAll(function() {
        console.log('huzzah, I\'m done!');
    });  

}
 

}
