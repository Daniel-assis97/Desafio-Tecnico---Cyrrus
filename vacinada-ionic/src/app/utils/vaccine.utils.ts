import { Child, ChildSummary, ChildVaccineRecord, VaccineStatus } from '../models/vaccine.model';

const DAY = 1000 * 60 * 60 * 24;
const DUE_SOON_WINDOW = 30; // dias

export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function statusOf(record: ChildVaccineRecord, now: Date = startOfToday()): VaccineStatus {
  if (record.appliedDate) return 'applied';
  const due = new Date(record.dueDate + 'T00:00:00');
  const diffDays = Math.round((due.getTime() - now.getTime()) / DAY);
  if (diffDays < 0) return 'overdue';
  if (diffDays <= DUE_SOON_WINDOW) return 'due-soon';
  return 'scheduled';
}

export const STATUS_LABEL: Record<VaccineStatus, string> = {
  applied: 'Aplicada',
  'due-soon': 'Próxima',
  overdue: 'Em atraso',
  scheduled: 'Prevista',
};

export function summarize(child: Child, now: Date = startOfToday()): ChildSummary {
  let applied = 0, overdue = 0, dueSoon = 0, scheduled = 0;
  for (const r of child.records) {
    const s = statusOf(r, now);
    if (s === 'applied') applied++;
    else if (s === 'overdue') overdue++;
    else if (s === 'due-soon') dueSoon++;
    else scheduled++;
  }
  const total = child.records.length;
  return { total, applied, overdue, dueSoon, scheduled, progress: total ? Math.round((applied / total) * 100) : 0, hasPending: overdue > 0 || dueSoon > 0 };
}

export function ageLabel(birthDate: string, now: Date = startOfToday()): string {
  const b = new Date(birthDate + 'T00:00:00');
  let months = (now.getFullYear() - b.getFullYear()) * 12 + (now.getMonth() - b.getMonth());
  if (now.getDate() < b.getDate()) months -= 1;
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  if (rem === 0) return `${years} ${years === 1 ? 'ano' : 'anos'}`;
  return `${years}a ${rem}m`;
}

export function formatDate(isoStr: string): string {
  return new Date(isoStr + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function ageText(months: number): string {
  if (months === 0) return 'Ao nascer';
  if (months < 12) return `${months} meses`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m ? `${y}a ${m}m` : `${y} ano${y > 1 ? 's' : ''}`;
}

export function initials(name: string): string {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}
