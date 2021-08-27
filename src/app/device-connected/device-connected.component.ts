
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

  code:any
  scanning: any
  battery: any;
  status:any
  trashDetected:any

  center!:any
  bounds!:any

  RobishPosition!: any
  
  TrashPositions: google.maps.LatLngLiteral[]
  EndPosition!: any

  distance:any
  trashKeys: any

  currentPosition: any
  
  harmless: any
  giveLocation=false

  async ngOnInit(): Promise<void> {
    const value2 = <number>await this.getCode(30);
    console.log(`async result: ${value2}`);

    const value0 = <number>await this.getAll(20);
    console.log(`async result: ${value0}`);

    

   
      this.bounds = {
    east: this.RobishPosition.lng,
    north: this.EndPosition.lat,
    south: this.RobishPosition.lat,
    west: this.EndPosition.lng,
  };

  
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



  RobishIcon= {
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

    addMarker(event: google.maps.MapMouseEvent) {
      if (!this.scanning){
      if (this.EndPositions.length>=1) {
        this.EndPositions=[]
        this.EndPositions.push(event.latLng.toJSON());
      }
      else{
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
    
      }

      showBounds(){
       
        if (this.RobishPosition.lng>this.EndPosition.lng) {
          this.bounds={
            east: this.RobishPosition.lng,
            north: this.EndPosition.lat,
            south: this.RobishPosition.lat,
            west: this.EndPosition.lng,
          };
        } else {
          this.bounds={
            east: this.EndPosition.lng,
            north: this.RobishPosition.lat,
            south: this.EndPosition.lat,
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
    fillColor: "light green",
    strokeWeight:1.5	
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

  getCode(x): any {
    
    this.roomservice.getCode().snapshotChanges().
      pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(rs => {
        
        this.code=rs[0].code
      });
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(x);
        }, 500);
      });

  }

  getAll(x) {
    this.roomservice.getAll().snapshotChanges().
      pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(rs => {
      console.log('robot');
       console.log(this.code);
       var i=rs.findIndex(x => x.key === this.code);
       console.log(i)

        
        console.log(rs[i].location);
        
        console.log(rs[i].destination);
        console.log(Object.values(rs[i].harmful));
        this.battery = rs[i].battery.percentage
        this.RobishPosition = rs[i].location
        this.distance = rs[i].distance

        this.TrashPositions = Object.values(rs[i].harmful)
        this.TrashPositions.splice(this.TrashPositions.indexOf({lat:123, lng:123}), 1);
        this.trashKeys = Object.keys(rs[i].harmful)
        this.trashKeys.splice(this.trashKeys.indexOf("static"), 1);

        this.harmless = Object.entries(rs[i].harmless)
        
        this.EndPosition = rs[i].destination
        this.center = rs[i].location
        this.status=rs[i].status==true
        this.trashDetected = this.TrashPositions.length
        if (this.EndPositions.length!=0){
        this.EndPositions.pop()
        }
        this.EndPositions.push(this.EndPosition)
        this.scanning= rs[i].scanning==true || rs[i].scanning=="true"
        this.showBounds()
      })
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(x);
        }, 2000);
      });
  }

  updateLocation(){
    var lat =(<HTMLInputElement>document.getElementById("latitude")).value
    var lng =(<HTMLInputElement>document.getElementById("longitude")).value
    if(lat != "" && lng != ""){
      this.roomservice.updateLocationLat("location",{lat:parseFloat(lat)},this.code).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.roomservice.updateLocationLng("location",{lng:parseFloat(lng)},this.code).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
   
  }

  showInput(state){
    this.giveLocation=state

  }
  
  current(position){
    this.currentPosition=position

  }
  
  updateAccuracy(state){
    var position
    for (var i of this.harmless){
      console.log(i)
      if (i[1].lat==this.currentPosition.lat && i[1].lng==this.currentPosition.lng){
        console.log(i)
        position=i[0]
      }
    }
    this.roomservice.updateAccuracy(position,{accuracy:state},this.code).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  show() {
    console.log(this.RobishPosition, this.TrashPositions, this.EndPosition)
    this.getAll(20)
  }

  removeTrash(){
    for (var index = 0; index < this.trashKeys.length; index++) { 
      this.roomservice.DeleteOne(this.trashKeys[index], this.code).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }
  this.roomservice.update(this.code,{distance:0}).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  }) 
  }

  updateScanning(){
    this.showBounds()
    this.roomservice.update(this.code,{manual:false}).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    this.roomservice.update(this.code,{scanning:true}).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    this.roomservice.update(this.code,{destination:this.EndPositions[0]}).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  
  }

  updateStatus(){
    this.roomservice.update(this.code,{scanning:false}).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    this.roomservice.update(this.code,{status:false}).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  } 
}
