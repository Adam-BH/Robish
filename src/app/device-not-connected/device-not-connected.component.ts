import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; 
import { map } from 'rxjs/operators';

import { RoomCrudService } from '../services/room-crud.service';
@Component({
  selector: 'app-device-not-connected',
  templateUrl: './device-not-connected.component.html',
  styleUrls: ['./device-not-connected.component.css']
})
export class DeviceNotConnectedComponent implements OnInit {
  result = false
  code:any

  constructor(private route:Router, private roomservice: RoomCrudService) {
  
   }

  ngOnInit(): void {
  }

  async go(){
    const value = <number>await this.getAll(20,(<HTMLInputElement>document.getElementById("code")).value)
    console.log(`async result: ${value}`);
    console.log("now", this.result)

    if (this.result){
      console.log("now", this.result)
      this.code =  (<HTMLInputElement>document.getElementById("code")).value
      this.roomservice.updateCode("access",{code:this.code}).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.route.navigate(['/','devicec']);

      
    }
    
		
    
    
	}


  getAll(x,code:string): any {
    
    this.roomservice.getAll().snapshotChanges().
      pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(rs => {
        
        for (let i of rs){
          console.log(i)
          if (code==i.key){
            console.log(code==i.key)
            
          this.result = true
          }
        }
        
        
      });
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(x);
        }, 500);
      });

  }

}
