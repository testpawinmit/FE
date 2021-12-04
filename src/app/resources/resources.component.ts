import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Bank, BANKS} from "../customer-profile/demo-data";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {Toaster, ToastType} from "ngx-toast-notifications";
import {Resource} from "../modal/resource";
import {ResourceService} from "../services/resource.service";
import { CommonCode } from '../modal/common-code';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-breed',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit, AfterViewInit, OnDestroy {

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
  resource: Resource;

  showSpinner: any;
  responseMessage: any;
  resources:any;
  showEdit: boolean;

  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';

  editData: any;
  commonCode: CommonCode;

  isVal1: boolean;
  isVal2: boolean;

  constructor(private resourceService: ResourceService,
              private toaster: Toaster,
              private customerService: CustomerService) {
    this.pageView = true;
    this.resource = new Resource();
    this.showSpinner = false;
    this.getResources();
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

  createResource() {

    if(this.resource.roomName == undefined || this.resource.roomName == ""){
      this.isVal1 = true
    }else {
      this.isVal1 = false;
    }
    if(this.resource.maxWeight == undefined || this.resource.maxWeight == "" || !this.validatePositiveDouble(this.resource.maxWeight)){
      this.isVal2 = true
    }else {
      this.isVal2 = false;
    }

    if (!this.isVal1 && !this.isVal2) {
      this.showSpinner = true;
      //api call
      this.resourceService.createResource(this.resource).then(data => {

        data.subscribe((response) => {

          this.responseMessage = response.message;

          if (response.response === 'Ok') {
            this.showSpinner = false;
            this.text = this.responseMessage;
            this.showToast();
            this.getResources();

          } else {
            this.text = "Error...";
            this.showSpinner = false;
            this.showToast();
            this.getResources();
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

          this.resources = response.resources;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.resources);
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

  updateResource(resCode) {
    this.showSpinner = true;

    var name = (<HTMLInputElement>document.getElementById('name_' + resCode)).value;
    var maxWeight = (<HTMLInputElement>document.getElementById('maxWeight_' + resCode)).value;
    var cleanNeeded = (<HTMLInputElement>document.getElementById('cleanNeeded_' + resCode)).value;

    this.editData = {
      roomCode: resCode,
      roomName: name,
      maxWeight: maxWeight,
      cleanNeeded: cleanNeeded,
      table: 'Resources'
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
          this.getResources();
          this.showToast();
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          this.showEdit = null;
          this.getResources();
        }
      })
    });
  }

  validatePositiveDouble(input) {
    if (/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(input)) {
      return (true);
    }
    return (false);
  }

}
