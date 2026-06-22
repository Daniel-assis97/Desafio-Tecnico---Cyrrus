export type VaccineStatus = 'applied' | 'scheduled' | 'overdue' | 'due-soon';

export interface VaccineInfo {
  id: string;
  name: string;
  shortName: string;
  description: string;
  protectsAgainst: string[];
  recommendedAgeMonths: number;
  doseLabel: string;
  source: string;
}

export interface ChildVaccineRecord {
  vaccineId: string;
  dueDate: string;        // ISO yyyy-mm-dd (data prevista)
  appliedDate: string | null; // ISO ou null se ainda não aplicada
  location?: string;
  batch?: string;
}

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  gender: 'f' | 'm';
  color: 'green' | 'yellow' | 'orange';
  records: ChildVaccineRecord[];
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  audience: string;
  startDate: string;
  endDate: string;
  location: string;
  highlight: boolean;
}

export interface ChildSummary {
  total: number;
  applied: number;
  overdue: number;
  dueSoon: number;
  scheduled: number;
  progress: number;
  hasPending: boolean;
}
