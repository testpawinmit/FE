import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Bank, BANKS} from "../customer-profile/demo-data";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {Toaster, ToastType} from "ngx-toast-notifications";
import {Veterinary} from "../modal/veterinary";
import {VeterinaryService} from "../services/veterinary.service";
import { CommonCode } from '../modal/common-code';

@Component({
  selector: 'app-veterinary',
  templateUrl: './veterinary.component.html',
  styleUrls: ['./veterinary.component.scss']
})
export class VeterinaryComponent implements OnInit, AfterViewInit, OnDestroy {

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
  veterinary: Veterinary;

  showSpinner: any;
  responseMessage: any;
  veterinarians:any;
  showEdit: boolean;
  editData:any;
  commonCode: CommonCode;
  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';

  isVal1: boolean;
  isVal2: boolean;
  isVal3: boolean;

  constructor(private veterinaryService: VeterinaryService,
              private toaster: Toaster) {
    this.pageView = true;
    this.veterinary = new Veterinary();
    this.showSpinner = false;
    this.getVeterinary();
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

  createVeterinary() {

    if (this.veterinary.vetName == undefined || this.veterinary.vetName == "") {
      this.isVal1 = true;
    } else {
      this.isVal1 = false;
    }
    if (this.veterinary.vetPhone == undefined || this.veterinary.vetPhone == "" || !this.validatePhoneNo(this.veterinary.vetPhone)) {
      this.isVal2 = true;
    } else {
      this.isVal2 = false;
    }
    if (this.veterinary.vetAddress == undefined || this.veterinary.vetAddress == "") {
      this.isVal3 = true;
    } else {
      this.isVal3 = false;
    }

    if(!this.isVal1 && !this.isVal2 && !this.isVal3 && this.validatePhoneNo(this.veterinary.vetPhone)) {
      this.showSpinner = true;
      //api call
      this.veterinaryService.createVeterinary(this.veterinary).then(data => {

        data.subscribe((response) => {

          this.responseMessage = response.message;

          if (response.response === 'Ok') {
            this.showSpinner = false;
            this.text = this.responseMessage;
            this.showToast();
            this.getVeterinary();

          } else {
            this.text = "Error...";
            this.showSpinner = false;
            this.showToast();
            this.getVeterinary();
          }
        })
      });
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

  getVeterinary() {
    this.showSpinner = true;



    //api call
    this.veterinaryService.getVeterinary().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.veterinarians = response.veterinarians;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.veterinarians);
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

  updateVeterinary(vetCode) {
    this.showSpinner = true;

    var vetName = (<HTMLInputElement>document.getElementById('vetName_' + vetCode)).value;
    var vetPhone = (<HTMLInputElement>document.getElementById('vetPhone_' + vetCode)).value;
    var vetAddress = (<HTMLInputElement>document.getElementById('vetAddress_' + vetCode)).value;

    this.editData = {
      vetCode: vetCode,
      vetName: vetName,
      vetPhone : vetPhone,
      vetAddress: vetAddress,
      table: 'Veterinary'


    };

    this.commonCode.code = this.editData;

    //api call
    this.veterinaryService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();
          this.showEdit = null;
          this.getVeterinary();
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          this.showEdit = null;
        }
      })
    });

  }

  validatePhoneNo(phoneNo)
  {
    if (/^\d{10}$/.test(phoneNo))
    {
      return (true)
    }
    return (false)
  }
}
