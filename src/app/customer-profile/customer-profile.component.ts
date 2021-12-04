import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Bank, BANKS } from './demo-data';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { Customer } from '../modal/customer';
import { Toaster, ToastType } from 'ngx-toast-notifications';
import { CustomerService } from '../services/customer.service';
import { Allergy } from '../modal/allergy';
import { MedPhysicalDisable } from '../modal/med_physical_disable';
import { Injury } from '../modal/injury';
import { Medication } from '../modal/medication';
import { Dietary } from '../modal/dietary';
import { Vaccination } from '../modal/vaccination';
import { ThemePalette } from '@angular/material/core';
import { Pet } from '../modal/pet';
import { CommonCode } from '../modal/common-code';
import { BreedService } from '../services/breed.service';
import { ColorService } from '../services/color.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFileService } from '../services/upload-file.service';
import { environment } from '../../environments/environment.prod';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit, AfterViewInit, OnDestroy {

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

  tabClass1: any;
  tabClass2: any;
  tabClass3: any;
  tabClass4: any;
  tabClass5: any;

  tabButton1: any;
  tabButton2: any;
  tabButton3: any;
  tabButton4: any;
  tabButton5: any;

  customer: any;
  allergy: Allergy;
  medPhysicalDisable: MedPhysicalDisable;
  injury: Injury;
  medication: Medication;
  dietary: Dietary;
  vaccination: Vaccination;
  pet: Pet;
  recSize: any;
  vaccineList: any;
  buttonDis: any;

  showSpinner: any;

  private types: Array<ToastType> = ['success'];
  private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';
  //private text: string;

  responseMessage: any;
  petCode: any;
  viewAddPet: any;
  custCode: any;
  viewTab: any;

  commonCode: CommonCode;
  username: any;

  mydata = new Customer();

  pets: any;
  allergies: any;
  disabilities: any;
  injuries: any;
  medications: any;

  cusPetCode: any = '';

  map: any;

  mytest: any;
  showEdit: any;

  searchData: any;
  editData: any;
  vaccName: any;
  expirationDate: any;
  petName: any;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileName: any;

  fileInfos: Observable<any>;

  uploadData: any;
  imgURL = environment.imgURL;

  showEditCus: boolean;

  isVal1: boolean;
  isVal2: boolean;
  isVal3: boolean;
  isVal4: boolean;
  isVal5: boolean;
  isVal6: boolean;
  isVal7: boolean;

  today = new Date();
  isMed: boolean;
  isDie: boolean;
  isVac: boolean;

  userRole = localStorage.getItem('userRole');

  cusList: any;

  constructor(private toaster: Toaster,
              public customerService: CustomerService,
              public breedService: BreedService,
              public colorService: ColorService,
              private uploadService: UploadFileService) {

    if(this.userRole == 'USROLE-3') {
      this.tabClass1 = 'active';
      this.tabClass2 = 'inactive';
      this.tabClass3 = 'inactive';
      this.tabClass4 = 'inactive';
      this.tabClass5 = 'inactive';
      this.tabButton1 = true;

      this.customer = new Customer();
      this.allergy = new Allergy();
      this.medPhysicalDisable = new MedPhysicalDisable();
      this.injury = new Injury();
      this.medication = new Medication();
      this.dietary = new Dietary();
      this.vaccination = new Vaccination();
      this.pet = new Pet();

      this.showSpinner = false;

      this.viewAddPet = true;

      this.viewTab = true;
      this.commonCode = new CommonCode();
      this.username = localStorage.getItem('username');

      this.getCustomer();
      this.getPets();

      this.map = new Map();
      this.getBreeds();
      this.getColors();
      this.showEdit = null;

      this.showEditCus = true;

      this.isMed = false;
      this.isDie = false;
      this.isVac = false;
    }
    if(this.userRole == 'USROLE-2'){
      this.getAllCustomers();
    }

  }

  /*dropdown*/
  public data: any = [
    { name: 'Colombo' },
    { name: 'Kandy' },
    { name: 'Kegalle' },
    { name: 'Kurunegala' },
    { name: 'Galle' },
    { name: 'Gampaha' }
  ];

  public breed: any = [
    { name: 'German Shepherd' },
    { name: 'BullDog' },
    { name: 'Husky' },
    { name: 'Labrador Retriever' },
    { name: 'Golden Retriever' },
    { name: 'Cat' }
  ];

  public color: any = [
    { name: 'Black' },
    { name: 'White' },
    { name: 'Brown' },
    { name: 'Orange' }
  ];

  public selectedValue: any;
  public searchValue: any;
  public filteredList: any = [];

  public breedSelectedValue: any;
  public breedSelectedValueName: any;
  public breedSearchValue: any;
  public breedFilteredList: any = [];

  public colorSelectedValue: any;
  public colorSelectedValueName: any;
  public colorSearchValue: any;
  public colorFilteredList: any = [];

  /* dropdown */

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
    this.breedFilteredList = this.breed;
    this.colorFilteredList = this.color;
    /* dropdown */

    this.fileInfos = this.uploadService.getFiles();
  }

  /* dropdown */
  filterDropdown(e) {
    console.log('e in filterDropdown -------> ', e);
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
    console.log('this.filteredList indropdown -------> ', this.filteredList);
  }

  selectValue(name) {
    this.selectedValue = name;
  }

  breedFilterDropdown(e) {
    console.log('e in filterDropdown -------> ', e);
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
    console.log('this.filteredList indropdown -------> ', this.breedFilteredList);
  }

  breedSelectValue(code, name) {
    this.breedSelectedValue = code;
    this.breedSelectedValueName = name;
  }

  colorFilterDropdown(e) {
    console.log('e in filterDropdown -------> ', e);
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
    console.log('this.filteredList indropdown -------> ', this.colorFilteredList);
  }

  colorSelectValue(code, name) {
    this.colorSelectedValue = code;
    this.colorSelectedValueName = name;
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
        //this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
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
      window.location.reload();
      this.tabClass1 = 'active';
      this.tabClass2 = 'inactive';
      this.tabClass3 = 'inactive';
      this.tabClass4 = 'inactive';
      this.tabClass5 = 'inactive';

      this.tabButton1 = true;
      this.tabButton2 = false;
      this.tabButton3 = false;
      this.tabButton4 = false;
      this.tabButton5 = false;

    } else if (chkClass == 2) {
      this.tabClass2 = 'active';
      this.tabClass1 = 'inactive';
      this.tabClass3 = 'inactive';
      this.tabClass4 = 'inactive';
      this.tabClass5 = 'inactive';

      this.tabButton1 = false;
      this.tabButton2 = true;
      this.tabButton3 = false;
      this.tabButton4 = false;
      this.tabButton5 = false;

    } else if (chkClass == 3) {
      this.tabClass3 = 'active';
      this.tabClass1 = 'inactive';
      this.tabClass2 = 'inactive';
      this.tabClass4 = 'inactive';
      this.tabClass5 = 'inactive';

      this.tabButton1 = false;
      this.tabButton2 = false;
      this.tabButton3 = true;
      this.tabButton4 = false;
      this.tabButton5 = false;

    } else if (chkClass == 4) {
      this.tabClass4 = 'active';
      this.tabClass1 = 'inactive';
      this.tabClass2 = 'inactive';
      this.tabClass3 = 'inactive';
      this.tabClass5 = 'inactive';

      this.tabButton4 = true;
      this.tabButton2 = false;
      this.tabButton3 = false;
      this.tabButton1 = false;
      this.tabButton5 = false;

    } else if (chkClass == 5) {
      this.getPets();
      this.tabClass5 = 'active';
      this.tabClass1 = 'inactive';
      this.tabClass2 = 'inactive';
      this.tabClass3 = 'inactive';
      this.tabClass4 = 'inactive';

      this.tabButton5 = true;
      this.tabButton2 = false;
      this.tabButton3 = false;
      this.tabButton1 = false;
      this.tabButton4 = false;

      this.isMed = false;
      this.isDie = false;
      this.isVac = false;
    }
  }

  createCustomer() {

    var custFirstName = (<HTMLInputElement>document.getElementById('custFirstName_' + this.customer.custCode)).value;
    var custLastName = (<HTMLInputElement>document.getElementById('custLastName_' + this.customer.custCode)).value;
    var custEmail = (<HTMLInputElement>document.getElementById('custEmail_' + this.customer.custCode)).value;
    var custNic = (<HTMLInputElement>document.getElementById('custNic_' + this.customer.custCode)).value;
    var custPhone = (<HTMLInputElement>document.getElementById('custPhone_' + this.customer.custCode)).value;
    var custAddress = (<HTMLInputElement>document.getElementById('custAddress_' + this.customer.custCode)).value;

    this.customer.custFirstName = custFirstName;
    this.customer.custLastName = custLastName;
    this.customer.custEmail = custEmail;
    this.customer.custNic = custNic;
    this.customer.custPhone = custPhone;
    this.customer.custAddress = custAddress;
    this.customer.location = this.selectedValue;
    this.customer.username = localStorage.getItem('username');

    if (this.customer.custFirstName == undefined || this.customer.custFirstName == '') {
      this.isVal1 = true;
    } else {
      this.isVal1 = false;
    }
    if (this.customer.custLastName == undefined || this.customer.custLastName == '') {
      this.isVal2 = true;
    } else {
      this.isVal2 = false;
    }
    if (this.customer.custEmail == undefined || this.customer.custEmail == '' || !this.validateEmail(this.customer.custEmail)) {
      this.isVal3 = true;
    } else {
      this.isVal3 = false;
    }
    if (this.customer.custNic == undefined || this.customer.custNic == '' || !this.validateNic(this.customer.custNic)) {
      this.isVal4 = true;
    } else {
      this.isVal4 = false;
    }
    if (this.customer.custPhone == undefined || this.customer.custPhone == '' || !this.validatePhoneNo(this.customer.custPhone)) {
      this.isVal5 = true;
    } else {
      this.isVal5 = false;
    }
    if (this.customer.custAddress == undefined || this.customer.custAddress == '') {
      this.isVal6 = true;
    } else {
      this.isVal6 = false;
    }
    if (this.customer.location == undefined || this.customer.location == '') {
      this.isVal7 = true;
    } else {
      this.isVal7 = false;
    }

    if (!this.isVal1 && !this.isVal2 && !this.isVal3 && !this.isVal4 && !this.isVal5 && !this.isVal6 && !this.isVal7) {
      this.showSpinner = true;
      //api call
      this.customerService.createItem(this.customer).then(data => {

        data.subscribe((response) => {

          this.responseMessage = response.message;

          if (response.response === 'Ok') {
            this.showSpinner = false;
            this.text = this.responseMessage;
            this.custCode = response.custCode;
            this.viewAddPet = true;
            this.showEditCus = false;
            this.fileName = localStorage.getItem('username');
            this.upload();
            window.location.reload();
            this.showToast();
          } else {
            this.text = 'Error...';
            this.showSpinner = false;
            this.showToast();
            this.showEditCus = false;
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

  addAllergy() {
    this.showSpinner = true;

    this.allergy.petCode = this.cusPetCode;

    //api call
    this.customerService.createAllergy(this.allergy).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();

          this.singlePetcode = {
            petCode: this.cusPetCode
          };

          this.getAllergies();

        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showToast();
        }
      });
    });
  }

  addDisable() {
    this.showSpinner = true;

    this.medPhysicalDisable.petCode = this.cusPetCode;

    //api call
    this.customerService.createDisabilities(this.medPhysicalDisable).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();

          this.singlePetcode = {
            petCode: this.cusPetCode
          };

          this.getDisabilities();
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showToast();
        }
      });
    });
  }

  addInjury() {
    this.showSpinner = true;

    this.injury.petCode = this.cusPetCode;

    //api call
    this.customerService.createInjury(this.injury).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();
          this.singlePetcode = {
            petCode: this.cusPetCode
          };

          this.getInjuries();
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showToast();
        }
      });
    });
  }

  addMedication() {
    this.showSpinner = true;

    this.medication.petCode = this.cusPetCode;

    //api call
    this.customerService.createMedication(this.medication).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();
          this.singlePetcode = {
            petCode: this.cusPetCode
          };

          this.getMedications();
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showToast();
        }
      });
    });
  }

  addDietary() {

    this.showSpinner = true;

    this.dietary.petCode = this.cusPetCode;

    //console.log(this.dietary);

    let jsonObject = {};
    this.map.forEach((value, key) => {
      jsonObject[key] = value;
    });
    console.log(JSON.stringify(jsonObject));

    this.dietary.feedingTimeMap = JSON.stringify(jsonObject);

    //api call
    this.customerService.createDietary(this.dietary).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showToast();
        }
      });
    });
  }

  addVaccination() {
    this.showSpinner = true;

    this.vaccination = new Vaccination();
    this.vaccination.petCode = this.cusPetCode;
    this.vaccination.vaccName = this.vaccName;
    this.vaccination.expirationDate = this.expirationDate;

    //api call
    this.customerService.addVaccination(this.vaccination).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;

          this.getSingleVaccination();

          this.text = this.responseMessage;
          this.showToast();
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showToast();
        }
      });
    });
  }

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Morning', completed: false, color: 'primary' },
      { name: 'Afternoon', completed: false, color: 'primary' },
      { name: 'Evening', completed: false, color: 'primary' }
    ]
  };

  allComplete: boolean = false;

  updateAllComplete(key) {

    //this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);

    if (!this.map.has(key)) {
      this.map.set(key, true);
    } else {
      this.map.delete(key);
    }

    //this.map.set(key, true);
    console.log('New Size= ' + this.map.size);
    //alert(map);
  }

  someComplete(): boolean {

    //alert(this.task.name);

    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  addPet() {
    this.showSpinner = true;

    this.pet.breedCode = this.breedSelectedValue;
    this.pet.colorCode = this.colorSelectedValue;
    this.pet.custCode = this.customer.custCode;

    //api call
    this.customerService.addPet(this.pet).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.showToast();
          this.petCode = response.petCode;
          this.viewTab = true;

          this.fileName = this.petCode;
          this.upload();

        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showToast();
        }
      });
    });
  }

  code: any = {
    username: localStorage.getItem('username')
  };

  singlePetcode: any = null;

  getCustomer() {
    this.showSpinner = true;

    this.commonCode.code = this.code;

    //api call
    this.customerService.getCustomer(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.customer = response.customer;
          this.selectedValue = this.customer.location;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
        }
      });
    });
  }

  getPets() {
    //this.showSpinner = true;

    this.commonCode.code = this.code;

    //api call
    this.customerService.getPets(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.pets = response.pets;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.pets);
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          //this.showToast();
        }
      });
    });
  }

  goMedication(petCode) {
    this.cusPetCode = petCode;
    this.tabClass2 = 'active';
    this.tabClass1 = 'inactive';
    this.tabClass3 = 'inactive';
    this.tabClass4 = 'inactive';
    this.tabClass5 = 'inactive';

    this.tabButton1 = false;
    this.tabButton2 = true;
    this.tabButton3 = false;
    this.tabButton4 = false;
    this.tabButton5 = false;

    this.singlePetcode = {
      petCode: petCode
    };

    this.getAllergies();
    this.getDisabilities();
    this.getInjuries();
    this.getMedications();

    this.isMed = true;
  }

  goDietary(petCode) {
    this.mytest = new Dietary();
    this.mytest.feedType = 'bbv';
    console.log(this.mytest);
    this.cusPetCode = petCode;
    this.tabClass3 = 'active';
    this.tabClass1 = 'inactive';
    this.tabClass2 = 'inactive';
    this.tabClass4 = 'inactive';
    this.tabClass5 = 'inactive';

    this.tabButton1 = false;
    this.tabButton2 = false;
    this.tabButton3 = true;
    this.tabButton4 = false;
    this.tabButton5 = false;

    this.isDie = true;
  }

  goVaccination(petCode) {
    this.cusPetCode = petCode;
    this.tabClass4 = 'active';
    this.tabClass1 = 'inactive';
    this.tabClass2 = 'inactive';
    this.tabClass3 = 'inactive';
    this.tabClass5 = 'inactive';

    this.tabButton4 = true;
    this.tabButton2 = false;
    this.tabButton3 = false;
    this.tabButton1 = false;
    this.tabButton5 = false;

    this.getSingleVaccination();

    this.isVac = true;
  }

  getAllergies() {
    this.showSpinner = true;

    this.commonCode.code = this.singlePetcode;

    //api call
    this.customerService.getAllergies(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.allergies = response.allergies;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.allergies);
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          //this.showToast();
        }
      });
    });
  }

  getDisabilities() {
    this.showSpinner = true;

    this.commonCode.code = this.singlePetcode;

    //api call
    this.customerService.getDisabilities(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.disabilities = response.disabilities;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.disabilities);
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          //this.showToast();
        }
      });
    });
  }

  getInjuries() {
    this.showSpinner = true;

    this.commonCode.code = this.singlePetcode;

    //api call
    this.customerService.getInjuries(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.injuries = response.injuries;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.injuries);
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          //this.showToast();
        }
      });
    });
  }

  getMedications() {
    this.showSpinner = true;

    this.commonCode.code = this.singlePetcode;

    //api call
    this.customerService.getMedications(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          //this.showToast();
          //this.petCode=response.petCode;
          //this.viewTab = true;

          this.medications = response.medications;
          //this.selectedValue = this.mydata.location;
          //this.customer = this.mydata;
          console.log(this.medications);
          this.showEdit = null;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          //this.showToast();
        }
      });
    });
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
          this.text = 'Error...';
          this.showSpinner = false;
          //this.showToast();
        }
      });
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

  getVaccination() {
    this.showSpinner = true;

    //api call
    this.customerService.getVaccination().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.vaccination = response.vaccination;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
        }
      });
    });
  }

  getSingleVaccination() {
    this.showSpinner = true;

    this.searchData = {
      petCode: this.cusPetCode
    };

    this.commonCode.code = this.searchData;

    //api call
    this.customerService.getSingleVaccination(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.vaccination = response.vaccination;
          this.recSize = response.recSize;
          if (this.recSize == 4) {
            this.buttonDis = true;
          } else {
            this.buttonDis = false;
          }
          this.vaccineList = response.vaccineList;
          this.petName = response.petName;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
        }
      });
    });
  }

  updateVaccine(code, name, expirationDate) {
    this.showSpinner = true;

    this.editData = {
      vaccCode: code,
      vaccName: name,
      expirationDate: expirationDate,
      table: 'Vaccination'
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
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showEdit = null;
        }
      });
    });
  }

  updateAllergy(allergyCode) {
    this.showSpinner = true;

    var allergyName = (<HTMLInputElement>document.getElementById('allergyName_' + allergyCode)).value;
    var allergyTreatment = (<HTMLInputElement>document.getElementById('allergyTreatment_' + allergyCode)).value;

    this.editData = {
      allergyCode: allergyCode,
      allergyName: allergyName,
      allergyTreatment: allergyTreatment,
      table: 'Allergy'
    };

    this.commonCode.code = this.editData;

    //api call
    this.customerService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.getAllergies();
          this.showToast();
          this.showEdit = null;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showEdit = null;
          this.getAllergies();
        }
      });
    });
  }

  updateDisability(disableCode) {
    this.showSpinner = true;

    var disableName = (<HTMLInputElement>document.getElementById('disableName_' + disableCode)).value;
    var disableTreatment = (<HTMLInputElement>document.getElementById('disableTreatment_' + disableCode)).value;

    this.editData = {
      disableCode: disableCode,
      disableName: disableName,
      disableTreatment: disableTreatment,
      table: 'MedicalPhysicalDisabilities'
    };

    this.commonCode.code = this.editData;

    //api call
    this.customerService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.getDisabilities();
          this.showToast();
          this.showEdit = null;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showEdit = null;
          this.getDisabilities();
        }
      });
    });
  }

  updateInjury(injuryCode) {
    this.showSpinner = true;

    var injuryDes = (<HTMLInputElement>document.getElementById('injuryDes_' + injuryCode)).value;
    var injuryOccurred = (<HTMLInputElement>document.getElementById('injuryOccurred_' + injuryCode)).value;
    var injuryImpact = (<HTMLInputElement>document.getElementById('injuryImpact_' + injuryCode)).value;
    var injuryUntil = (<HTMLInputElement>document.getElementById('injuryUntil_' + injuryCode)).value;

    this.editData = {
      injuryCode: injuryCode,
      injuryDes: injuryDes,
      injuryOccurred: injuryOccurred,
      injuryImpact: injuryImpact,
      injuryUntil: injuryUntil,
      table: 'Injury'
    };

    this.commonCode.code = this.editData;

    //api call
    this.customerService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.getInjuries();
          this.showToast();
          this.showEdit = null;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showEdit = null;
          this.getInjuries();
        }
      });
    });

  }

  updateMedication(medCode) {
    this.showSpinner = true;

    var medDosage = (<HTMLInputElement>document.getElementById('medDosage_' + medCode)).value;
    var medName = (<HTMLInputElement>document.getElementById('medName_' + medCode)).value;
    var medFrequency = (<HTMLInputElement>document.getElementById('medFrequency_' + medCode)).value;
    var medAM = (<HTMLInputElement>document.getElementById('medAM_' + medCode)).value;
    var medMid = (<HTMLInputElement>document.getElementById('medMid_' + medCode)).value;
    var medPM = (<HTMLInputElement>document.getElementById('medPM_' + medCode)).value;
    var medUntil = (<HTMLInputElement>document.getElementById('medUntil_' + medCode)).value;

    this.editData = {
      medCode: medCode,
      medDosage: medDosage,
      medName: medName,
      medFrequency: medFrequency,
      medAM: medAM,
      medMid: medMid,
      medPM: medPM,
      medUntil: medUntil,
      table: 'Medication'
    };

    this.commonCode.code = this.editData;

    //api call
    this.customerService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.getMedications();
          this.showToast();
          this.showEdit = null;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showEdit = null;
          this.getMedications();
        }
      });
    });
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

  updatePet(code) {
    this.showSpinner = true;

    var petName = (<HTMLInputElement>document.getElementById('petName_' + code)).value;

    this.editData = {
      petCode: code,
      petName: petName,
      table: 'Pet'
    };

    this.commonCode.code = this.editData;

    //api call
    this.customerService.updateItem(this.commonCode).then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.text = this.responseMessage;
          this.getPets();
          this.showToast();
          this.showEdit = null;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
          this.showEdit = null;
        }
      });
    });
  }

  validateEmail(mail)
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
    return (false)
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

  getAllCustomers() {
    this.showSpinner = true;

    //api call
    this.customerService.getAllCustomers().then(data => {

      data.subscribe((response) => {

        this.responseMessage = response.message;

        if (response.response === 'Ok') {
          this.showSpinner = false;
          this.cusList = response.cusList;
        } else {
          this.text = 'Error...';
          this.showSpinner = false;
        }
      });
    });
  }

}
