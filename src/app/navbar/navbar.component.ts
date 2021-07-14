import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll')
  onScroll() {
    let header = document.querySelector('header');
              let windowPosition = window.scrollY > 0;
              header!.classList.toggle('scrolling-active', windowPosition);
  }

}
