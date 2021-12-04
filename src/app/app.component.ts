import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],


})
export class AppComponent {
  title = 'app';

  accessToken: any;

  constructor() {
    this.accessToken = localStorage.getItem("x-access-token");
    if(this.accessToken == undefined){
      window.location.href = "https://localhost/#/login";
    }
  }

  getRouteAnimation(outlet) {

      return outlet.activatedRouteData.animation
  }
}
