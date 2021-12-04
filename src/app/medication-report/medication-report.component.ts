import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Bank, BANKS} from "../customer-profile/demo-data";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {CommonCode} from "../modal/common-code";
import {ReportService} from "../services/report.service";

import * as XLSX from 'xlsx';
import { CustomerService } from '../services/customer.service';
import { ToastType } from 'ngx-toast-notifications';

@Component({
  selector: 'app-medication-report',
  templateUrl: './medication-report.component.html',
  styleUrls: ['./medication-report.component.scss']
})
export class MedicationReportComponent implements OnInit, AfterViewInit, OnDestroy {

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
  searchTime: any;
  commonCode: CommonCode;
  code: any;
  responseMessage: any;
  medicationReport: any;

  /*name of the excel-file which will be downloaded. */
  fileName = 'MedicationReport.xlsx';
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';
  fullMedicationReport: any;
  searchData: any = null;
  searchDate: any = null;
  appointmentDate: any;

  private types: Array<ToastType> = ['success'];
  list1: any;
  list2: any;
  list3: any;

  constructor(private reportService: ReportService, private customerService: CustomerService) {
    this.pageView = true;
    this.showSpinner = false;
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

  /*getMedicationReport(){

    this.showSpinner = true;

    this.code = {searchDate: this.searchDate,
            searchTime: this.searchTime}
    this.commonCode.code = this.code;

    this.reportService.getMedicationReport(this.commonCode).then(data => {

      data.subscribe((response) => {

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.medicationReport = response.medicationReport;
        } else {
          this.showSpinner = false;
        }
      })
    });
  }*/

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  getMedicationReport() {
    this.showSpinner = true;

    this.searchData = {
      searchDate: this.searchDate,
      searchTime: this.searchTime
    };

    this.commonCode.code = this.searchData;

    //api call
    this.customerService.getMedicationReport(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.fullMedicationReport = response.medList;

        } else {
          this.text = "Error...";
          this.showSpinner = false;

        }
      })
    });
  }
}
