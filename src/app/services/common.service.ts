import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor() {

  }

  encrypt_password(password: string) {
    return CryptoJS.AES.encrypt(password, '@a34#AW').toString();
    //return 'U2FsdGVkX1+pVviQc6ZCzbbbiFBWepQBYRqgz1tszss=';
  }

  decrypt_password(password: string) {
    //return cryptoJS.AES.decrypt()
    return null;
  }


}



//U2FsdGVkX19B/hJOUw2iczix9FM8T9iIr7lLB79Tou0=
//U2FsdGVkX1+pVviQc6ZCzbbbiFBWepQBYRqgz1tszss=
