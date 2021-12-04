import { Component, OnInit, Input } from '@angular/core';
import { ToolbarHelpers } from './toolbar.helpers';

@Component({
  selector: 'cdk-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() sidenav;
	@Input() sidebar;
	@Input() drawer;
	@Input() matDrawerShow;

	searchOpen: boolean = false;
    toolbarHelpers = ToolbarHelpers;

    username: any;
    reloadCount: any;

  	constructor() {
  	  this.username = localStorage.getItem("username");
  	  this.reloadCount = localStorage.getItem("reloadCount");

  	  if (this.reloadCount == undefined){
  	    window.location.reload();
        localStorage.setItem("reloadCount", "1");
      }
    }

  	ngOnInit() {
  	}

}
