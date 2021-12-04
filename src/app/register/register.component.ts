import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Register} from "../modal/register";

import * as CryptoJS from 'crypto-js';
import {Toaster, ToastType} from "ngx-toast-notifications";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: Register;
  encryptedPassword: any;

  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';

  showSpinner: any;

  constructor(private authService : AuthService,
              private toaster: Toaster) {
    this.register = new Register();
    this.showSpinner = false;
  }

  ngOnInit() {
  }

  registerUser(){

    this.showSpinner = true;

    this.encryptedPassword = CryptoJS.AES.encrypt(this.register.password, '@a34#AW').toString();
    this.register.password = this.encryptedPassword;

    this.authService.register(this.register).subscribe(data => {
      //console.log('my data ' + data.response + " / " + data.message);
      this.text = data.message;
      this.showToast();
      window.location.href = "https://localhost/#/login";
    });
  }

  get randomType() {
    return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  }

  showToast() {
    const type = this.randomType;
    this.toaster.open({
      text: this.text,
      caption: type,
      type: type,
    });
  }

}
