import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { megaphone } from 'ionicons/icons';
import { VaccineService } from '../../services/vaccine.service';
import { CampaignCardComponent } from '../../components/campaign-card.component';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, CampaignCardComponent],
  template: `
    <ion-header>
      <ion-toolbar><ion-title>Campanhas</ion-title></ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="vac-container">
        <header class="hero">
          <span class="badge"><ion-icon name="megaphone"></ion-icon></span>
          <div>
            <h1 class="display">Campanhas</h1>
            <p class="muted">Mobilizações de vacinação para o público infantil</p>
          </div>
        </header>
        <div class="vac-grid cols-2">
          @for (c of campaigns; track c.id) {
            <app-campaign-card [campaign]="c"></app-campaign-card>
          }
        </div>
      </div>
    </ion-content>`,
  styles: [`
    .hero { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .hero h1 { font-size: 26px; margin: 0; }
    .badge { width: 48px; height: 48px; border-radius: 16px; background: var(--vac-orange); color: #fff; display: grid; place-items: center; font-size: 22px; flex: none; }
  `],
})
export class CampaignsPage {
  private svc = inject(VaccineService);
  campaigns = this.svc.getCampaigns();
  constructor() { addIcons({ megaphone }); }
}
