import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  form=true

  constructor() { }

  ngOnInit(): void {
  }
  openForm(){
    this.form=false
    window.scroll(0,0);
  }
  closeForm(){
    this.form=true
    window.scroll(0,0);
  }
 }

