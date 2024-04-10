import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {SubTicketComponent} from "./pages/sub-ticket/sub-ticket.component";
import {BatchDetailsComponent} from "./pages/batch-details/batch-details.component";
import {ClassDetailsComponent} from "./pages/class-details/class-details.component";
import { FileUploadComponent } from './pages/file-upload/file-upload.component';

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
    path:'upload-file',
    component: FileUploadComponent,
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
  {path : 'classdetails/:class', component: ClassDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
