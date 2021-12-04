import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatInputModule } from '@angular/material/input';
import { PetProfileComponent } from './pet-profile/pet-profile.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {A11yModule} from "@angular/cdk/a11y";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {CdkTableModule} from "@angular/cdk/table";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {CdkTreeModule} from "@angular/cdk/tree";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatBadgeModule} from "@angular/material/badge";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatRadioModule} from "@angular/material/radio";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSliderModule} from "@angular/material/slider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {PortalModule} from "@angular/cdk/portal";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatTreeModule} from "@angular/material/tree";
import {ScrollingModule} from "@angular/cdk/scrolling";
import { AppoinmentComponent } from './appoinment/appoinment.component';
import { RetailComponent } from './retail/retail.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CompanyPortalComponent } from './company-portal/company-portal.component';
import { VeterinaryComponent } from './veterinary/veterinary.component';
import { PetLiveBoardComponent } from './pet-live-board/pet-live-board.component';
import { ServiceDogsComponent } from './service-dogs/service-dogs.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeScheduleComponent } from './employee-schedule/employee-schedule.component';
import { ResourcesComponent } from './resources/resources.component';
import {HttpClientModule} from "@angular/common/http";
import {BreedComponent} from "./breed/breed.component";
import {CheckinReportComponent} from "./checkin-report/checkin-report.component";
import {CheckoutReportComponent} from "./checkout-report/checkout-report.component";
import {FeedingReportComponent} from "./feeding-report/feeding-report.component";
import {MedicationReportComponent} from "./medication-report/medication-report.component";
import {RevenueReportComponent} from "./revenue-report/revenue-report.component";
import {ColorComponent} from "./color/color.component";
import {ToastNotificationsModule} from 'ngx-toast-notifications';
import { ListOfServiceDogsComponent } from './list-of-service-dogs/list-of-service-dogs.component';
import { ServiceComponent } from './service/service.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerProfileComponent,
    PetProfileComponent,
    AppoinmentComponent,
    RetailComponent,
    SuppliersComponent,
    CompanyPortalComponent,
    VeterinaryComponent,
    PetLiveBoardComponent,
    ServiceDogsComponent,
    AddEmployeeComponent,
    EmployeeScheduleComponent,
    ResourcesComponent,
    BreedComponent,
    CheckinReportComponent,
    CheckoutReportComponent,
    FeedingReportComponent,
    MedicationReportComponent,
    RevenueReportComponent,
    ColorComponent,
    ListOfServiceDogsComponent,
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    LazyLoadModule,
    CoreModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    MatSlideToggleModule,
    MatInputModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    HttpClientModule,
    ToastNotificationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
