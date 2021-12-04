import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Bank, BANKS } from '../customer-profile/demo-data';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { Toaster, ToastType } from 'ngx-toast-notifications';
import { SupplierService } from '../services/supplier.service';
import { RetailService } from '../services/retail.service';
import { CommonCode } from '../modal/common-code';
import { CustomerRetail } from '../modal/customer_retail';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.scss']
})
export class RetailComponent implements OnInit, AfterViewInit, OnDestroy {

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
  showSpinner: any;
  responseMessage: any;
  retails: any;

  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';

  code: any;
  commonCode: CommonCode;
  commonCode1: CommonCode;
  commonCode2: CommonCode;

  list1: any;
  list2: any;
  list3: any;

  retailName: any;
  retailPrice: any;
  retailCount: any;
  retailPriceOld: any;
  retailCode: any;
  customerRetail: CustomerRetail;

  isVal1: boolean;
  frontURL = environment.frontURL;

  cart: any;
  totalAmount: any;
  retailCode1: any;

  imgURL = environment.imgURL;

  constructor(private retailService: RetailService,
              private toaster: Toaster) {
    this.pageView = true;
    this.getRetailAll();

    this.commonCode = new CommonCode();
    this.commonCode1 = new CommonCode();
    this.commonCode2 = new CommonCode();

    this.showSpinner = false;
    this.retailCount = 1;
    this.customerRetail = new CustomerRetail();

    this.selectCategory('All Categories');
    this.getAllRetailByCustomer();
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

  changeTab(chkClass) {
    if (chkClass == 1) {
      this.pageView = 1;
    } else if (chkClass == 2) {
      this.pageView = 2;
    } else if (chkClass == 3) {
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
      type: type
    });
  }

  getRetailAll() {
    this.showSpinner = true;

    //api call
    this.retailService.getRetailAll().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.retails = response.stocks;

          console.log(this.retails);
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          //this.showToast();
        }
      });
    });
  }

  selectCategory(value) {

    console.log(value);

    this.showSpinner = true;

    let myCode;

    myCode = {
      retailCatCode: value
    };

    console.log(myCode);

    this.commonCode1.code = myCode;

    console.log(this.commonCode1);

    //api call
    this.retailService.getRetailByCategory(this.commonCode1).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.list1 = response.list1;
          this.list2 = response.list2;
          this.list3 = response.list3;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.list1);
          console.log(this.list2);
          console.log(this.list3);
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          //this.showToast();
        }
      });
    });
  }

  getValueOfRetail(value1, value2, value3) {
    this.retailName = value1;
    this.retailPrice = value2;
    this.retailPriceOld = value2;
    this.retailCode = value3;
  }

  calculatePrice(value) {
    this.retailPrice = this.retailPriceOld * value;
  }

  addCustomerRetail(retailPrice, retailCount, retailCode) {
    this.showSpinner = true;
    this.customerRetail.retailCode = retailCode;
    this.customerRetail.quantity = retailCount;
    this.customerRetail.custCode = localStorage.getItem('username');
    this.customerRetail.totalPrice = retailPrice;

    //api call
    this.retailService.createCustomerRetail(this.customerRetail).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();
          /* this.getEmployees();*/
          this.retailCount = 1;
          this.getAllRetailByCustomer();
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showToast();
          this.retailCount = 1;
          /*this.getEmployees();*/
        }
      });
    });
  }

  addAndCheckout(retailPrice, retailCount, retailCode) {
    if (this.validatePositiveInteger(retailCount)) {
      this.addCustomerRetail(retailPrice, retailCount, retailCode);
      this.isVal1 = false;
      window.location.href = this.frontURL + 'dashboard';
    } else {
      this.isVal1 = true;
    }
  }

  addAndProductSearch(retailPrice, retailCount, retailCode) {
    if (this.validatePositiveInteger(retailCount)) {
      this.addCustomerRetail(retailPrice, retailCount, retailCode);
      this.isVal1 = false;
    } else {
      this.isVal1 = true;
      alert('Please select a valid Quantity');
    }
  }

  validatePositiveInteger(input) {
    if (/^[1-9]\d*$/.test(input)) {
      return (true);
    }
    return (false);
  }

  getAllRetailByCustomer() {

    this.showSpinner = true;



    let mycode = {
      username: localStorage.getItem('username')
    };

    this.commonCode2.code = mycode;

    //api call
    this.retailService.getAllRetailByCustomer(this.commonCode2).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;
        console.log(response);

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;

          this.cart = response.cart;
          this.totalAmount = response.totalAmount;

        } else {
          this.text = 'Error...';
          this.showSpinner = false;
        }
      });
    });
  }

}
