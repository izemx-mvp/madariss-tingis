export type SupplyList = {
  id: string;
  label: string;
  /** URL du document téléchargeable, null tant que l'école ne l'a pas fournie */
  file: string | null;
  note: string;
};

export const supplyLists: SupplyList[] = [
  {
    id: "maternelle",
    label: "Maternelle",
    file: null,
    note: "Petite, moyenne et grande section.",
  },
  {
    id: "primaire",
    label: "Primaire",
    file: null,
    note: "De la 1re à la 6e année du primaire.",
  },
  {
    id: "college-lycee",
    label: "Collège – Lycée",
    file: null,
    note: "Listes différenciées selon le niveau et les options.",
  },
];

export const supplyPendingMessage =
  "La liste est remise en fin d'année scolaire. Pour l'obtenir dès maintenant, contactez l'administration.";
