import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { FeeManagementComponent } from './Admin/Components/fee-management/fee-management.component';
import { MemberManagementComponent } from './Admin/Components/member-management/member-management.component';
import { ProgramsManagementComponent } from './Admin/Components/programs-managment/programs-managment.component';
import { AdminDashboardComponent } from './Admin/Components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './Admin/Components/admin-login/admin-login.component';
import { AdminLayoutComponent } from './Layouts/admin-layout/admin-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
// Pipes
import { SearchFilterPipe } from './Pipes/search-filter.pipe';
import { RegisterMemberComponent } from './Admin/Components/member-register/member-register/member-register.component';
import { LandingPageComponent } from './Home/landing-page/landing-page/landing-page.component';
import { UserProfileComponent } from './User/User-Profile/user-profile/user-profile.component';
import { UserPaymentsComponent } from './User/User-Payment/user-payments/user-payments.component';
import { UserEntrollmentComponent } from './User/User-Entrollment/user-entrollment/user-entrollment.component';
import { UserLayoutComponent } from './Layouts/user-layout/user-layout/user-layout.component';
import { AddProgramComponent } from './Admin/Components/program-add/add-program/add-program.component';
import { AddEnrollmentComponent } from './Admin/Components/add-enrollment/add-enrollment.component';
import { ListEnrollmentComponent } from './Admin/Components/list-enrollment/list-enrollment/list-enrollment.component';

@NgModule({
  declarations: [
    AppComponent,
    FeeManagementComponent,
    MemberManagementComponent,
    ProgramsManagementComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    AdminLayoutComponent,
    BlankLayoutComponent,
    RegisterMemberComponent,
    LandingPageComponent,
    SearchFilterPipe,
    UserProfileComponent,
    UserPaymentsComponent,
    UserEntrollmentComponent,
    UserLayoutComponent,
    AddProgramComponent,
    AddEnrollmentComponent,
    ListEnrollmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
