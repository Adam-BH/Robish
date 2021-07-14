import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
   openForm() {
    document.getElementById("myForm").style.display = "block";
}

  closeForm() {
    document.getElementById("myForm").style.display = "none";
}
 }

