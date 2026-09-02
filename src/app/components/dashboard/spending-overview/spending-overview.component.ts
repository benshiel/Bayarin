import { Component } from '@angular/core';
import { CategoryBreakdown } from '../../../interface/dashboard.interface';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-spending-overview',
  styleUrl: './spending-overview.component.css',
  templateUrl: './spending-overview.component.html',
})
export class SpendingOverviewComponent {
      categories: CategoryBreakdown[] = [
        { label: 'Housing', amount: 9800, percentage: 40, color: '#7C3AED' },
        { label: 'Utilities', amount: 4950, percentage: 20, color: '#3B82F6' },
        { label: 'Transportation', amount: 3700, percentage: 15, color: '#F97316' },
        { label: 'Subscriptions', amount: 3450, percentage: 15, color: '#10B981' },
        { label: 'Others', amount: 2950, percentage: 10, color: '#CBD5E1' }
      ];
}
