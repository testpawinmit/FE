import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Bank, BANKS } from '../customer-profile/demo-data';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { SupplierService } from '../services/supplier.service';
import { Toaster, ToastType } from 'ngx-toast-notifications';
import { Retail } from '../modal/retail';
import { SupplierRetail } from '../modal/supplier-retail';
import { CommonCode } from '../modal/common-code';
import { CustomerService } from '../services/customer.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFileService } from '../services/upload-file.service';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit, AfterViewInit, OnDestroy {

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

  tabClass1: any;
  tabClass2: any;
  viewTab: any;
  showSpinner: any;
  responseMessage: any;

  tabButton1: any;
  tabButton2: any;
  retail: any;
  supplierRetail: any;
  fullSupplierReport: any;

  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';

  retails: any;

  stocks: any;
  showEdit: boolean;
  editData: any;
  commonCode: CommonCode;

  isVal1: boolean;
  isVal2: boolean;
  isVal3: boolean;
  isVal4: boolean;
  isVal5: boolean;
  isVal6: boolean;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileName: any;

  fileInfos: Observable<any>;

  imgURL = environment.imgURL;
  userRole = localStorage.getItem('userRole');
  username = localStorage.getItem('username');

  commonCode1: CommonCode;
  commonCode2: CommonCode;
  supData: any;
  searchDate: any = null;

  constructor(private supplierService: SupplierService,
              private toaster: Toaster,
              private customerService: CustomerService,
              private uploadService: UploadFileService) {
    this.pageView = true;
    this.tabClass1 = 'active';
    this.tabClass2 = 'inactive';
    this.viewTab = true;
    this.showSpinner = false;
    this.tabButton1 = true;

    this.retail = new Retail();
    this.getRetails();
    this.supplierRetail = new SupplierRetail();

    if(this.userRole == 'USROLE-2') {
      this.getStocks();
    }
    this.commonCode = new CommonCode();
    this.commonCode1 = new CommonCode();

    if(this.userRole == 'USROLE-4') {
      this.getStocksBySupplier();
    }

    this.commonCode2 = new CommonCode();
  }

  /*dropdown*/
  public retailCategory: any = [
    { name: 'Foods' },
    { name: 'Clothes' },
    { name: 'Toys' },
    { name: 'Collar' },
    { name: 'Other' }
  ];

  public itemRetail: any = [
    { name: 'Milk' }
  ];

  public retailCategorySelectedValue: any;
  public retailCategorySearchValue: any;
  public retailCategoryFilteredList: any = [];

  public itemRetailSelectedValue: any;
  public itemRetailSelectedValueCode: any;
  public itemRetailSearchValue: any;
  public itemRetailFilteredList: any = [];

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
    this.retailCategoryFilteredList = this.retailCategory;
    this.itemRetailFilteredList = this.itemRetail;
    /* dropdown */
  }

  retailCategoryFilterDropdown(e) {
    console.log('e in filterDropdown -------> ', e);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    let searchString = e.toLowerCase();
    if (!searchString) {
      this.retailCategoryFilteredList = this.retailCategory.slice();
      return;
    } else {
      this.retailCategoryFilteredList = this.retailCategory.filter(
        user => user.name.toLowerCase().indexOf(searchString) > -1
      );
    }
    window.scrollTo(window.scrollX, window.scrollY - 1);
    console.log('this.filteredList indropdown -------> ', this.retailCategoryFilteredList);
  }

  retailCategorySelectValue(name) {
    this.retailCategorySelectedValue = name;
  }

  retailFilterDropdown(e) {
    console.log('e in filterDropdown -------> ', e);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    let searchString = e.toLowerCase();
    if (!searchString) {
      this.itemRetailFilteredList = this.retail.slice();
      return;
    } else {
      this.itemRetailFilteredList = this.retail.filter(
        user => user.name.toLowerCase().indexOf(searchString) > -1
      );
    }
    window.scrollTo(window.scrollX, window.scrollY - 1);
    console.log('this.filteredList indropdown -------> ', this.itemRetailFilteredList);
  }

  retailItemSelectValue(code, name) {
    this.itemRetailSelectedValue = name;
    this.itemRetailSelectedValueCode = code;
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

  /*changeTab(chkClass){
    if(chkClass == 1){
      this.pageView = 1;
    }else if (chkClass == 2){
      this.pageView = 2;
    }else if (chkClass == 3){
      this.pageView = 3;
    }
  }*/

  changeTab(chkClass) {
    if (chkClass == 1) {

      this.pageView = 1;

      //window.location.reload();
      this.tabClass1 = 'active';
      this.tabClass2 = 'inactive';

      this.tabButton1 = true;
      this.tabButton2 = false;

    } else if (chkClass == 2) {

      this.pageView = 2;

      this.tabClass2 = 'active';
      this.tabClass1 = 'inactive';

      this.tabButton1 = false;
      this.tabButton2 = true;
    }
  }

  createRetail() {

    this.retail.retailCatCode = this.retailCategorySelectedValue;

    if (this.retail.retailCatCode == undefined) {
      this.isVal1 = true;
    } else {
      this.isVal1 = false;
    }
    if (this.retail.retailName == undefined) {
      this.isVal2 = true;
    } else {
      this.isVal2 = false;
    }
    if (this.retail.retailPrice == undefined || !this.validatePositiveDouble(this.retail.retailPrice)) {
      this.isVal3 = true;
    } else {
      this.isVal3 = false;
    }

    if (!this.isVal1 && !this.isVal2 && !this.isVal3 && this.validatePositiveDouble(this.retail.retailPrice)) {
      this.showSpinner = true;
      //api call
      this.supplierService.createRetail(this.retail).then(data => {

        data.subscribe((response) => {

          this.responseMessage = response.message;

          if (response.response === 'Ok') {
            this.showSpinner = false;
            this.text = this.responseMessage;

            this.fileName = response.retailCode;
            this.upload();

            this.getRetails();
            this.showToast();

          } else {
            this.text = 'Error...';
            this.showSpinner = false;
            this.getRetails();
            this.showToast();


          }
        });
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
      type: type
    });
  }

  getRetails() {
    this.showSpinner = true;

    //api call
    this.supplierService.getRetails().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.itemRetail = response.retails;
          this.itemRetailFilteredList = this.itemRetail;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.itemRetail);
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          //this.showToast();
        }
      });
    });
  }

  createStock() {

    this.supplierRetail.retailCode = this.itemRetailSelectedValueCode;

    if (this.supplierRetail.retailCode == undefined) {
      this.isVal4 = true;
    } else {
      this.isVal4 = false;
    }
    if (this.supplierRetail.wholeSalePrice == undefined || !this.validatePositiveDouble(this.supplierRetail.wholeSalePrice)) {
      this.isVal5 = true;
    } else {
      this.isVal5 = false;
    }
    if (this.supplierRetail.maxCount == undefined || !this.validatePositiveInteger(this.supplierRetail.maxCount)) {
      this.isVal6 = true;
    } else {
      this.isVal6 = false;
    }

    if (!this.isVal4 && !this.isVal5 && !this.isVal6 && this.validatePositiveDouble(this.supplierRetail.wholeSalePrice) &&
      this.validatePositiveInteger(this.supplierRetail.maxCount)) {

      this.showSpinner = true;
      //api call
      this.supplierService.createStock(this.supplierRetail).then(data => {

        data.subscribe((response) => {

          this.responseMessage = response.message;

          if (response.response === 'Ok') {
            this.showSpinner = false;
            this.text = this.responseMessage;
            //this.getRetails();
            this.showToast();
            this.getStocksBySupplier();

          } else {
            this.text = 'Error...';
            this.showSpinner = false;
            //this.getRetails();
            this.showToast();
            this.getStocksBySupplier();

          }
        });
      });
    }
  }

  getStocks() {
    this.showSpinner = true;

    //api call
    this.supplierService.getStocks().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.stocks = response.stocks;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          //this.showToast();
        }
      });
    });
  }

  viewShowEdit(val) {
    this.showEdit = val;
  }

  updateSupplier(supCode) {
    this.showSpinner = true;

    var category = (<HTMLInputElement>document.getElementById('category_' + supCode)).value;
    var name = (<HTMLInputElement>document.getElementById('name_' + supCode)).value;
    var price = (<HTMLInputElement>document.getElementById('price_' + supCode)).value;

    this.editData = {
      retailCode: supCode,
      retailCatCode: category,
      retailName: name,
      retailPrice: price,
      table: 'Retail'
    };

    this.commonCode.code = this.editData;

    //api call
    this.customerService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();
          this.showEdit = null;
          this.getRetails();
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showEdit = null;
        }
      });
    });
  }

  validatePositiveDouble(input) {
    if (/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(input)) {
      return (true);
    }
    return (false);
  }

  validatePositiveInteger(input) {
    if (/^[1-9]\d*$/.test(input)) {
      return (true);
    }
    return (false);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile, this.fileName).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

  getStocksBySupplier() {
    this.showSpinner = true;

    this.supData = {
      username: this.username
    };

    this.commonCode1.code = this.supData;

    //api call
    this.supplierService.getStocksBySupplier(this.commonCode1).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.stocks = response.stocks;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          //this.showToast();
        }
      });
    });
  }

  deleteSupplier(code){
    this.showSpinner = true;
    let myData = {
      retailCode: code,
      table: 'Retail'
    };

    this.commonCode2.code = myData;

    //api call
    this.customerService.deleteItem(this.commonCode2).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();
          this.showEdit = null;
          this.getRetails();
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showEdit = null;
        }
      });
    });
  }

}
