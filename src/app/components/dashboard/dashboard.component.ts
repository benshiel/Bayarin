import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BillItem } from './interface/dashboard.interface';
import { OverviewComponent } from './overview/overview.component';
import { SpendingOverviewComponent } from "./spending-overview/spending-overview.component";
import { UpcomingBillsComponent } from './upcoming-bills/upcoming-bills.component';
import { RecentBillsComponent } from './recent-bills/recent-bills.component';

@Component({
  imports: [CommonModule, OverviewComponent, SpendingOverviewComponent, UpcomingBillsComponent, RecentBillsComponent],
  standalone: true,
  selector: 'app-dashboard',
  styleUrl: './dashboard.component.css',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

}
