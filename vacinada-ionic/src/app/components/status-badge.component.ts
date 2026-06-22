import { Component, Input } from '@angular/core';
import { VaccineStatus } from '../models/vaccine.model';
import { STATUS_LABEL } from '../utils/vaccine.utils';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `<span class="badge" [class]="status">
    <span class="dot"></span>{{ label }}
  </span>`,
  styles: [`
    .badge { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;
      border-radius: 999px; padding: 3px 10px; font-size: 12px; font-weight: 800; border: 1px solid transparent; }
    .dot { width: 7px; height: 7px; border-radius: 999px; }
    .applied { background: rgba(171,194,112,.22); color: #36402a; border-color: rgba(171,194,112,.5); }
    .applied .dot { background: var(--vac-green); }
    .due-soon { background: rgba(254,200,104,.3); color: #473c33; border-color: rgba(254,200,104,.6); }
    .due-soon .dot { background: var(--vac-yellow); }
    .overdue { background: var(--vac-orange); color: #fff; border-color: var(--vac-orange); }
    .overdue .dot { background: #fff; }
    .scheduled { background: var(--vac-muted); color: var(--vac-muted-text); border-color: var(--vac-border); }
    .scheduled .dot { background: var(--vac-muted-text); }
  `],
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: VaccineStatus;
  get label(): string { return STATUS_LABEL[this.status]; }
}
