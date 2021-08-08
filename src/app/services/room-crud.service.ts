import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { harmful } from '../model/harmful';
import { battery } from '../model/battery';
import { Room } from '../model/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomCrudService {

  pathHarmful= '/harmful'
  pathHarmless= '/harmless'
  pathdestination= '/destination'
  pathlocation= '/location'
  pathbattery= '/battery'
  
  harmfulref: AngularFireList<harmful>
  harmlessref: AngularFireList<harmful>
  destination: AngularFireList<harmful>
  location: AngularFireList<harmful>
  battery: AngularFireList<battery>

  robot:AngularFireList<Room>
  
  constructor( private db: AngularFireDatabase) { 
    this.harmfulref=this.db.list(this.pathHarmful)
    this.harmlessref=this.db.list(this.pathHarmless)
    this.destination=this.db.list(this.pathdestination)
    this.location=this.db.list(this.pathlocation)
    this.battery=this.db.list(this.pathbattery)
    this.robot=this.db.list('/')
  }

  getAllHarmful(): AngularFireList<harmful> {
    return this.harmfulref
  }

  getAllHarmless(): AngularFireList<harmful> {
    return this.harmlessref
  }

  getAllDestination(): AngularFireList<harmful> {
    return this.destination
  }

  getAllLocation(): AngularFireList<harmful> {
    return this.location
  }

  getAllBattery(): AngularFireList<battery> {
    return this.battery
  }

  getAll(): AngularFireList<Room> {
    return this.robot
  }

  
  create (location:harmful):any{
    return this.harmfulref.push(location)
  }

  update(key: string, value: any):Promise<any>{
    return this.harmfulref.update(key, value)
  }

  DeleteOne(key:string): Promise<any> {
    return this.harmfulref.remove(key)
  }

  DeleteAll():Promise<any>{
    return this.harmfulref.remove()
  }
}
