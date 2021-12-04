import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Bank, BANKS} from "../customer-profile/demo-data";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {ColorService} from "../services/color.service";
import {Toaster, ToastType} from "ngx-toast-notifications";
import {Color} from "../modal/color";
import { CommonCode } from '../modal/common-code';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit, AfterViewInit, OnDestroy {

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
  color: Color;

  showSpinner: any;
  responseMessage: any;
  showEdit: boolean;

  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';
  colors:any;
  editData: any;
  commonCode: CommonCode;

  constructor(private colorService: ColorService,
              private toaster: Toaster,
              private customerService: CustomerService) {
    this.pageView = true;
    this.color = new Color();
    this.showSpinner = false;
    this.getColors();
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

  createColor() {
    this.showSpinner = true;

    //api call
    this.colorService.createColor(this.color).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();
          this.getColors();

        } else {
          this.text = "Error...";
          this.showSpinner = false;
          this.showToast();
          this.getColors();
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

          this.colors = response.colors;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.colors);
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

  updateColor(colorCode) {
    this.showSpinner = true;

    var name = (<HTMLInputElement>document.getElementById('name_' + colorCode)).value;

    this.editData = {
      colorCode: colorCode,
      colorName: name,
      table: 'Color'
    };

    this.commonCode.code = this.editData;

    //api call
    this.customerService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showEdit = null;
          this.getColors();
          this.showToast();
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          this.showEdit = null;
          this.getColors();
        }
      })
    });

  }

}
