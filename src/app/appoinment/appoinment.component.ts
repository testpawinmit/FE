import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Bank, BANKS} from "../customer-profile/demo-data";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {CommonCode} from "../modal/common-code";
import {CustomerService} from "../services/customer.service";
import {Vaccination} from "../modal/vaccination";
import {Appointment} from "../modal/appointment";
import {AppointmentService} from "../services/appointment.service";
import {Toaster, ToastType} from "ngx-toast-notifications";
import {ResourceService} from "../services/resource.service";
import {EmployeeService} from "../services/employee.service";
import { environment } from '../../environments/environment.prod';

//import * as jspdf from 'jspdf';

@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.scss']
})
export class AppoinmentComponent implements OnInit, AfterViewInit, OnDestroy {

  /** list of banks */
  protected banks: Bank[] = BANKS;

  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect', {static: true}) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  pageView: any;
  commonCode: CommonCode;


  responseMessage: any;
  showSpinner: any;
  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';
  pets: any;
  code: any;

  vaccination: any;
  petCodes: any;
  appointment: any;

  checked1: any = false;

  map: any;
  showRoom: any;
  showEmp: any;

  serviceCatCode: any;
  resources: any;
  employees: any;
  serviceName: any;
  dates: any;
  noOfPets: any;
  noOfDays: any;
  price: any;
  total: any;

  appointmentCode: any;
  searchData: any = null;
  imgURL = environment.imgURL;

  isVal1: boolean;
  isVal2: boolean;
  isVal3: boolean;
  isVal4: boolean;
  isVal5: boolean;
  isVal6: boolean;
  isVal7: boolean;
  isVal8: boolean;

  today = new Date();

  constructor(public appointmentService: AppointmentService, private resourceService: ResourceService, private employeeService: EmployeeService,
              private toaster: Toaster,
              public customerService: CustomerService) {
    this.pageView = true;

    this.commonCode = new CommonCode();

    this.getPets();

    this.vaccination = new Vaccination();
    this.petCodes = new Array();
    this.appointment = new Appointment();

    this.map = new Map();

    this.showRoom = false;
    this.showEmp = false;
    this.getResources();
    //this.getEmployees();

  }

  /*dropdown*/
  public data: any = [
    {name: "Daycare", code: "SC-1"},
    {name: "Boarding", code: "SC-2"},
    {name: "Grooming", code: "SC-3"},
    {name: "Training", code: "SC-4"},
  ];

  public serviceData: any = [
    {name: "Full day"},
    {name: "Half day"},
    {name: "Bath"},
    {name: "Hair Cut"},

  ];

  public roomData: any = [
    {name: "Dulax"},
    {name: "Superior"},

  ];

  public employeeData: any = [
    {name: "Nethmini"},
    {name: "Buddhika"},
    {name: "Nipuna"},
    {name: "Chathu"},

  ];

  public selectedValue: any;
  public searchValue: any;
  public filteredList: any = [];

  public serviceSelectedValue: any;
  public serviceSelectedValueCode: any;
  public serviceSearchValue: any;
  public serviceFilteredList: any = [];

  public roomSelectedValue: any;
  public roomSearchValue: any;
  public roomFilteredList: any = [];

  public employeeSelectedValue: any;
  public employeeSearchValue: any;
  public employeeFilteredList: any = [];

  /*dropdown*/

  ngOnInit(): void {
    // set initial selection
    this.bankCtrl.setValue(this.banks[10]);

    // load the initial bank list
    this.filteredBanks.next(this.banks.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });

