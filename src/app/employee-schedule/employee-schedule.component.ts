import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Bank, BANKS} from "../customer-profile/demo-data";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import { CommonCode } from '../modal/common-code';
import { CustomerService } from '../services/customer.service';
import { EmployeeService } from '../services/employee.service';
import { EmployeeSchedule } from '../modal/employee_schedule';
import { Toaster, ToastType } from 'ngx-toast-notifications';

@Component({
  selector: 'app-employee-schedule',
  templateUrl: './employee-schedule.component.html',
  styleUrls: ['./employee-schedule.component.scss']
})
export class EmployeeScheduleComponent implements OnInit, AfterViewInit, OnDestroy {

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

  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';

  pageView: any;
  empName: any;
  showSpinner: any;
  searchEmp: any = null;
  commonCode: CommonCode;
  empList: any;
  employeeSchedule: EmployeeSchedule;
  responseMessage: any;

  sundayDiv: boolean;
  mondayDiv: boolean;
  tuesdayDiv: boolean;
  wednesdayDiv: boolean;
  thursdayDiv: boolean;
  fridayDiv: boolean;
  saturdayDiv: boolean;
  showErr: boolean;

  searchData: any = null;
  scheduleRecord: any;
  showEdit: boolean;
  editData: any;

  isVal1: boolean;

  constructor(private toaster: Toaster,
              private employeeService: EmployeeService,
              private customerService: CustomerService) {
    this.pageView = true;
    this.commonCode = new CommonCode();
    this.employeeSchedule = new EmployeeSchedule();

    this.sundayDiv = false;
    this.mondayDiv = false;
    this.tuesdayDiv = false;
    this.wednesdayDiv = false;
    this.thursdayDiv = false;
    this.fridayDiv = false;
    this.saturdayDiv = false;

    this.showErr = false;
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
    if (chkClass === 1) {
      this.pageView = 1;
    } else if (chkClass === 2) {
      this.pageView = 2;
    } else if (chkClass === 3) {
      this.pageView = 3;
    }
  }

  searchEmployee() {

    if(this.empName == undefined || this.empName == ""){
      this.isVal1 = true
    }else {
      this.isVal1 = false;
    }

    if (!this.isVal1) {
      this.showSpinner = true;

      this.employeeSchedule = new EmployeeSchedule();
      this.sundayDiv = false;
      this.mondayDiv = false;
      this.tuesdayDiv = false;
      this.wednesdayDiv = false;
      this.thursdayDiv = false;
      this.fridayDiv = false;
      this.saturdayDiv = false;

      this.searchEmp = {
        empName: this.empName
      };

      this.commonCode.code = this.searchEmp;

      //api call
      this.employeeService.searchEmployee(this.commonCode).then(data => {

        data.subscribe((response) => {


          if (response.response === 'Ok') {
            this.showSpinner = false;
            this.empList = response.empList;
          } else {
            this.showSpinner = false;
            }
        })
      });
    }
  }

  getEmpCode(empCode) {
    this.employeeSchedule = new EmployeeSchedule();
    this.employeeSchedule.empCode = empCode;
    this.sundayDiv = false;
    this.mondayDiv = false;
    this.tuesdayDiv = false;
    this.wednesdayDiv = false;
    this.thursdayDiv = false;
    this.fridayDiv = false;
    this.saturdayDiv = false;

    this.employeeSchedule.sunStartTime = '00:00';
    this.employeeSchedule.sunEndTime = '00:00';

    this.employeeSchedule.monStartTime = '00:00';
    this.employeeSchedule.monEndTime = '00:00';

    this.employeeSchedule.tueStartTime = '00:00';
    this.employeeSchedule.tueEndTime = '00:00';

    this.employeeSchedule.wedStartTime = '00:00';
    this.employeeSchedule.wedEndTime = '00:00';

    this.employeeSchedule.thuStartTime = '00:00';
    this.employeeSchedule.thuEndTime = '00:00';

    this.employeeSchedule.friStartTime = '00:00';
    this.employeeSchedule.friEndTime = '00:00';

    this.employeeSchedule.satStartTime = '00:00';
    this.employeeSchedule.satEndTime = '00:00';

    this.getAllScheduleByEmpCode(empCode);
  }

  selectDay(day) {

    if (this.sundayDiv && day === 'SUNDAY') {
      this.sundayDiv = false;
    } else if (!this.sundayDiv && day === 'SUNDAY') {
      this.sundayDiv = true;
    }
    if (this.mondayDiv && day === 'MONDAY') {
      this.mondayDiv = false;
    } else if (!this.mondayDiv && day === 'MONDAY') {
      this.mondayDiv = true;
    }
    if (this.tuesdayDiv && day === 'TUESDAY') {
      this.tuesdayDiv = false;
    } else if (!this.tuesdayDiv && day === 'TUESDAY') {
      this.tuesdayDiv = true;
    }
    if (this.wednesdayDiv && day === 'WEDNESDAY') {
      this.wednesdayDiv = false;
    } else if (!this.wednesdayDiv && day === 'WEDNESDAY') {
      this.wednesdayDiv = true;
    }
    if (this.thursdayDiv && day === 'THURSDAY') {
      this.thursdayDiv = false;
    } else if (!this.thursdayDiv && day === 'THURSDAY') {
      this.thursdayDiv = true;
    }
    if (this.fridayDiv && day === 'FRIDAY') {
      this.fridayDiv = false;
    } else if (!this.fridayDiv && day === 'FRIDAY') {
      this.fridayDiv = true;
    }
    if (this.saturdayDiv && day === 'SATURDAY') {
      this.saturdayDiv = false;
    } else if (!this.saturdayDiv && day === 'SATURDAY') {
      this.saturdayDiv = true;
    }

  }

