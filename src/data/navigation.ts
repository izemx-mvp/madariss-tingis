export type NavLink = {
  to: string;
  label: string;
  desc?: string;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  to?: string;
  links: NavLink[];
  featured?: "vie-scolaire" | "activites";
};

export const navigation: NavGroup[] = [
  { label: "Accueil", to: "/", links: [] },
  {
    label: "Présentation",
    links: [
      { to: "/mission", label: "Mission", desc: "Former pour un avenir meilleur." },
      { to: "/projet-ecole", label: "Projet d'école", desc: "Nos axes pédagogiques." },
      { to: "/cycles", label: "Cycles", desc: "De la maternelle au lycée." },
      {
        to: "https://massarservice.men.gov.ma/",
        label: "Massar",
        desc: "Le service officiel du ministère.",
        external: true,
      },
      {
        to: "https://e212077u.index-education.net/pronote",
        label: "Pronote",
        desc: "Le suivi quotidien des familles.",
        external: true,
      },
    ],
  },
  {
    label: "Vie Scolaire",
    featured: "vie-scolaire",
    links: [
      { to: "/reglement-interieur", label: "Règlement intérieur", desc: "Les règles de la vie à l'école." },
      { to: "/note-de-rentree-2025-2026", label: "Note de rentrée", desc: "Le mot de l'équipe." },
      { to: "/conditions-admission", label: "Conditions d'admission", desc: "Les étapes et le dossier." },
      { to: "/fournitures-manuels", label: "Fournitures & Manuels", desc: "Listes et manuels de la BCD." },
      { to: "/horaires", label: "Horaires", desc: "Journée et semaine par niveau." },
      { to: "/vacances-scolaires", label: "Vacances scolaires", desc: "Le rythme de l'année." },
      { to: "/nos-eleves", label: "Nos élèves", desc: "Créativité et leadership." },
    ],
  },
  {
    label: "Services",
    links: [
      { to: "/assistance-medicale", label: "Assistance médicale", desc: "Santé et bien-être." },
      { to: "/restauration", label: "Restauration", desc: "Le service de cantine." },
      { to: "/transport-scolaire", label: "Transport scolaire", desc: "Se rendre à l'école." },
    ],
  },
  {
    label: "Inscription",
    links: [
      { to: "/inscription", label: "Demande d'inscription", desc: "Le formulaire en ligne." },
      { to: "/frais-de-scolarite", label: "Frais de scolarité", desc: "Comment fonctionne le paiement." },
    ],
  },
  {
    label: "Calendrier",
    links: [
      { to: "/calendrier", label: "Calendrier", desc: "Les temps forts de l'année." },
      { to: "/evenements", label: "Événements scolaires", desc: "Ce qui se prépare." },
    ],
  },
  {
    label: "Activités",
    featured: "activites",
    links: [
      { to: "/sport", label: "Sport", desc: "Esprit d'équipe et effort." },
      { to: "/theatre", label: "Théâtre", desc: "Confiance et expression." },
      { to: "/echecs", label: "Échecs", desc: "Concentration et stratégie." },
      { to: "/musique", label: "Musique", desc: "Écoute et sensibilité." },
      { to: "/photos", label: "Galerie photos", desc: "Nos moments en images." },
      { to: "/videos", label: "Galerie vidéo", desc: "L'école en mouvement." },
    ],
  },
  { label: "Carrière", to: "/carriere", links: [] },
];
