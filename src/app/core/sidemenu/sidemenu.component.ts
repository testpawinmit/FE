import { Component, OnInit, Input } from '@angular/core';
import { menus } from './menu-element';
import { environment } from '../../../environments/environment.prod';
import { customerMenu } from './customer-menu-element';
import { supplierMenu } from './supplier-menu-element';

@Component({
  selector: 'cdk-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

    @Input() iconOnly:boolean = false;
    public menus;

    userRole = localStorage.getItem('userRole');

    imgURL = environment.imgURL;
    username = localStorage.getItem('username');

    constructor() { }

    ngOnInit() {
      if(this.userRole == 'USROLE-2'){
        this.menus = menus;
      }else if(this.userRole == 'USROLE-3'){
        this.menus = customerMenu;
      }else if(this.userRole == 'USROLE-4'){
        this.menus = supplierMenu;
      }
    }

}
