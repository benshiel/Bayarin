import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BillsComponent } from './components/bills/bills.component';

export const routes: Routes = [
{ path: '', redirectTo: 'bills', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'bills', component: BillsComponent }];
