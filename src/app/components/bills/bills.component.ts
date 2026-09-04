import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BillItem } from '../../interface/dashboard.interface';

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  selector: 'app-bills',
  styleUrl: './bills.component.css',
  templateUrl: './bills.component.html',
})
export class BillsComponent {
  // State Signals
  billForm = new FormGroup({
    billName: new FormControl('', Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.min(0)]),
    category: new FormControl('Utilities', Validators.required),
    dueDate: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
  });

  bills = signal<BillItem[]>(this.loadStorage());
  currentDate = new Date();
  selectedCategory = signal<string>('All');
  isModalOpen = signal<boolean>(false);
  selectedMonth = signal<Date>(this.currentDate);
  filteredBills = signal<BillItem[]>(
    this.bills()
      .sort((a, b) => Number(a.status === 'Paid') - Number(b.status === 'Paid'))
      .filter((b) => {
        const billDate = new Date(b.dueDate);
        return (
          billDate.getMonth() === this.selectedMonth().getMonth() &&
          billDate.getFullYear() === this.selectedMonth().getFullYear()
        );
      }),
  );

  // Computed Monthly Total
  monthlyTotal = computed(() => {
    if (this.selectedCategory() !== 'All') {
      return this.filteredBills()
        .filter((x) => x.category === this.selectedCategory() && x.status !== 'Paid')
        .reduce((acc, b) => acc + (b.amount || 0), 0);
    } else {
      return this.filteredBills()
        .filter((x) => x.status !== 'Paid')
        .reduce((acc, b) => acc + (b.amount || 0), 0);
    }
  });

  totalBillItems = computed(() => {
    if (this.selectedCategory() !== 'All') {
      return this.filteredBills().filter(
        (x) => x.category === this.selectedCategory() && x.status !== 'Paid',
      ).length;
    } else {
      return this.filteredBills().filter((x) => x.status !== 'Paid').length;
    }
  });

  // Actions
  saveBill() {
    if (this.billForm.invalid) {
      this.billForm.markAllAsTouched();
      return;
    }

    const billToAdd: BillItem = {
      id: crypto.randomUUID(),
      title: this.billForm.get('billName')?.value || '',
      amount: this.billForm.get('amount')?.value || 0,
      category: (this.billForm.get('category')?.value || 'Utilities') as BillItem['category'],
      dueDate: this.billForm.get('dueDate')?.value || new Date().toISOString().split('T')[0],
      status: 'Pending',
      icon: 'file',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
      date: '',
    };

    const updated = [...this.bills(), billToAdd];
    this.bills.set(updated);
    this.saveStorage(updated);
    this.filterByDate(this.selectedMonth());
    this.filterBills(this.selectedCategory());

    // Reset Form & Close Modal
    this.resetForm();
    this.isModalOpen.set(false);
  }

  resetForm() {
    this.billForm = new FormGroup({
      billName: new FormControl('', Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl('Utilities', Validators.required),
      dueDate: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
    });
  }

  filterBills(category: string) {
    this.selectedCategory.set(category);

    if (category === 'All') {
      this.filteredBills.set(
        this.bills()
          .sort((a, b) => Number(a.status === 'Paid') - Number(b.status === 'Paid'))
          .filter((b) => {
            const billDate = new Date(b.dueDate);
            return (
              billDate.getMonth() === this.selectedMonth().getMonth() &&
              billDate.getFullYear() === this.selectedMonth().getFullYear()
            );
          }),
      );
    } else {
      this.filteredBills.set(
        this.bills()
          .sort((a, b) => Number(a.status === 'Paid') - Number(b.status === 'Paid'))
          .filter((b) => {
            const billDate = new Date(b.dueDate);
            return (
              billDate.getMonth() === this.selectedMonth().getMonth() &&
              billDate.getFullYear() === this.selectedMonth().getFullYear() &&
              b.category === this.selectedCategory()
            );
          }),
      );
    }
  }

  onChangeDate(event?: Event) {
    const selectedMonth = (event?.target as HTMLInputElement)?.valueAsDate;

    if (selectedMonth) {
      this.selectedMonth.set(selectedMonth);
      this.filterByDate(this.selectedMonth());
    }
  }

  filterByDate(date: Date) {
    this.filteredBills.set(
      this.bills()
        .sort((a, b) => Number(a.status === 'Paid') - Number(b.status === 'Paid'))
        .filter((b) => {
          const billDate = new Date(b.dueDate);
          return (
            billDate.getMonth() === date.getMonth() && billDate.getFullYear() === date.getFullYear()
          );
        }),
    );
  }

  toggleStatus(id: string) {
    const updated = this.bills().map((b) => {
      if (b.id === id) {
        const nextStatus: BillItem['status'] = b.status === 'Paid' ? 'Pending' : 'Paid';
        return { ...b, status: nextStatus };
      }
      return b;
    });

    this.bills.set(updated);
    this.filterByDate(this.selectedMonth());
    this.filterBills(this.selectedCategory());
    this.saveStorage(updated);
  }

  deleteBill(id: string) {
    const updated = this.bills().filter((b) => b.id !== id);
    this.bills.set(updated);
    this.saveStorage(updated);
    this.filterByDate(this.selectedMonth());
    this.filterBills(this.selectedCategory());
  }

  // Helpers
  getCategoryStyles(category: BillItem['category']) {
    switch (category) {
      //case 'Housing': return { bg: 'bg-violet-50', text: 'text-violet-600' };
      case 'Utilities':
        return { bg: 'bg-sky-50', text: 'text-sky-600' };
      case 'Transportation':
        return { bg: 'bg-amber-50', text: 'text-amber-600' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-600' };
    }
  }

  getStatusBadgeClass(status: BillItem['status']) {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-50 text-emerald-600';
      case 'Overdue':
        return 'bg-rose-50 text-rose-600';
      default:
        return 'bg-amber-50 text-amber-600';
    }
  }

  private loadStorage(): BillItem[] {
    const data = localStorage.getItem('billtrack_bills');
    return data
      ? JSON.parse(data)
      : [
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
            dueDate: 'May 20, 2025',
          },
        ];
  }

  private saveStorage(bills: BillItem[]) {
    localStorage.setItem('billtrack_bills', JSON.stringify(bills));
  }

  capitalizeFirstLetter(controlName: string): void {
    const control = this.billForm.get(controlName);
    if (!control) return;

    const value = control.value;

    if (value) {
      control.setValue(value.charAt(0).toUpperCase() + value.slice(1), { emitEvent: false });
    }
  }

  sortBills() {
    this.filteredBills().sort((a, b) => {
      return Number(a.status === 'Paid') - Number(b.status === 'Paid');
    });
  }
}
