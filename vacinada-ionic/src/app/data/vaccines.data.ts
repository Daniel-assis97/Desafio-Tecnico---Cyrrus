import { Campaign, Child, ChildVaccineRecord, VaccineInfo } from '../models/vaccine.model';

/* Catálogo de vacinas (calendário nacional simplificado) */
export const VACCINES: VaccineInfo[] = [
  { id: 'bcg', name: 'BCG', shortName: 'BCG', description: 'Protege contra formas graves da tuberculose, especialmente a meníngea e a miliar. Aplicada em dose única ao nascer.', protectsAgainst: ['Tuberculose grave'], recommendedAgeMonths: 0, doseLabel: 'Dose única', source: 'PNI / Ministério da Saúde' },
  { id: 'hepb', name: 'Hepatite B', shortName: 'Hep B', description: 'Previne a infecção pelo vírus da hepatite B. A primeira dose deve ser aplicada nas primeiras 24 horas de vida.', protectsAgainst: ['Hepatite B'], recommendedAgeMonths: 0, doseLabel: 'Ao nascer', source: 'PNI / Ministério da Saúde' },
  { id: 'penta1', name: 'Pentavalente (1ª dose)', shortName: 'Penta 1', description: 'Protege contra difteria, tétano, coqueluche, hepatite B e infecções por Haemophilus influenzae tipo b.', protectsAgainst: ['Difteria', 'Tétano', 'Coqueluche', 'Hib', 'Hepatite B'], recommendedAgeMonths: 2, doseLabel: '1ª dose', source: 'PNI / Ministério da Saúde' },
  { id: 'vip1', name: 'Poliomielite (1ª dose)', shortName: 'VIP 1', description: 'Vacina inativada que protege contra a poliomielite (paralisia infantil).', protectsAgainst: ['Poliomielite'], recommendedAgeMonths: 2, doseLabel: '1ª dose', source: 'PNI / Ministério da Saúde' },
  { id: 'rota', name: 'Rotavírus', shortName: 'Rota', description: 'Previne a diarreia grave causada pelo rotavírus em bebês e crianças pequenas.', protectsAgainst: ['Rotavírus'], recommendedAgeMonths: 2, doseLabel: '1ª dose', source: 'PNI / Ministério da Saúde' },
  { id: 'pneumo1', name: 'Pneumocócica 10 (1ª dose)', shortName: 'Pneumo 1', description: 'Protege contra doenças causadas pelo pneumococo, como pneumonia e meningite.', protectsAgainst: ['Pneumonia', 'Meningite', 'Otite'], recommendedAgeMonths: 2, doseLabel: '1ª dose', source: 'PNI / Ministério da Saúde' },
  { id: 'penta2', name: 'Pentavalente (2ª dose)', shortName: 'Penta 2', description: 'Segunda dose da vacina pentavalente, reforçando a proteção iniciada aos 2 meses.', protectsAgainst: ['Difteria', 'Tétano', 'Coqueluche', 'Hib', 'Hepatite B'], recommendedAgeMonths: 4, doseLabel: '2ª dose', source: 'PNI / Ministério da Saúde' },
  { id: 'vip2', name: 'Poliomielite (2ª dose)', shortName: 'VIP 2', description: 'Segunda dose da vacina inativada contra poliomielite.', protectsAgainst: ['Poliomielite'], recommendedAgeMonths: 4, doseLabel: '2ª dose', source: 'PNI / Ministério da Saúde' },
  { id: 'menc', name: 'Meningocócica C', shortName: 'Meningo C', description: 'Protege contra a doença meningocócica do sorogrupo C.', protectsAgainst: ['Meningite C'], recommendedAgeMonths: 3, doseLabel: '1ª dose', source: 'PNI / Ministério da Saúde' },
  { id: 'febreamarela', name: 'Febre Amarela', shortName: 'F. Amarela', description: 'Protege contra a febre amarela. Indicada a partir dos 9 meses de idade.', protectsAgainst: ['Febre amarela'], recommendedAgeMonths: 9, doseLabel: '1ª dose', source: 'PNI / Ministério da Saúde' },
  { id: 'triplaviral', name: 'Tríplice Viral (SCR)', shortName: 'Tríplice Viral', description: 'Protege contra sarampo, caxumba e rubéola. Primeira dose aos 12 meses.', protectsAgainst: ['Sarampo', 'Caxumba', 'Rubéola'], recommendedAgeMonths: 12, doseLabel: '1ª dose', source: 'PNI / Ministério da Saúde' },
  { id: 'hepa', name: 'Hepatite A', shortName: 'Hep A', description: 'Protege contra a hepatite A. Aplicada aos 15 meses.', protectsAgainst: ['Hepatite A'], recommendedAgeMonths: 15, doseLabel: 'Dose única', source: 'PNI / Ministério da Saúde' },
  { id: 'dtp', name: 'DTP (1º reforço)', shortName: 'DTP Ref.', description: 'Reforço contra difteria, tétano e coqueluche aos 15 meses.', protectsAgainst: ['Difteria', 'Tétano', 'Coqueluche'], recommendedAgeMonths: 15, doseLabel: '1º reforço', source: 'PNI / Ministério da Saúde' },
  { id: 'varicela', name: 'Tetra Viral / Varicela', shortName: 'Varicela', description: 'Protege contra sarampo, caxumba, rubéola e varicela (catapora).', protectsAgainst: ['Sarampo', 'Caxumba', 'Rubéola', 'Varicela'], recommendedAgeMonths: 15, doseLabel: 'Dose única', source: 'PNI / Ministério da Saúde' },
];

