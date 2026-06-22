import { Injectable } from '@angular/core';
import { CAMPAIGNS, CHILDREN, childById, VACCINES, vaccineById } from '../data/vaccines.data';
import { Campaign, Child, VaccineInfo } from '../models/vaccine.model';
import { statusOf, summarize } from '../utils/vaccine.utils';

/**
 * Camada de acesso aos dados. Hoje usa dados em memória (mock); pode ser
 * trocada por chamadas HTTP a uma API sem alterar os componentes.
 */
@Injectable({ providedIn: 'root' })
export class VaccineService {
  getChildren(): Child[] { return CHILDREN; }
  getChild(id: string): Child | undefined { return childById(id); }
  getVaccines(): VaccineInfo[] { return VACCINES; }
  getVaccine(id: string): VaccineInfo | undefined { return vaccineById(id); }
  getCampaigns(): Campaign[] { return CAMPAIGNS; }
  getActiveCampaigns(): Campaign[] { return CAMPAIGNS.filter((c) => c.highlight); }

  /** Total de vacinas em atraso somando todas as crianças. */
  getOverduePendings() {
    return this.getChildren().flatMap((child) =>
      child.records
        .filter((r) => statusOf(r) === 'overdue')
        .map((r) => ({ child, record: r, vaccine: this.getVaccine(r.vaccineId)! }))
    );
  }

  totalOverdue(): number {
    return this.getChildren().reduce((acc, c) => acc + summarize(c).overdue, 0);
  }
}
