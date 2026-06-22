import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircle, chevronForward, megaphone } from 'ionicons/icons';
import { VaccineService } from '../../services/vaccine.service';
import { ChildCardComponent } from '../../components/child-card.component';
import { CampaignCardComponent } from '../../components/campaign-card.component';
import { StatusBadgeComponent } from '../../components/status-badge.component';
import { formatDate } from '../../utils/vaccine.utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,
    ChildCardComponent, CampaignCardComponent, StatusBadgeComponent,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Vacinada+</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="vac-container">
        <header class="hero">
          <p class="muted">Olá, responsável 👋</p>
          <h1 class="display">Como está a vacinação hoje?</h1>
        </header>

        @if (totalOverdue > 0) {
          <section class="alert">
            <div class="alert-head">
              <span class="alert-icon"><ion-icon name="alert-circle"></ion-icon></span>
              <div>
                <p class="alert-title">{{ totalOverdue }} vacina(s) em atraso</p>
                <p class="muted small">Há vacinações com data prevista já ultrapassada.</p>
              </div>
            </div>
            @for (p of pendings; track p.child.id + p.record.vaccineId) {
              <a class="pend" [routerLink]="['/child', p.child.id]">
                <div class="pend-info">
                  <p class="pend-name">{{ p.vaccine.name }}</p>
                  <p class="muted small">{{ p.child.name }} • prevista para {{ fmt(p.record.dueDate) }}</p>
                </div>
                <app-status-badge status="overdue"></app-status-badge>
                <ion-icon name="chevron-forward" class="muted"></ion-icon>
              </a>
            }
          </section>
        }

        <section class="block">
          <h2 class="section-title">Suas crianças</h2>
          <p class="section-subtitle">Acompanhe cada uma individualmente</p>
          <div class="vac-grid cols-2 mt">
            @for (c of children; track c.id) {
              <app-child-card [child]="c"></app-child-card>
            }
          </div>
        </section>

        <section class="block">
          <h2 class="section-title"><ion-icon name="megaphone" class="ttl-icon"></ion-icon> Campanhas ativas</h2>
          <p class="section-subtitle">Mobilizações de vacinação em andamento</p>
          <div class="vac-grid cols-2 mt">
            @for (c of activeCampaigns; track c.id) {
              <app-campaign-card [campaign]="c"></app-campaign-card>
            }
          </div>
        </section>
      </div>
    </ion-content>`,
  styles: [`
    .hero h1 { font-size: 26px; margin: 4px 0 0; }
    .small { font-size: 12px; }
    .block { margin-top: 22px; }
    .mt { margin-top: 12px; }
    .ttl-icon { color: var(--vac-orange); vertical-align: -2px; }
    .alert { margin-top: 16px; border: 1px solid rgba(253,167,105,.4); background: rgba(253,167,105,.14); border-radius: 22px; padding: 14px; }
    .alert-head { display: flex; align-items: center; gap: 12px; }
    .alert-icon { width: 40px; height: 40px; border-radius: 14px; background: var(--vac-orange); color: #fff; display: grid; place-items: center; flex: none; }
    .alert-title { font-family: 'Baloo 2'; font-weight: 800; font-size: 17px; margin: 0; }
    .pend { display: flex; align-items: center; gap: 10px; background: #fff; border-radius: 16px; padding: 10px 12px; margin-top: 8px; text-decoration: none; color: inherit; }
    .pend-info { flex: 1; min-width: 0; }
    .pend-name { font-weight: 800; font-size: 14px; margin: 0; }
  `],
})
export class HomePage {
  private svc = inject(VaccineService);
  children = this.svc.getChildren();
  activeCampaigns = this.svc.getActiveCampaigns();
  pendings = this.svc.getOverduePendings();
  totalOverdue = this.svc.totalOverdue();
  fmt = formatDate;
  constructor() { addIcons({ alertCircle, chevronForward, megaphone }); }
}
