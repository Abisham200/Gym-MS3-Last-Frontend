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
        component: MemberManagementComponent,
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
    ],
  },
  {
    path: '**',
    redirectTo: '/login', // Wildcard redirects to Login
  },
];

export default routes;


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
