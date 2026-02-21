import {
  Component,
  input,
  effect,
  viewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: [`
    :host { display: block; height: 100%; min-height: 200px; }
    canvas { width: 100% !important; height: 100% !important; }
  `]
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  type = input<ChartType>('line');
  labels = input<string[]>([]);
  data = input<number[]>([]);
  label = input<string>('');
  colors = input<string[]>(['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']);

  private chart: Chart | null = null;

  constructor() {
    effect(() => {
      const labels = this.labels();
      const data = this.data();
      if (this.chart && labels.length && data.length) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
    this.chart = null;
  }

  private initChart(): void {
    const canvasEl = this.canvas()?.nativeElement;
    if (!canvasEl) return;

    const config: ChartConfiguration = {
      type: this.type(),
      data: {
        labels: this.labels(),
        datasets: [{
          label: this.label(),
          data: this.data(),
          borderColor: this.colors()[0],
          backgroundColor: this.type() === 'doughnut' || this.type() === 'pie'
            ? this.colors()
            : `${this.colors()[0]}20`,
          fill: this.type() === 'line',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: this.type() === 'doughnut' || this.type() === 'pie' }
        },
        scales: this.type() === 'line' || this.type() === 'bar'
          ? {
              y: { beginAtZero: true },
              x: { grid: { display: false } }
            }
          : undefined
      }
    };

    this.chart = new Chart(canvasEl, config);
  }
}
