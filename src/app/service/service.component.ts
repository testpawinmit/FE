import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Bank, BANKS} from "../customer-profile/demo-data";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {BreedService} from "../services/breed.service";
import {Toaster, ToastType} from "ngx-toast-notifications";
import {Breed} from "../modal/breed";
import {Service} from "../modal/service";
import {ServiceServices} from "../services/service.services";
import { CommonCode } from '../modal/common-code';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit, AfterViewInit, OnDestroy {

  /** list of banks */
  protected banks: Bank[] = BANKS;

  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  pageView: any;
  service: Service;
  responseMessage: any;

  showSpinner: any;
  services:any;

  /*dropdown*/
  public data: any = [
    {name: "Daycare", code: "SC-1"},
    {name: "Boarding", code: "SC-2"},
    {name: "Grooming", code: "SC-3"},
    {name: "Training", code: "SC-4"},
  ];

  public selectedValue: any;
  public searchValue: any;
  public filteredList: any = [];
  public selectedCode: any;
  showEdit: boolean;

  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';

  /*dropdown*/
  editData: any;
  commonCode: CommonCode;

  constructor(private serviceService: ServiceServices,
              private toaster: Toaster,
              private customerService: CustomerService) {
    this.pageView = true;
    this.service = new Service();
    this.showSpinner = false;
    this.getServices();
    this.commonCode = new CommonCode();
  }

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
  /* dropdown */

  /* dropdown */
  selectValue(name, code) {
    this.selectedValue = name;
    this.selectedCode = code;
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

  changeTab(chkClass){
    if(chkClass == 1){
      this.pageView = 1;
    }else if (chkClass == 2){
      this.pageView = 2;
    }else if (chkClass == 3){
      this.pageView = 3;
    }
  }

  createService() {
    this.showSpinner = true;

    this.service.serviceCatCode = this.selectedCode;

    //api call
    this.serviceService.createService(this.service).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();
          this.getServices();

        } else {
          this.text = "Error...";
          this.showSpinner = false;
          this.showToast();
          this.getServices();
        }
      })
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

  getServices() {
    this.showSpinner = true;

    //api call
    this.serviceService.getServices().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.services = response.resources;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.services);
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          //this.showToast();
        }
      })
    });
  }

  viewShowEdit(val){
    this.showEdit = val;
  }

  updateService(serviceCode) {
    this.showSpinner = true;

    var serviceCatName = (<HTMLInputElement>document.getElementById('serviceCatName_' + serviceCode)).value;
    var serviceName = (<HTMLInputElement>document.getElementById('serviceName_' + serviceCode)).value;
    var servicePrice = (<HTMLInputElement>document.getElementById('servicePrice_' + serviceCode)).value;

    this.editData = {
      serviceCode: serviceCode,
      serviceCatCode: serviceCatName,
      serviceName : serviceName,
      servicePrice: servicePrice,
      table: 'Service'
    };

    this.commonCode.code = this.editData;

    //api call
    this.customerService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.getServices();
          this.showToast();
          this.showEdit = null;
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          this.showEdit = null;
          this.getServices();
        }
      })
    });

  }
}
