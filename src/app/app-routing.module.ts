import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './Admin/Components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './Admin/Components/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './Layouts/admin-layout/admin-layout.component';
import { MemberManagementComponent } from './Admin/Components/member-management/member-management.component';
import { RegisterMemberComponent } from './Admin/Components/member-register/member-register/member-register.component';
import { FeeManagementComponent } from './Admin/Components/fee-management/fee-management.component';
import { ProgramsManagementComponent } from './Admin/Components/programs-managment/programs-managment.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { LandingPageComponent } from './Home/landing-page/landing-page/landing-page.component';
import { UserLayoutComponent } from './Layouts/user-layout/user-layout/user-layout.component';
import { UserProfileComponent } from './User/User-Profile/user-profile/user-profile.component';
import { UserEntrollmentComponent } from './User/User-Entrollment/user-entrollment/user-entrollment.component';
import { AddProgramComponent } from './Admin/Components/program-add/add-program/add-program.component';
import { AddEnrollmentComponent } from './Admin/Components/add-enrollment/add-enrollment.component';
import { ListEnrollmentComponent } from './Admin/Components/list-enrollment/list-enrollment/list-enrollment.component';
import { UserEditComponent } from './Admin/Components/user-edit/user-edit.component';
import { NotificationComponent } from './Admin/Components/notification/notification/notification.component';


const routes: Routes = [
  {
    path:'',component:LandingPageComponent //landing page to redirect first after run the project
  },
  {
    path: 'login',
    component: BlankLayoutComponent, // Blank layout for login page
    children: [
      {
        path: '',
        component: AdminLoginComponent, // Login page inside blank layout
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent, // Admin layout for secured routes
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent, // Consider renaming if this is for dashboard
      },
      {
        path: 'memberManagement',
        children : [
          {path : '' , component: MemberManagementComponent,},
          {path : 'enrollment/:id' , component : AddEnrollmentComponent},
          {path : 'edit/:id', component : UserEditComponent}
        ]
      },
      {
        path: 'memberRegister',
        component: RegisterMemberComponent, 
      },
      {
        path: 'feeManagement',
        component: FeeManagementComponent,
      },
      {
        path: 'programManagement',
        component: ProgramsManagementComponent,
      },
      {
        path:'programAdd',
        component:AddProgramComponent,
      },
      {
        path:'enrollmentList',
        component:ListEnrollmentComponent
      },
      {
        path:'enrollmentAdd',
        component:AddEnrollmentComponent
      },
      {
        path:'notification',
        component:NotificationComponent
      }
    ],
  },
  {
    path: 'user',
    component: UserLayoutComponent, // Admin layout for secured routes
    children: [
      {
        path: 'profile/:id',
        component: UserProfileComponent, // Consider renaming if this is for dashboard
      },
      {
        path: 'payment/:id',
        component: UserProfileComponent,
      },
      {
        path: 'enrollment/:id',
        component: UserEntrollmentComponent, 
      },
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: '/login', // Wildcard redirects to Login
  // },
];

export default routes;


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
