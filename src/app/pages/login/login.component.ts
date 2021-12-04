import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CommonService} from "../../services/common.service";
import {AuthService} from "../../services/auth.service";
import {API_CONST} from "../../core/const";
import {HttpResponse} from "@angular/common/http";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Please enter your email',
      'email': 'please enter your vaild email'
    },
    'password': {
      'required': 'please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };

  showSpinner: any;

  constructor(private router: Router,
              private fb: FormBuilder,
              private encrypt:CommonService,
              private auth:AuthService) {

    this.showSpinner = false;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    // if (!this.userForm) {
    //   return;
    // }
    // const form = this.userForm;
    // for (const field in this.formErrors) {
    //   if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
    //     this.formErrors[field] = '';
    //     const control = form.get(field);
    //     if (control && control.dirty && !control.valid) {
    //       const messages = this.validationMessages[field];
    //       for (const key in control.errors) {
    //         if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
    //           this.formErrors[field] += messages[key] + ' ';
    //         }
    //       }
    //     }
    //   }
    // }
  }
  login() {
    this.showSpinner = true;
    //this.router.navigate(['/']);
    this.auth.login(
      this.userForm.value.email,
      this.encrypt.encrypt_password(this.userForm.value.password),
      API_CONST.APP_TYPE_CODE,
      API_CONST.MACHINE
    ).subscribe((res: HttpResponse<any>) => {
      console.log('inside the login method');
      console.log(res);

      if (res.body.response === "Ok") {
        //   console.log('OKOKOK');
        //this.snackBar.open('Succesfully logged in', 'dismiss', { duration: 5000 });
        this.router.navigateByUrl('dashboard');
        this.showSpinner = false;
      }

      else if(res.body.message === "User is Inactive."){
        //this.snackBar.open('User is inactive', 'dismiss', { duration: 5000 });
        this.showSpinner = false;
      }
      else {
        //this.snackBar.open('Invalid Credentials', 'Try Again', { duration: 5000 });
        this.showSpinner = false;
      }
    })
  }
}

