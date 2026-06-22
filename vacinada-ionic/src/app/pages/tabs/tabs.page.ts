import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, medkit, megaphone } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
          <ion-icon name="home"></ion-icon>
          <ion-label>Início</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="vaccines">
          <ion-icon name="medkit"></ion-icon>
          <ion-label>Vacinas</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="campaigns">
          <ion-icon name="megaphone"></ion-icon>
          <ion-label>Campanhas</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>`,
})
export class TabsPage {
  constructor() { addIcons({ home, medkit, megaphone }); }
}
