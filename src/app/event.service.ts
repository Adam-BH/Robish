import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private codeMessageSource = new Subject<string>();
  codeMessage$ = this.codeMessageSource.asObservable();

  constructor() { }

  sendCode(code:string){
    this.codeMessageSource.next(code)
  }
}
