import { Component } from '@angular/core';
import { OverviewCard } from '../../../interface/dashboard.interface';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-overview',
  styleUrl: './overview.component.css',
  templateUrl: './overview.component.html',
})
export class OverviewComponent {

    overviewCards: OverviewCard[] = [
      {
        title: 'Total Bills',
        amount: 24850,
        subtext: '12 bills',
        icon: 'file',
        colorClass: 'text-violet-600',
        bgClass: 'bg-violet-50',
        barColor: 'bg-violet-500'
      },
      {
        title: 'Paid',
        amount: 15200,
        subtext: '61%',
        icon: 'check',
        colorClass: 'text-emerald-600',
        bgClass: 'bg-emerald-50',
        barColor: 'bg-emerald-500'
      },
      {
        title: 'Pending',
        amount: 6450,
        subtext: '26%',
        icon: 'clock',
        colorClass: 'text-amber-600',
        bgClass: 'bg-amber-50',
        barColor: 'bg-amber-500'
      },
      {
        title: 'Overdue',
        amount: 3200,
        subtext: '13%',
        icon: 'alert',
        colorClass: 'text-rose-600',
        bgClass: 'bg-rose-50',
        barColor: 'bg-rose-500'
      }
    ];
}