export const vaccineById = (id: string): VaccineInfo | undefined => VACCINES.find((v) => v.id === id);

/* Helpers de datas */
const iso = (d: Date) => d.toISOString().slice(0, 10);

function addMonths(dateISO: string, months: number): string {
  const d = new Date(dateISO + 'T00:00:00');
  d.setMonth(d.getMonth() + months);
  return iso(d);
}

const today = new Date();
const monthsAgo = (m: number) => { const d = new Date(today); d.setMonth(d.getMonth() - m); return iso(d); };
const daysAhead = (n: number) => { const d = new Date(today); d.setDate(d.getDate() + n); return iso(d); };

/**
 * Gera os registros de uma criança: aplica automaticamente as vacinas cuja
 * idade recomendada é menor que `appliedUpToMonths`; as demais ficam previstas.
 * `overdueIds` força que vacinas específicas fiquem em atraso.
 */
function buildRecords(birthDate: string, appliedUpToMonths: number, overdueIds: string[] = []): ChildVaccineRecord[] {
  return VACCINES.map((v) => {
    const dueDate = addMonths(birthDate, v.recommendedAgeMonths);
    const forcedOverdue = overdueIds.includes(v.id);
    const applied = !forcedOverdue && v.recommendedAgeMonths < appliedUpToMonths;
    return {
      vaccineId: v.id,
      dueDate,
      appliedDate: applied ? dueDate : null,
      location: applied ? 'UBS Jardim das Flores' : undefined,
      batch: applied ? 'LT-' + v.id.toUpperCase().slice(0, 4) + '-2024' : undefined,
    };
  });
}

const helenaBirth = monthsAgo(5);  // bebê ~5 meses, com pendências (cenários 1 e 2)
const theoBirth = monthsAgo(16);   // criança ~16 meses, caderneta em dia (cenário 1)

export const CHILDREN: Child[] = [
  { id: 'helena', name: 'Helena Martins', birthDate: helenaBirth, gender: 'f', color: 'orange', records: buildRecords(helenaBirth, 3, ['pneumo1']) },
  { id: 'theo', name: 'Theo Martins', birthDate: theoBirth, gender: 'm', color: 'green', records: buildRecords(theoBirth, 16) },
];

export const childById = (id: string): Child | undefined => CHILDREN.find((c) => c.id === id);

/* Campanhas ativas (cenário 3) */
export const CAMPAIGNS: Campaign[] = [
  { id: 'gripe', title: 'Campanha Nacional contra a Gripe', description: 'Vacinação contra a influenza para crianças de 6 meses a menores de 6 anos. Procure a unidade de saúde mais próxima.', audience: 'Crianças de 6 meses a 5 anos', startDate: monthsAgo(0), endDate: daysAhead(20), location: 'Unidades Básicas de Saúde (UBS)', highlight: true },
  { id: 'polio', title: 'Dia D contra a Poliomielite', description: 'Mobilização para atualização da caderneta e gotinha contra a paralisia infantil em crianças menores de 5 anos.', audience: 'Crianças menores de 5 anos', startDate: monthsAgo(0), endDate: daysAhead(20), location: 'Postos volantes e UBS', highlight: true },
  { id: 'multi', title: 'Multivacinação Escolar', description: 'Atualização da caderneta de vacinação de crianças e adolescentes diretamente nas escolas participantes.', audience: 'Crianças e adolescentes em idade escolar', startDate: monthsAgo(1), endDate: daysAhead(20), location: 'Escolas municipais conveniadas', highlight: false },
];
