import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-ring',
  standalone: true,
  template: `
    <div class="ring" [style.width.px]="size" [style.height.px]="size">
      <svg [attr.width]="size" [attr.height]="size" style="transform: rotate(-90deg)">
        <circle [attr.cx]="size/2" [attr.cy]="size/2" [attr.r]="r" fill="none" stroke="var(--vac-muted)" [attr.stroke-width]="stroke"></circle>
        <circle [attr.cx]="size/2" [attr.cy]="size/2" [attr.r]="r" fill="none" stroke="var(--vac-green)"
          [attr.stroke-width]="stroke" stroke-linecap="round" [attr.stroke-dasharray]="c" [attr.stroke-dashoffset]="offset"></circle>
      </svg>
      <span class="label">{{ progress }}%</span>
    </div>`,
  styles: [`
    .ring { position: relative; display: grid; place-items: center; flex: none; }
    .label { position: absolute; font-weight: 800; font-size: 12px; color: var(--vac-brown); }
  `],
})
export class ProgressRingComponent {
  @Input() progress = 0;
  @Input() size = 56;
  @Input() stroke = 6;
  get r() { return (this.size - this.stroke) / 2; }
  get c() { return 2 * Math.PI * this.r; }
  get offset() { return this.c - (this.progress / 100) * this.c; }
}
