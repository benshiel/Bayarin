import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-footer-navigation',
  styleUrl: './footer-navigation.component.css',
  templateUrl: './footer-navigation.component.html',
})
export class FooterNavigationComponent {
  private router = inject(Router);
  private currentTab = signal<string>('dashboard');

  isBold = signal<boolean>(true);
  
  goToDashboardTab() {
    this.router.navigate(['/dashboard']);
  }

  goToBillsTab() {
    this.router.navigate(['/bills']);
  }

}
