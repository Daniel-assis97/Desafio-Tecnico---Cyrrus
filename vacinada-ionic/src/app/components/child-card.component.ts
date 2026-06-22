import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward, alertCircle, checkmarkCircle, time } from 'ionicons/icons';
import { Child } from '../models/vaccine.model';
import { ageLabel, initials, summarize } from '../utils/vaccine.utils';
import { ProgressRingComponent } from './progress-ring.component';

@Component({
  selector: 'app-child-card',
  standalone: true,
  imports: [RouterLink, IonIcon, ProgressRingComponent],
  template: `
    <a class="vac-card card" [routerLink]="['/child', child.id]">
      <span class="avatar" [class]="child.color">{{ ini }}</span>
      <div class="info">
        <p class="name">{{ child.name }}</p>
        <p class="age muted">{{ age }}</p>
        <div class="chips">
          @if (s.overdue > 0) {
            <span class="chip overdue"><ion-icon name="alert-circle"></ion-icon>{{ s.overdue }} em atraso</span>
          }
          @if (s.dueSoon > 0) {
            <span class="chip warning"><ion-icon name="time"></ion-icon>{{ s.dueSoon }} próxima(s)</span>
          }
          @if (!s.hasPending) {
            <span class="chip success"><ion-icon name="checkmark-circle"></ion-icon>Em dia</span>
          }
        </div>
      </div>
      <app-progress-ring [progress]="s.progress"></app-progress-ring>
      <ion-icon class="arrow" name="chevron-forward"></ion-icon>
    </a>`,
  styles: [`
    .card { display: flex; align-items: center; gap: 14px; padding: 14px; text-decoration: none; color: inherit; }
    .avatar { width: 56px; height: 56px; border-radius: 18px; display: grid; place-items: center; font-weight: 800; font-size: 18px; flex: none; }
    .avatar.green { background: var(--vac-green); color: #36402a; }
    .avatar.yellow { background: var(--vac-yellow); color: #473c33; }
    .avatar.orange { background: var(--vac-orange); color: #fff; }
    .info { flex: 1; min-width: 0; }
    .name { font-family: 'Baloo 2'; font-weight: 800; font-size: 18px; margin: 0; }
    .age { font-weight: 700; font-size: 13px; margin: 2px 0; }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
    .chip { display: inline-flex; align-items: center; gap: 4px; border-radius: 999px; padding: 2px 9px; font-size: 12px; font-weight: 800; }
    .chip ion-icon { font-size: 13px; }
    .chip.overdue { background: var(--vac-orange); color: #fff; }
    .chip.warning { background: rgba(254,200,104,.4); color: #473c33; }
    .chip.success { background: rgba(171,194,112,.3); color: #36402a; }
    .arrow { color: var(--vac-muted-text); flex: none; }
  `],
})
export class ChildCardComponent {
  @Input({ required: true }) child!: Child;
  constructor() { addIcons({ chevronForward, alertCircle, checkmarkCircle, time }); }
  get s() { return summarize(this.child); }
  get age() { return ageLabel(this.child.birthDate); }
  get ini() { return initials(this.child.name); }
}
