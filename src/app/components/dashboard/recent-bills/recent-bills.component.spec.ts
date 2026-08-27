import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentBillsComponent } from './recent-bills.component';

describe('RecentBillsComponent', () => {
  let component: RecentBillsComponent;
  let fixture: ComponentFixture<RecentBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentBillsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentBillsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