  addEmployeeSchedule(employeeSchedule) {

    if (!employeeSchedule.isSunday) {
      employeeSchedule.sunStartTime = '00:00';
      employeeSchedule.sunEndTime = '00:00';
    }
    if (!employeeSchedule.isMonday) {
      employeeSchedule.monStartTime = '00:00';
      employeeSchedule.monEndTime = '00:00';
    }
    if (!employeeSchedule.isTuesday) {
      employeeSchedule.tueStartTime = '00:00';
      employeeSchedule.tueEndTime = '00:00';
    }
    if (!employeeSchedule.isWednesday) {
      employeeSchedule.wedStartTime = '00:00';
      employeeSchedule.wedEndTime = '00:00';
    }
    if (!employeeSchedule.isThursday) {
      employeeSchedule.thuStartTime = '00:00';
      employeeSchedule.thuEndTime = '00:00';
    }
    if (!employeeSchedule.isFriday) {
      employeeSchedule.friStartTime = '00:00';
      employeeSchedule.friEndTime = '00:00';
    }
    if (!employeeSchedule.isSaturday) {
      employeeSchedule.satStartTime = '00:00';
      employeeSchedule.satEndTime = '00:00';
    }

    let sunStart = this.timeStringToFloat(employeeSchedule.sunStartTime);
    let sunEnd = this.timeStringToFloat(employeeSchedule.sunEndTime);
    let diff1 = sunStart - sunEnd;

    let monStart = this.timeStringToFloat(employeeSchedule.monStartTime);
    let monnEnd = this.timeStringToFloat(employeeSchedule.monEndTime);
    let diff2 = monStart - monnEnd;

    let tueStart = this.timeStringToFloat(employeeSchedule.tueStartTime);
    let tueEnd = this.timeStringToFloat(employeeSchedule.tueEndTime);
    let diff3 = tueStart - tueEnd;

    let wedStart = this.timeStringToFloat(employeeSchedule.wedStartTime);
    let wedEnd = this.timeStringToFloat(employeeSchedule.wedEndTime);
    let diff4 = wedStart - wedEnd;

    let thuStart = this.timeStringToFloat(employeeSchedule.thuStartTime);
    let thuEnd = this.timeStringToFloat(employeeSchedule.thuEndTime);
    let diff5 = thuStart - thuEnd;

    let friStart = this.timeStringToFloat(employeeSchedule.friStartTime);
    let friEnd = this.timeStringToFloat(employeeSchedule.friEndTime);
    let diff6 = friStart - friEnd;

    let satStart = this.timeStringToFloat(employeeSchedule.satStartTime);
    let satEnd = this.timeStringToFloat(employeeSchedule.satEndTime);
    let diff7 = satStart - satEnd;

    //alert(dateToBeCheckOut2-dateToBeCheckOut1);

    if (
      (diff1 === 0 || diff1 < 0) &&
      (diff2 === 0 || diff2 < 0) &&
      (diff3 === 0 || diff3 < 0) &&
      (diff4 === 0 || diff4 < 0) &&
      (diff5 === 0 || diff5 < 0) &&
      (diff6 === 0 || diff6 < 0) &&
      (diff7 === 0 || diff7 < 0)
        ) {

      this.showErr = false;

      //api call
      this.employeeService.createEmployeeSchedule(employeeSchedule).then(data => {

        data.subscribe((response) => {

          this.responseMessage = response.message;

          if (response.response === 'Ok') {
            this.showSpinner = false;
            this.text = this.responseMessage;
            this.showToast();

            this.getAllScheduleByEmpCode(employeeSchedule.empCode);

          } else {
            this.text = "Error...";
            this.showSpinner = false;
            this.showToast();
          }
        })
      });
    } else {
      this.showErr = true;
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

  timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }

  getAllScheduleByEmpCode(empCode) {
    this.showSpinner = true;

    this.searchData = {
      empCode: empCode
    };

    this.commonCode.code = this.searchData;

    //api call
    this.employeeService.getAllScheduleByEmpCode(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.scheduleRecord = response.scheduleRecord;

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

  updateEmployeeSchedule(empScheduleId) {
    this.showSpinner = true;

    var startTime = (<HTMLInputElement>document.getElementById('startTime_' + empScheduleId)).value;
    var endTime = (<HTMLInputElement>document.getElementById('endTime_' + empScheduleId)).value;

    this.editData = {
      empScheduleId: empScheduleId,
      startTime: startTime,
      endTime: endTime,
      table: 'EmployeeSchedule'
    };

    this.commonCode.code = this.editData;

    //api call
    this.customerService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.getAllScheduleByEmpCode(this.employeeSchedule.empCode);
          this.showToast();
          this.showEdit = null;
        } else {
          this.text = "Error...";
          this.showSpinner = false;
          this.showEdit = null;
          this.getAllScheduleByEmpCode(this.employeeSchedule.empCode);
        }
      })
    });
  }

}
