import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Bank, BANKS} from "../customer-profile/demo-data";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {ServiceServices} from "../services/service.services";
import {Toaster, ToastType} from "ngx-toast-notifications";
import {ServiceDogServices} from "../services/serviceDog.service";
import {Service} from "../modal/service";
import {ServiceDog} from "../modal/service_dog";
import {BreedService} from "../services/breed.service";
import {ColorService} from "../services/color.service";
import { CustomerService } from '../services/customer.service';
import { CommonCode } from '../modal/common-code';

@Component({
  selector: 'app-service-dogs',
  templateUrl: './service-dogs.component.html',
  styleUrls: ['./service-dogs.component.scss']
})
export class ServiceDogsComponent implements OnInit, AfterViewInit, OnDestroy {

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
  serviceDog: ServiceDog;
  responseMessage: any;
  showSpinner: any;
  serviceDogs:any;
  showEdit: boolean;
  editData: any;
  commonCode: CommonCode;

  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';

  public breed: any = [
    {name: "German Shepherd"},
    {name: "BullDog"},
    {name: "Husky"},
    {name: "Labrador Retriever"},
    {name: "Golden Retriever"},
    {name: "Cat"}
  ];

  public color: any = [
    {name: "Black"},
    {name: "White"},
    {name: "Brown"},
    {name: "Orange"},
  ];

  isVal1: boolean;
  isVal2: boolean;
  isVal3: boolean;

  today = new Date();

  constructor(private serviceDogService: ServiceDogServices,
              private toaster: Toaster,
              private breedService: BreedService,
              private colorService: ColorService,
              private customerService: CustomerService,
  ) {
    this.pageView = true;
    this.serviceDog = new ServiceDog();
    this.showSpinner = false;
    this.getServiceDogs();
    this.getBreeds();
    this.getColors();
    this.commonCode= new CommonCode();
  }

  public breedSelectedValue: any;
  public breedSelectedValueName: any;
  public breedSearchValue: any;
  public breedFilteredList: any = [];

  public colorSelectedValue: any;
  public colorSelectedValueName: any;
  public colorSearchValue: any;
  public colorFilteredList: any = [];

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

    this.colorFilteredList = this.color;
  }

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

  getServiceDogs() {
    this.showSpinner = true;

    //api call
    this.serviceDogService.getServiceDogs().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.serviceDogs = response.serviceDogs;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.serviceDogs);
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          //this.showToast();
        }
      })
    });
  }

  breedFilterDropdown(e) {
    console.log("e in filterDropdown -------> ", e);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    let searchString = e.toLowerCase();
    if (!searchString) {
      this.breedFilteredList = this.breed.slice();
      return;
    } else {
      this.breedFilteredList = this.breed.filter(
        user => user.name.toLowerCase().indexOf(searchString) > -1
      );
    }
    window.scrollTo(window.scrollX, window.scrollY - 1);
    console.log("this.filteredList indropdown -------> ", this.breedFilteredList);
  }

  breedSelectValue(code, name) {
    this.breedSelectedValue = code;
    this.breedSelectedValueName = name;
  }

  colorFilterDropdown(e) {
    console.log("e in filterDropdown -------> ", e);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    let searchString = e.toLowerCase();
    if (!searchString) {
      this.colorFilteredList = this.color.slice();
      return;
    } else {
      this.colorFilteredList = this.color.filter(
        user => user.name.toLowerCase().indexOf(searchString) > -1
      );
    }
    window.scrollTo(window.scrollX, window.scrollY - 1);
    console.log("this.filteredList indropdown -------> ", this.colorFilteredList);
  }

  colorSelectValue(code, name) {
    this.colorSelectedValue = code;
    this.colorSelectedValueName = name;
  }

  createServiceDogs() {

    this.serviceDog.breedCode = this.breedSelectedValue;
    this.serviceDog.colorCode = this.colorSelectedValue;

    if (this.serviceDog.serviceDogName == undefined || this.serviceDog.serviceDogName == "") {
      this.isVal1 = true;
    } else {
      this.isVal1 = false;
    }
    if (this.serviceDog.serviceDogDob == undefined || this.serviceDog.serviceDogDob == "") {
      this.isVal2 = true;
    } else {
      this.isVal2 = false;
    }
    if (this.serviceDog.breedCode == undefined || this.serviceDog.breedCode == "") {
      this.isVal3 = true;
    } else {
      this.isVal3 = false;
    }

    if(!this.isVal1 && !this.isVal2 && !this.isVal3) {
      this.showSpinner = true;
      //api call
      this.serviceDogService.createServiceDogs(this.serviceDog).then(data => {

        data.subscribe((response) => {

          this.responseMessage = response.message;

          if (response.response === 'Ok') {
            this.showSpinner = false;
            this.text = this.responseMessage;
            this.showToast();
            this.getServiceDogs();

          } else {
            this.text = "Error...";
            this.showSpinner = false;
            this.showToast();
            this.getServiceDogs();
          }
        })
      });
    }
  }

  getBreeds() {
    this.showSpinner = true;

    //api call
    this.breedService.getBreeds().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.breed = response.breeds;
          this.breedFilteredList = this.breed;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.breed);
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          //this.showToast();
        }
      })
    });
  }

  getColors() {
    this.showSpinner = true;

    //api call
    this.colorService.getColors().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.color = response.colors;
          this.colorFilteredList = this.color;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.color);
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

  updateServiceDog(code){
    this.showSpinner = true;

    var serviceDogName = (<HTMLInputElement>document.getElementById('serviceDogName_' + code)).value;
    var serviceDogDob = (<HTMLInputElement>document.getElementById('serviceDogDob_' + code)).value;
    var breed = (<HTMLInputElement>document.getElementById('breed_' + code)).value;
    var color = (<HTMLInputElement>document.getElementById('color_' + code)).value;
    var note = (<HTMLInputElement>document.getElementById('note_' + code)).value;

    this.editData = {
      serviceDogCode: code,
      serviceDogName: serviceDogName,
      serviceDogDob : serviceDogDob,
      breedCode: breed,
      colorCode: color,
      note: note,
      table: 'ServiceDog'
    };

    this.commonCode.code = this.editData;

    //api call
    this.customerService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.getServiceDogs();
          this.showToast();
          this.showEdit = null;
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          this.showEdit = null;
        }
      })
    });
  }

}
