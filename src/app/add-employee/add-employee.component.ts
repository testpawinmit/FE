import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Bank, BANKS} from "../customer-profile/demo-data";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {Toaster, ToastType} from "ngx-toast-notifications";
import {Employee} from "../modal/employee";
import {EmployeeService} from "../services/employee.service";
import { CommonCode } from '../modal/common-code';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-color',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, AfterViewInit, OnDestroy {

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
  employee: Employee;

  showSpinner: any;
  responseMessage: any;
  employees:any;
  showEdit: boolean;
  editData: any;
  commonCode: CommonCode;

  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';

  isVal1: boolean;
  isVal2: boolean;
  isVal3: boolean;
  isVal4: boolean;
  isVal5: boolean;

  constructor(private employeeService: EmployeeService,
              private toaster: Toaster,
              private customerService: CustomerService
  ) {
    this.pageView = true;
    this.employee = new Employee();
    this.showSpinner = false;
    this.getEmployees();
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

  createEmployee() {

    if (this.employee.empNo == undefined || this.employee.empNo == "") {
      this.isVal1 = true;
    } else {
      this.isVal1 = false;
    }
    if (this.employee.empName == undefined || this.employee.empName == "") {
      this.isVal2 = true;
    } else {
      this.isVal2 = false;
    }
    if (this.employee.empNic == undefined || this.employee.empNic == "" || !this.validateNic(this.employee.empNic)) {
      this.isVal3 = true;
    } else {
      this.isVal3 = false;
    }
    if (this.employee.empPhone == undefined || this.employee.empPhone == "" || !this.validatePhoneNo(this.employee.empPhone)) {
      this.isVal4 = true;
    } else {
      this.isVal4 = false;
    }
    if (this.employee.empAddress == undefined || this.employee.empAddress == "") {
      this.isVal5 = true;
    } else {
      this.isVal5 = false;
    }

    if(!this.isVal1 && !this.isVal2 && !this.isVal3 && !this.isVal4 && !this.isVal5) {
      this.showSpinner = true;

      //api call
      this.employeeService.createEmployee(this.employee).then(data => {

        data.subscribe((response) => {

          this.responseMessage = response.message;

          if (response.response === 'Ok') {
            this.showSpinner = false;
            this.text = this.responseMessage;
            this.showToast();
            this.getEmployees();

          } else {
            this.text = "Error...";
            this.showSpinner = false;
            this.showToast();
            this.getEmployees();
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

  getEmployees() {
    this.showSpinner = true;



    //api call
    this.employeeService.getEmployees().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.employees = response.employees;
          console.log(this.employees);
        } else {
          this.text = "Error...";
          this.showSpinner = false;

        }
      })
    });
  }

  viewShowEdit(val){
    this.showEdit = val;
  }

  updateEmployee(code){
    this.showSpinner = true;

    var number = (<HTMLInputElement>document.getElementById('number_' + code)).value;
    var name = (<HTMLInputElement>document.getElementById('name_' + code)).value;
    var nic = (<HTMLInputElement>document.getElementById('nic_' + code)).value;
    var phone = (<HTMLInputElement>document.getElementById('phone_' + code)).value;
    var address = (<HTMLInputElement>document.getElementById('address_' + code)).value;

    this.editData = {
      empCode: code,
      empNo: number,
      empName: name,
      empNic : nic,
      empPhone: phone,
      empAddress: address,
      table: 'Employee'
    };

    this.commonCode.code = this.editData;

    //api call
    this.customerService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.getEmployees();
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

  validatePhoneNo(phoneNo)
  {
    if (/^\d{10}$/.test(phoneNo))
    {
      return (true)
    }
    return (false)
  }

  validateNic(nic)
  {
    if (/^([0-9]{9}[X|x|V|v]|[0-9]{12})$/.test(nic))
    {
      return (true)
    }
    return (false)
  }

}
