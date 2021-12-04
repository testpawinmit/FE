import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';
import { CustomerProfileComponent } from '../customer-profile/customer-profile.component';
import {PetProfileComponent} from "../pet-profile/pet-profile.component";
import {AppoinmentComponent} from "../appoinment/appoinment.component";
import {RetailComponent} from "../retail/retail.component";
import {SuppliersComponent} from "../suppliers/suppliers.component";
import {Component} from "@angular/core";
import {CompanyPortalComponent} from "../company-portal/company-portal.component";
import {VeterinaryComponent} from "../veterinary/veterinary.component";
import {PetLiveBoardComponent} from "../pet-live-board/pet-live-board.component";
import {ServiceDogsComponent} from "../service-dogs/service-dogs.component";
import {AddEmployeeComponent} from "../add-employee/add-employee.component";
import {EmployeeScheduleComponent} from "../employee-schedule/employee-schedule.component";
import {ResourcesComponent} from "../resources/resources.component";
import {BreedComponent} from "../breed/breed.component";
import {ColorComponent} from "../color/color.component";
import {FeedingReportComponent} from "../feeding-report/feeding-report.component";
import {MedicationReportComponent} from "../medication-report/medication-report.component";
import {CheckinReportComponent} from "../checkin-report/checkin-report.component";
import {CheckoutReportComponent} from "../checkout-report/checkout-report.component";
import {RevenueReportComponent} from "../revenue-report/revenue-report.component";
import {ListOfServiceDogsComponent} from "../list-of-service-dogs/list-of-service-dogs.component";
import {ServiceComponent} from "../service/service.component";

export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [
        { path: 'dashboard', component: DashboardCrmComponent },
        { path: 'customer-profile', component: CustomerProfileComponent },
        { path: 'pet-profile', component: PetProfileComponent },
        { path: 'appoinment', component: AppoinmentComponent },
        { path: 'retail.ts', component: RetailComponent },
        { path: 'suppliers', component: SuppliersComponent },
        { path: 'company-portal', component: CompanyPortalComponent },
        { path: 'veterinary', component: VeterinaryComponent },
        { path: 'pet-live-board', component: PetLiveBoardComponent },
        { path: 'service-dogs', component: ServiceDogsComponent },
        { path: 'add-employee', component: AddEmployeeComponent },
        { path: 'employee-schedule', component: EmployeeScheduleComponent },
        { path: 'resources', component: ResourcesComponent },
        { path: 'breed', component: BreedComponent },
        { path: 'color', component: ColorComponent },
        { path: 'feeding-report', component: FeedingReportComponent },
        { path: 'medication-report', component: MedicationReportComponent },
        { path: 'checkin-report', component: CheckinReportComponent },
        { path: 'checkout-report', component: CheckoutReportComponent },
        { path: 'revenue-report', component: RevenueReportComponent },
        { path: 'list-of-service-dogs', component:ListOfServiceDogsComponent },
        { path: 'service', component:ServiceComponent },
        { path: 'material-widgets', loadChildren: () => import('../material-widgets/material-widgets.module').then(m => m.MaterialWidgetsModule) },
        { path: 'tables', loadChildren: () => import('../tables/tables.module').then(m => m.TablesModule) },
        { path: 'maps', loadChildren: () => import('../maps/maps.module').then(m => m.MapsModule) },
        { path: 'charts', loadChildren: () => import('../charts/charts.module').then(m => m.ChartsModule) },
        // { path: 'chats', loadChildren: () => import('../chats/chat.module').then(m => m.ChatsModule) }, // fix this
        //{ path: 'mail', loadChildren: () => import('../mail/mail.module').then(m => m.MailModule) }, // fix this
        // { path: 'pages', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule) },
        { path: 'forms', loadChildren: () => import('../forms/forms.module').then(m => m.FormModule) }, //fix this
        { path: 'guarded-routes', loadChildren: () => import('../guarded-routes/guarded-routes.module').then(m => m.GuardedRoutesModule) },
        // { path: 'editor', loadChildren: () => import('../editor/editor.module').then(m => m.EditorModule) },
        { path: 'scrumboard', loadChildren: () => import('../scrumboard/scrumboard.module').then(m => m.ScrumboardModule) },

    ]
}];
