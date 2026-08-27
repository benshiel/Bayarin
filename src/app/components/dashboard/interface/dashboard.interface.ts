export interface OverviewCard {
  title: string;
  amount: number;
  subtext: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  barColor: string;
}

export interface CategoryBreakdown {
  label: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface BillItem {
  id: string;
  title: string;
  date: string;
  amount: number;
  dueText?: string;
  status?: 'Paid' | 'Pending' | 'Overdue';
  icon: string;
  iconBg: string;
  iconColor: string;
}