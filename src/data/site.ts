export const SCHOOL_YEAR = "2025/2026";

export const site = {
  name: "Madariss Tingis",
  nameAr: "مدارس طنجيس",
  tagline: "Apprendre aujourd'hui, réussir demain…",
  domain: "madarisstingis.ma",
  address: "km 5,5, Route de Rabat, Ziaten (derrière Aswak Assalam), Tanger 90000",
  addressShort: "Route de Rabat, Ziaten — Tanger",
  phones: ["05 39 38 02 64", "05 39 43 43 16"],
  email: "administration@madarisstingis.ma",
  pronote: "https://e212077u.index-education.net/pronote",
  massar: "https://massarservice.men.gov.ma/",
  maps: "https://www.google.com/maps?q=Madariss+Tingis,+Route+de+Rabat,+Ziaten,+Tanger&output=embed",
  mapsLink: "https://www.google.com/maps/search/Madariss+Tingis,+Route+de+Rabat,+Ziaten,+Tanger",
};

export const telHref = (phone: string) => `tel:+212${phone.replace(/\D/g, "").replace(/^0/, "")}`;

export const values = [
  {
    title: "Écoute, bienveillance et égalité",
    note: "à retenir !",
    text: "Chaque élève est accueilli, entendu et traité avec la même attention.",
  },
  {
    title: "Créativité et adaptabilité face aux défis",
    note: "on adore",
    text: "Apprendre à chercher, à essayer et à rebondir devant l'imprévu.",
  },
  {
    title: "Investissement dans la réussite de chaque élève",
    note: "notre moteur",
    text: "Un accompagnement pédagogique et personnel, au rythme de l'élève.",
  },
  {
    title: "Recherche constante de la meilleure qualité d'enseignement",
    note: "exigence",
    text: "Des enseignants formés chaque année et des pratiques qui évoluent.",
  },
  {
    title: "Communauté unie et solidaire",
    note: "ensemble",
    text: "Élèves, familles et équipe éducative avancent dans la même direction.",
  },
];

export const commitments = [
  "Offrir une expérience éducative de qualité",
  "Accompagner chaque élève vers la réussite",
  "Développer les compétences de demain",
  "Transmettre des valeurs fortes et durables",
  "Éveiller les talents, révéler les potentiels",
  "Allier tradition et innovation pédagogique",
];

export const marqueeValues = [
  "Écoute",
  "Bienveillance",
  "Égalité",
  "Créativité",
  "Adaptabilité",
  "Excellence",
  "Solidarité",
];

export type Cycle = {
  slug: string;
  title: string;
  lead: string;
  text: string;
};

export const cycles: Cycle[] = [
  {
    slug: "maternelle",
    title: "Maternelle",
    lead: "Une maison commune où chaque enfant se sent chez lui.",
    text: "Le plaisir de lire, d'écrire et d'exprimer sa personnalité, de compter et de résoudre des problèmes, l'éveil aux arts et l'apprentissage du vivre-ensemble.",
  },
  {
    slug: "primaire",
    title: "Primaire",
    lead: "Le programme officiel marocain, avec un français renforcé.",
    text: "Un socle commun solide, un accompagnement pédagogique et personnel, des travaux interdisciplinaires en projet et en équipe.",
  },
  {
    slug: "college-lycee",
    title: "Collège – Lycée",
    lead: "Cap sur le baccalauréat scientifique et l'orientation universitaire.",
    text: "Abstraction, analyse, synthèse et esprit critique, trois langues d'enseignement et la construction d'un projet personnel.",
  },
];

export const schedules = [
  {
    id: "maternelle",
    label: "Maternelle",
    week: "Lundi à jeudi : 8h30 – 15h30",
    friday: "Vendredi : 8h30 – 13h30",
  },
  {
    id: "primaire",
    label: "Primaire (sauf 6e)",
    week: "Lundi à jeudi : 8h30 – 15h30",
    friday: "Vendredi : 8h30 – 13h30",
  },
  {
    id: "college",
    label: "Collège & 6e",
    week: "Lundi à jeudi : 8h00 – 16h00",
    friday: "Vendredi : 8h30 – 13h30",
  },
  {
    id: "lycee",
    label: "Lycée",
    week: "Lundi à jeudi : 8h30 – 15h30",
    friday: "Vendredi : 8h30 – 13h30",
  },
];

export const doors = {
  open: "7h45",
  close: "8h40",
};
