import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BillItem } from '../interface/dashboard.interface';

@Component({
  imports: [CommonModule],
  selector: 'app-recent-bills',
  styleUrl: './recent-bills.component.css',
  templateUrl: './recent-bills.component.html',
})

export class RecentBillsComponent {
  recentBills: BillItem[] = [
    {
      id: 'r1',
      title: 'Rent',
      date: 'May 5, 2025',
      amount: 9800,
      status: 'Paid',
      icon: 'home',
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-500'
    }
  ];
}
