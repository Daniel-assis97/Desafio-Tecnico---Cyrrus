import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendar, location, megaphone, star } from 'ionicons/icons';
import { Campaign } from '../models/vaccine.model';
import { formatDate } from '../utils/vaccine.utils';

@Component({
  selector: 'app-campaign-card',
  standalone: true,
  imports: [IonIcon],
  template: `
    <article class="vac-card campaign">
      <header [class.hl]="campaign.highlight">
        <span class="mark"><ion-icon [name]="campaign.highlight ? 'star' : 'megaphone'"></ion-icon></span>
        <div>
          <p class="title">{{ campaign.title }}</p>
          <span class="tag">Campanha ativa</span>
        </div>
      </header>
      <div class="body">
        <p class="muted desc">{{ campaign.description }}</p>
        <span class="audience">{{ campaign.audience }}</span>
        <div class="meta"><ion-icon name="calendar"></ion-icon><b>{{ start }} — {{ end }}</b></div>
        <div class="meta"><ion-icon name="location"></ion-icon><b>{{ campaign.location }}</b></div>
      </div>
    </article>`,
  styles: [`
    .campaign { overflow: hidden; }
    header { display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: var(--vac-yellow); color: #473c33; }
    header.hl { background: var(--vac-orange); color: #fff; }
    .mark { width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,.3); display: grid; place-items: center; flex: none; }
    .title { font-family: 'Baloo 2'; font-weight: 800; margin: 0; font-size: 16px; line-height: 1.15; }
    .tag { display: inline-block; background: rgba(255,255,255,.3); border-radius: 999px; padding: 1px 8px; font-size: 12px; font-weight: 800; margin-top: 2px; }
    .body { padding: 14px 18px; display: flex; flex-direction: column; gap: 10px; }
    .desc { font-weight: 600; font-size: 14px; margin: 0; }
    .audience { align-self: flex-start; background: rgba(171,194,112,.25); color: #473c33; border-radius: 999px; padding: 4px 12px; font-size: 12px; font-weight: 800; }
    .meta { display: flex; align-items: center; gap: 8px; font-size: 14px; }
    .meta ion-icon { color: var(--vac-orange); }
  `],
})
export class CampaignCardComponent {
  @Input({ required: true }) campaign!: Campaign;
  constructor() { addIcons({ calendar, location, megaphone, star }); }
  get start() { return formatDate(this.campaign.startDate); }
  get end() { return formatDate(this.campaign.endDate); }
}
