import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { MockDataService } from '../../services/mock-data.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DecimalPipe, TranslatePipe, ChartComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  mockData = inject(MockDataService);
  translation = inject(TranslationService);

  stats = this.mockData.dashboardStats;
  salesPerDay = this.mockData.salesPerDayData;
  revenueTrend = this.mockData.revenueTrendData;
  categoryDist = this.mockData.categoryDistributionData;
}
