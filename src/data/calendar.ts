export type CalendarPeriod = {
  id: string;
  month: string;
  title: string;
  type: "Rentrée" | "Vacances" | "Examens" | "Événement";
  /** null = date non communiquée à ce jour */
  date: string | null;
  text: string;
};

/**
 * Seule la rentrée de septembre est confirmée à ce jour.
 * Les autres dates sont communiquées aux familles via Pronote.
 */
export const schoolYearPeriods: CalendarPeriod[] = [
  {
    id: "rentree",
    month: "Septembre",
    title: "Rentrée scolaire",
    type: "Rentrée",
    date: "Septembre 2026",
    text: "L'accueil des élèves ouvre l'année scolaire. Les modalités sont précisées aux familles avant la rentrée.",
  },
  {
    id: "vac-automne",
    month: "Octobre – Novembre",
    title: "Vacances d'automne",
    type: "Vacances",
    date: null,
    text: "Période de congés fixée par le calendrier officiel.",
  },
  {
    id: "vac-hiver",
    month: "Décembre – Janvier",
    title: "Vacances d'hiver",
    type: "Vacances",
    date: null,
    text: "Période de congés fixée par le calendrier officiel.",
  },
  {
    id: "vac-printemps",
    month: "Mars – Avril",
    title: "Vacances de printemps",
    type: "Vacances",
    date: null,
    text: "Période de congés fixée par le calendrier officiel.",
  },
  {
    id: "examens",
    month: "Mai – Juin",
    title: "Période des examens",
    type: "Examens",
    date: null,
    text: "Les dates des épreuves sont communiquées aux familles en cours d'année.",
  },
  {
    id: "fin-annee",
    month: "Juin",
    title: "Fin de l'année scolaire",
    type: "Vacances",
    date: null,
    text: "Les listes de fournitures de l'année suivante sont remises à cette période.",
  },
];

export const pronoteNotice = "Dates communiquées via Pronote";
