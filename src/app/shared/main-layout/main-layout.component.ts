import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {
  public emailUser: string;

  constructor() { }

  ngOnInit(): void {
    this.emailUser = localStorage.getItem('email');
  }

}
