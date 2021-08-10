
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  battery: any;

  center!:any
  bounds!:any

  RobishPosition!: any
  UserPosition!:any
  TrashPositions: google.maps.LatLngLiteral[]
  EndPosition!: any





  async ngOnInit(): Promise<void> {

    const value = <number>await this.getAll(20);
    console.log(`async result: ${value}`);

    const value0 = <number>await this.geolocation(20);
    console.log(`async result: ${value0}`);

   
      this.bounds = {
    east: this.RobishPosition.lng,
    north: this.EndPosition.lat,
    south: this.RobishPosition.lat,
    west: this.EndPosition.lng,
  };

  
  }


  show() {
    console.log(this.RobishPosition, this.TrashPositions, this.EndPosition, this.UserPosition)
   
  }
  apiLoaded: Observable<boolean>;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  openInfoWindow(marker: MapMarker) {
  this.infoWindow.open(marker)
  }


  constructor( httpClient: HttpClient, private roomservice: RoomCrudService) {

    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyD_LibaclCk7zdY1BRY4FIsRU_lpgoWzRI', 'callback')
    .pipe(
      map(() => true, console.log("done")),
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
      zoom: 15,
      styles: [{
        featureType: 'poi',
        stylers: [
          { visibility: 'off' }
        ]
      }]
    } 
      
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

    EndPositions: google.maps.LatLngLiteral[] = [];
    i = 0

    addMarker(event: google.maps.MapMouseEvent) {
      this.EndPositions.push(event.latLng.toJSON());
      this.i++
      if (this.i>1) {
        this.EndPositions=[]
        this.EndPositions.push(event.latLng.toJSON());
      }
      if (this.RobishPosition.lng>this.EndPositions[0].lng) {
        this.bounds={
          east: this.RobishPosition.lng,
          north: this.EndPositions[0].lat,
          south: this.RobishPosition.lat,
          west: this.EndPositions[0].lng,
        };
      } else {
        this.bounds={
          east: this.EndPositions[0].lng,
          north: this.RobishPosition.lat,
          south: this.EndPositions[0].lat,
          west: this.RobishPosition.lng,
        };
      }
      
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
   
  }
  boundsOptions={
    clickable : false,
    draggable: false,
    fillColor: "green",
    strokeWeight: 10	
  }

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


   deleteMarkers() {
    this.TrashPositions = [];
    this.EndPositions = [];
    this.bounds={
          east: this.RobishPosition.lng,
          north:this.RobishPosition.lng,
          south: this.RobishPosition.lng,
          west: this.RobishPosition.lng,
    };
  }
  





  getElementById(arg0: string): any {
    throw new Error('Function not implemented.');
  }

  getAll(x) {
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
        this.center = rs[0].location
      })
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(x);
        }, 2000);
      });
  }


  geolocation(x){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.UserPosition ={
          lat:position.coords.longitude,
          lng:position.coords.latitude
  }
      });
  } else {
     console.log("No support for geolocation")
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
  
  
  
  }





}
