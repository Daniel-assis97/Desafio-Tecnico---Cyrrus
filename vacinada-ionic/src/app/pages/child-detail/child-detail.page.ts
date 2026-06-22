import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonIcon, IonSegment, IonSegmentButton, IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, alertCircle, time, calendar, location, shieldCheckmark } from 'ionicons/icons';
import { VaccineService } from '../../services/vaccine.service';
import { Child, VaccineStatus } from '../../models/vaccine.model';
import { StatusBadgeComponent } from '../../components/status-badge.component';
import { ProgressRingComponent } from '../../components/progress-ring.component';
import { ageLabel, formatDate, initials, statusOf, summarize } from '../../utils/vaccine.utils';

type Filter = 'pending' | 'applied' | 'all';
const ORDER: Record<VaccineStatus, number> = { overdue: 0, 'due-soon': 1, scheduled: 2, applied: 3 };

@Component({
  selector: 'app-child-detail',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon,
    IonSegment, IonSegmentButton, IonLabel, StatusBadgeComponent, ProgressRingComponent,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button defaultHref="/tabs/home"></ion-back-button></ion-buttons>
        <ion-title>{{ child?.name }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="vac-container">
        @if (child) {
          <header class="vac-card head">
            <span class="avatar" [class]="child.color">{{ ini }}</span>
            <div class="info">
              <h1 class="display name">{{ child.name }}</h1>
              <p class="muted">{{ age }} • nascido(a) em {{ fmt(child.birthDate) }}</p>
              @if (s.hasPending) {
                <span class="status overdue"><ion-icon name="alert-circle"></ion-icon>{{ s.overdue }} em atraso • {{ s.dueSoon }} próxima(s)</span>
              } @else {
                <span class="status ok"><ion-icon name="shield-checkmark"></ion-icon>Caderneta em dia</span>
              }
            </div>
            <app-progress-ring [progress]="s.progress" [size]="76" [stroke]="8"></app-progress-ring>
          </header>

          <div class="stats">
            <div class="vac-card stat"><span class="si success"><ion-icon name="checkmark-circle"></ion-icon></span><b>{{ s.applied }}</b><span class="muted small">Aplicadas</span></div>
            <div class="vac-card stat"><span class="si overdue"><ion-icon name="alert-circle"></ion-icon></span><b>{{ s.overdue }}</b><span class="muted small">Em atraso</span></div>
            <div class="vac-card stat"><span class="si warning"><ion-icon name="time"></ion-icon></span><b>{{ s.dueSoon }}</b><span class="muted small">Próximas</span></div>
            <div class="vac-card stat"><span class="si muted-bg"><ion-icon name="calendar"></ion-icon></span><b>{{ s.scheduled }}</b><span class="muted small">Previstas</span></div>
          </div>

          <ion-segment [value]="filter()" (ionChange)="onFilter($event)" class="seg">
            <ion-segment-button value="pending"><ion-label>Atenção</ion-label></ion-segment-button>
            <ion-segment-button value="applied"><ion-label>Aplicadas</ion-label></ion-segment-button>
            <ion-segment-button value="all"><ion-label>Todas</ion-label></ion-segment-button>
          </ion-segment>

          <div class="list">
            @for (row of records(); track row.r.vaccineId) {
              <article class="vac-card item">
                <div class="item-head">
                  <div>
                    <p class="vname">{{ vName(row.r.vaccineId) }}</p>
                    <p class="dose">{{ vDose(row.r.vaccineId) }}</p>
                  </div>
                  <app-status-badge [status]="row.status"></app-status-badge>
                </div>
                <p class="muted protect">Protege contra: {{ vProtect(row.r.vaccineId) }}.</p>
                <div class="meta">
                  <span><ion-icon name="calendar"></ion-icon>
                    {{ row.status === 'applied' ? 'Aplicada em ' : 'Prevista para ' }}{{ fmt(row.r.appliedDate || row.r.dueDate) }}</span>
                  @if (row.r.location) { <span><ion-icon name="location"></ion-icon>{{ row.r.location }}</span> }
                </div>
                @if (row.status === 'overdue') {
                  <p class="pend-warn">⚠️ Pendência: a data prevista já passou. Procure uma unidade de saúde.</p>
                }
              </article>
            }
            @if (records().length === 0) {
              <div class="vac-card empty muted">Nenhuma vacina nesta categoria.</div>
            }
          </div>
        } @else {
          <div class="vac-card empty">Criança não encontrada.</div>
        }
      </div>
    </ion-content>`,
  styles: [`
    .small { font-size: 12px; }
    .head { display: flex; align-items: center; gap: 14px; padding: 16px; }
    .avatar { width: 64px; height: 64px; border-radius: 18px; display: grid; place-items: center; font-weight: 800; font-size: 22px; flex: none; }
    .avatar.green { background: var(--vac-green); color: #36402a; }
    .avatar.yellow { background: var(--vac-yellow); color: #473c33; }
    .avatar.orange { background: var(--vac-orange); color: #fff; }
    .info { flex: 1; min-width: 0; }
    .name { font-size: 22px; margin: 0; }
    .status { display: inline-flex; align-items: center; gap: 6px; border-radius: 999px; padding: 4px 12px; font-size: 12px; font-weight: 800; margin-top: 6px; }
    .status.overdue { background: rgba(253,167,105,.2); }
    .status.overdue ion-icon { color: var(--vac-orange); }
    .status.ok { background: rgba(171,194,112,.22); }
    .status.ok ion-icon { color: var(--vac-green); }
    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 16px 0; }
    @media (min-width: 720px) { .stats { grid-template-columns: repeat(4,1fr); } }
    .stat { padding: 14px; display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }
    .stat b { font-family: 'Baloo 2'; font-size: 24px; }
    .si { width: 36px; height: 36px; border-radius: 14px; display: grid; place-items: center; }
    .si.success { background: rgba(171,194,112,.2); color: var(--vac-green); }
    .si.overdue { background: rgba(253,167,105,.2); color: var(--vac-orange); }
    .si.warning { background: rgba(254,200,104,.35); color: #b88a2a; }
    .si.muted-bg { background: var(--vac-muted); color: var(--vac-muted-text); }
    .seg { margin-bottom: 14px; max-width: 360px; }
    .list { display: flex; flex-direction: column; gap: 12px; }
    .item { padding: 16px; }
    .item-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
    .vname { font-family: 'Baloo 2'; font-weight: 800; font-size: 16px; margin: 0; }
    .dose { color: var(--vac-orange); font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; margin: 0; }
    .protect { font-weight: 600; font-size: 14px; margin: 8px 0; }
    .meta { display: flex; flex-wrap: wrap; gap: 12px; font-weight: 700; font-size: 14px; }
    .meta ion-icon { color: var(--vac-muted-text); vertical-align: -2px; margin-right: 4px; }
    .pend-warn { margin: 12px 0 0; background: rgba(253,167,105,.15); border-radius: 14px; padding: 10px 12px; font-size: 12px; font-weight: 800; }
    .empty { padding: 28px; text-align: center; font-weight: 700; }
  `],
})
export class ChildDetailPage {
  private route = inject(ActivatedRoute);
  private svc = inject(VaccineService);
  child: Child | undefined;
  filter = signal<Filter>('pending');
  fmt = formatDate;

  records = computed(() => {
    if (!this.child) return [];
    const f = this.filter();
    const withStatus = this.child.records.map((r) => ({ r, status: statusOf(r) }));
    return withStatus
      .filter(({ status }) => f === 'all' ? true : f === 'applied' ? status === 'applied' : status !== 'applied')
      .sort((a, b) => ORDER[a.status] !== ORDER[b.status] ? ORDER[a.status] - ORDER[b.status] : a.r.dueDate.localeCompare(b.r.dueDate));
  });

  constructor() {
    addIcons({ checkmarkCircle, alertCircle, time, calendar, location, shieldCheckmark });
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.child = this.svc.getChild(id);
  }

  get s() { return this.child ? summarize(this.child) : { total: 0, applied: 0, overdue: 0, dueSoon: 0, scheduled: 0, progress: 0, hasPending: false }; }
  get ini() { return this.child ? initials(this.child.name) : ''; }
  get age() { return this.child ? ageLabel(this.child.birthDate) : ''; }

  onFilter(ev: CustomEvent) { this.filter.set((ev.detail as { value: Filter }).value); }
  vName(id: string) { return this.svc.getVaccine(id)?.name; }
  vDose(id: string) { return this.svc.getVaccine(id)?.doseLabel; }
  vProtect(id: string) { return this.svc.getVaccine(id)?.protectsAgainst.join(', '); }
}
