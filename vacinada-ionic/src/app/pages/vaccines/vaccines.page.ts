import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { medkit, shieldCheckmark, happy } from 'ionicons/icons';
import { VaccineService } from '../../services/vaccine.service';
import { ageText } from '../../utils/vaccine.utils';

@Component({
  selector: 'app-vaccines',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon],
  template: `
    <ion-header>
      <ion-toolbar><ion-title>Vacinas</ion-title></ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="vac-container">
        <header class="hero">
          <span class="badge"><ion-icon name="medkit"></ion-icon></span>
          <div>
            <h1 class="display">Vacinas</h1>
            <p class="muted">Calendário nacional de vacinação infantil</p>
          </div>
        </header>

        <div class="vac-grid cols-2">
          @for (v of vaccines; track v.id) {
            <article class="vac-card item">
              <div class="top">
                <div>
                  <h2 class="vname">{{ v.name }}</h2>
                  <span class="dose">{{ v.doseLabel }}</span>
                </div>
                <span class="age"><ion-icon name="happy"></ion-icon>{{ ageText(v.recommendedAgeMonths) }}</span>
              </div>
              <p class="muted desc">{{ v.description }}</p>
              <p class="protect-label"><ion-icon name="shield-checkmark"></ion-icon> Protege contra</p>
              <div class="tags">
                @for (p of v.protectsAgainst; track p) { <span class="tag">{{ p }}</span> }
              </div>
            </article>
          }
        </div>

        <p class="muted note">Fonte: Programa Nacional de Imunizações (PNI) / Ministério da Saúde.
          Conteúdo informativo — siga sempre a orientação do profissional de saúde.</p>
      </div>
    </ion-content>`,
  styles: [`
    .hero { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .hero h1 { font-size: 26px; margin: 0; }
    .badge { width: 48px; height: 48px; border-radius: 16px; background: var(--vac-green); color: #36402a; display: grid; place-items: center; font-size: 22px; flex: none; }
    .item { padding: 18px; }
    .top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
    .vname { font-family: 'Baloo 2'; font-weight: 800; font-size: 18px; margin: 0; }
    .dose { color: var(--vac-orange); font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; }
    .age { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; background: var(--vac-yellow); color: #473c33; border-radius: 999px; padding: 4px 11px; font-size: 12px; font-weight: 800; }
    .desc { font-weight: 600; font-size: 14px; margin: 12px 0; }
    .protect-label { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; color: var(--vac-muted-text); margin: 0 0 6px; }
    .protect-label ion-icon { color: var(--vac-green); }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .tag { background: rgba(171,194,112,.22); color: #36402a; border-radius: 999px; padding: 3px 10px; font-size: 12px; font-weight: 800; }
    .note { font-size: 12px; text-align: center; margin-top: 18px; font-weight: 600; }
  `],
})
export class VaccinesPage {
  private svc = inject(VaccineService);
  vaccines = this.svc.getVaccines();
  ageText = ageText;
  constructor() { addIcons({ medkit, shieldCheckmark, happy }); }
}
