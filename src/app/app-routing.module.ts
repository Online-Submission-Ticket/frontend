import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {SubTicketComponent} from "./pages/sub-ticket/sub-ticket.component";
import {BatchDetailsComponent} from "./pages/batch-details/batch-details.component";
import {ClassDetailsComponent} from "./pages/class-details/class-details.component";
import {CcClassComponent} from "./pages/cc-class/cc-class.component";

const routes: Routes = [
  {
    path:'',
    redirectTo : 'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'sub-ticket',
    component: SubTicketComponent
  },
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path:'dashboard',
        component:DashboardComponent,

      }
    ]
  },
  { path: 'batchdetails/:batch', component: BatchDetailsComponent },
  {path : 'classdetails/:class', component: ClassDetailsComponent},
  {
    path:'cc-class',
    component: CcClassComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