    /* dropdown */
    this.filteredList = this.data;
    this.serviceFilteredList = this.serviceData;
    this.roomFilteredList = this.roomData;
    this.employeeFilteredList = this.employeeData;
    /* dropdown */
  }

  /* dropdown */
  filterDropdown(e) {
    console.log("e in filterDropdown -------> ", e);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    let searchString = e.toLowerCase();
    if (!searchString) {
      this.filteredList = this.data.slice();
      return;
    } else {
      this.filteredList = this.data.filter(
        user => user.name.toLowerCase().indexOf(searchString) > -1
      );
    }
    window.scrollTo(window.scrollX, window.scrollY - 1);
    console.log("this.filteredList indropdown -------> ", this.filteredList);
  }

  serviceFilterDropdown(e) {
    console.log("e in filterDropdown -------> ", e);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    let searchString = e.toLowerCase();
    if (!searchString) {
      this.serviceFilteredList = this.serviceData.slice();
      return;
    } else {
      this.serviceFilteredList = this.serviceData.filter(
        user => user.name.toLowerCase().indexOf(searchString) > -1
      );
    }
    window.scrollTo(window.scrollX, window.scrollY - 1);
    console.log("this.filteredList indropdown -------> ", this.filteredList);
  }

  roomFilterDropdown(e) {
    console.log("e in filterDropdown -------> ", e);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    let searchString = e.toLowerCase();
    if (!searchString) {
      this.roomFilteredList = this.roomData.slice();
      return;
    } else {
      this.roomFilteredList = this.roomData.filter(
        user => user.name.toLowerCase().indexOf(searchString) > -1
      );
    }
    window.scrollTo(window.scrollX, window.scrollY - 1);
    console.log("this.filteredList indropdown -------> ", this.filteredList);
  }

  employeeFilterDropdown(e) {
    console.log("e in filterDropdown -------> ", e);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    let searchString = e.toLowerCase();
    if (!searchString) {
      this.employeeFilteredList = this.employeeData.slice();
      return;
    } else {
      this.employeeFilteredList = this.employeeData.filter(
        user => user.name.toLowerCase().indexOf(searchString) > -1
      );
    }
    window.scrollTo(window.scrollX, window.scrollY - 1);
    console.log("this.filteredList indropdown -------> ", this.filteredList);
  }

  /* dropdown */

  /* dropdown */
  selectValue(name, code) {
    this.selectedValue = name;
    this.serviceCatCode = code;

    if (name === "Daycare" || name === "Boarding") {
      this.showRoom = true;
    } else {
      this.showRoom = false;
    }

    if (name === "Grooming" || name === "Training") {
      this.showEmp = true;
    } else {
      this.showEmp = false;
    }

    this.serviceData = null;
    this.getService();

  }

  serviceSelectValue(name, code) {
    this.serviceSelectedValue = name;
    this.serviceSelectedValueCode = code;
  }

  roomSelectValue(name) {
    this.roomSelectedValue = name;
  }

  employeeSelectValue(name) {
    this.employeeSelectedValue = name;
  }

  /* dropdown */

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  changeTab(chkClass) {
    if (chkClass == 1) {
      this.pageView = 1;
    } else if (chkClass == 2) {
      this.pageView = 2;
    } else if (chkClass == 3) {
      this.pageView = 3;
    }
  }

  getPets() {
    this.showSpinner = true;

    this.code = {
      username: localStorage.getItem("username")
    }

    this.commonCode.code = this.code;

    //api call
    this.customerService.getPets(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.pets = response.pets;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.pets);
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          //this.showToast();
        }
      })
    });
  }

  selectPet(pet) {
    this.petCodes.push(pet.petCode);
    console.log(this.petCodes);

    if (!this.map.has(pet.petCode)) {
      this.map.set(pet.petCode, true);
    } else {
      this.map.delete(pet.petCode);
    }

    console.log(this.map);

    pet.checkElement ? pet.checkElement = false : pet.checkElement = true;

    console.log(pet.checkElement);
  }

  createAppointment() {

    this.showSpinner = true;

    this.appointment.serviceCatCode = this.selectedValue;
    this.appointment.serviceCode = this.serviceSelectedValueCode;
    this.appointment.roomCode = this.roomSelectedValue;
    this.appointment.empCode = this.employeeSelectedValue;

    this.isVal7 = false;
    this.isVal8 = false;

    if(this.appointment.serviceCatCode == undefined){
      this.isVal1 = true;
    }else {
      this.isVal1 = false;
    }
    if(this.appointment.serviceCode == undefined){
      this.isVal2 = true;
    }else {
      this.isVal2 = false;
    }
    if(this.appointment.checkInDate == undefined){
      this.isVal3 = true;
    }else {
      this.isVal3 = false;
    }
    if(this.appointment.checkInTime == undefined){
      this.isVal4 = true;
    }else {
      this.isVal4 = false;
    }
    if(this.appointment.checkOutDate == undefined){
      this.isVal5 = true;
    }else {
      this.isVal5 = false;
    }
    if(this.appointment.checkOutTime == undefined){
      this.isVal6 = true;
    }else {
      this.isVal6 = false;
    }
    if(this.appointment.checkInDate > this.appointment.checkOutDate){
      this.isVal3 = true;
      this.isVal5 = true;
    }
    if(this.appointment.serviceCatCode == 'Daycare' || this.appointment.serviceCatCode == 'Boarding'){
      if(this.appointment.roomCode == undefined){
        this.isVal7 = true;
      }else {
        this.isVal7 = false;
      }
    }else {
      if(this.appointment.empCode == undefined){
        this.isVal8 = true;
      }else {
        this.isVal8 = false;
      }
    }

    let jsonObject = {};
    this.map.forEach((value, key) => {
      jsonObject[key] = value
    });

    this.appointment.petCodes = JSON.stringify(jsonObject);

    if(!this.isVal1 && !this.isVal2 && !this.isVal3 && !this.isVal4 && !this.isVal5 && !this.isVal6 && !this.isVal7 && !this.isVal8 && !this.isVal8) {
      //api call
      this.appointmentService.createAppointment(this.appointment).then(data => {

        data.subscribe((response) => {

          this.responseMessage = response.message;

          if (response.response === 'Ok') {

            console.log(response);

            this.serviceName = response.invoice.serviceName;
            this.dates = response.invoice.dates;
            this.noOfPets = response.invoice.noOfPets;
            this.noOfDays = response.invoice.noOfDays;
            this.price = response.invoice.price;
            this.total = response.invoice.total;

            this.appointmentCode = response.appointmentCode;

            this.showSpinner = false;
            this.text = this.responseMessage;
            this.showToast();
          } else {
            this.text = "Error...";
            this.showSpinner = false;
            this.showToast();
          }
        })
      });

      this.pageView = 3;
    }

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

  getService() {
    this.showSpinner = true;

    this.code = {
      serviceCatCode: this.serviceCatCode
    };

    this.commonCode.code = this.code;

    //api call
    this.appointmentService.getServiceByServiceCatCode(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.serviceData = response.serviceData;
          this.serviceFilteredList = this.serviceData;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.serviceData);
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          //this.showToast();
        }
      })
    });
  }

  getResources() {
    this.showSpinner = true;


    //api call
    this.resourceService.getResources().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.roomData = response.resources;
          this.roomFilteredList = this.roomData;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.roomData);
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          //this.showToast();
        }
      })
    });
  }

  getEmployees() {
    this.showSpinner = true;

    //api call
    this.employeeService.getEmployees().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.employeeData = response.employees;
          this.employeeFilteredList = this.employeeData;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.employeeData);
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          //this.showToast();
        }
      })
    });
  }

  savePayment(value) {
    this.showSpinner = true;

    this.code = {
      appointmentCode: this.appointmentCode,
      paymentType: value
    };

    this.commonCode.code = this.code;
    console.log(this.code);

    //api call
    this.appointmentService.savePayment(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          //this.serviceData = response.serviceData;
          //this.serviceFilteredList = this.serviceData;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.serviceData);
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          //this.showToast();
        }
      })
    });
  }

  getEmployeeByDateRange() {

    this.showSpinner = true;

    this.searchData = {
      checkInDate: this.appointment.checkInDate,
      checkOutDate: this.appointment.checkOutDate
    };

    this.commonCode.code = this.searchData;

    //api call
    this.employeeService.getEmployeeByDateRange(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.employeeData = response.employees;
          this.employeeFilteredList = this.employeeData;

          console.log(this.employeeData);

        } else {
          this.text = "Error...";
          this.showSpinner = false;
          //this.showToast();
        }
      })
    });

  }

  getEmployeeByDate() {
    this.showSpinner = true;

    this.searchData = {
      selectedDate: this.appointment.checkInDate
    };

    this.commonCode.code = this.searchData;

    console.log(this.commonCode);

    //api call
    this.employeeService.getEmployeeByDate(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.employeeData = response.employees;
          this.employeeFilteredList = this.employeeData;
        } else {
          this.text = "Error...";
          this.showSpinner = false;
        }
      })
    });
  }

}
