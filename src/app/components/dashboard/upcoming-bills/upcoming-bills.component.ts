import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillItem } from '../../../interface/dashboard.interface';

@Component({
  imports: [CommonModule],
  selector: 'app-upcoming-bills',
  styleUrl: './upcoming-bills.component.css',
  templateUrl: './upcoming-bills.component.html',
})

export class UpcomingBillsComponent {

  upcomingBills: BillItem[] = [
      {
        id: '1',
        title: 'Maynilad Water',
        date: 'May 20, 2025',
        amount: 850,
        dueText: 'Due in 3 days',
        icon: 'droplet',
        iconBg: 'bg-sky-50',
        iconColor: 'text-sky-500',
        category: 'Utilities',
        dueDate: 'May 20, 2025'
      },
      {
        id: '2',
        title: 'PLDT Internet',
        date: 'May 25, 2025',
        amount: 1699,
        dueText: 'Due in 8 days',
        icon: 'wifi',
        iconBg: 'bg-indigo-50',
        iconColor: 'text-indigo-500',
        category: 'Utilities',
        dueDate: 'May 20, 2025'
      },
      {
        id: '3',
        title: 'Meralco Electric',
        date: 'May 28, 2025',
        amount: 2450,
        dueText: 'Due in 11 days',
        icon: 'zap',
        iconBg: 'bg-amber-50',
        iconColor: 'text-amber-500',
        category: 'Utilities',
        dueDate: 'May 20, 2025'
      },
      {
        id: '4',
        title: 'Netflix',
        date: 'May 30, 2025',
        amount: 549,
        dueText: 'Due in 13 days',
        icon: 'tv',
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-500',
        category: 'Utilities',
        dueDate: 'May 20, 2025'
      },
      {
        id: '5',
        title: 'Spotify Premium',
        date: 'May 30, 2025',
        amount: 179,
        dueText: 'Due in 13 days',
        icon: 'music',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-500',
        category: 'Utilities',
        dueDate: 'May 20, 2025'
      }
    ];
}
