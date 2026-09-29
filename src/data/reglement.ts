/**
 * Règlement intérieur de Madariss Tingis.
 * Texte reformulé en français clair à partir du règlement de l'école,
 * fondé sur la loi 06.00 relative au statut de l'enseignement scolaire privé
 * et la circulaire ministérielle n°78 du 24/06/2003. Le sens n'est pas modifié.
 */

export type Article = {
  id: string;
  num: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type Titre = {
  id: string;
  num: string;
  title: string;
  intro: string;
  articles: Article[];
};

export const reglement: Titre[] = [
  {
    id: "titre-1",
    num: "Titre I",
    title: "Admission et inscription",
    intro: "Les conditions dans lesquelles un élève est admis, inscrit et réinscrit à Madariss Tingis.",
    articles: [
      {
        id: "t1-a1",
        num: "Article 1",
        title: "Le droit d'être inscrit ou réinscrit",
        paragraphs: [
          "Tout élève peut être inscrit ou réinscrit à Madariss Tingis, sous réserve de respecter les conditions et les modalités fixées par l'école.",
          "L'admission suppose la présentation des documents demandés et la réussite d'un test d'accès au niveau, qui permet de situer l'élève et de l'orienter vers la classe qui lui convient.",
          "La priorité est accordée aux frères et sœurs des élèves déjà scolarisés dans l'établissement.",
        ],
      },
      {
        id: "t1-a2",
        num: "Article 2",
        title: "L'inscription définitive",
        paragraphs: ["L'inscription n'est définitive qu'une fois les trois éléments suivants réunis :"],
        list: [
          "la fiche de renseignements complétée et signée par le parent ou le tuteur légal ;",
          "le certificat de radiation de l'établissement précédent, pour les élèves nouvellement inscrits ;",
          "le règlement des droits annuels d'inscription.",
        ],
      },
      {
        id: "t1-a3",
        num: "Article 3",
        title: "Le paiement de la scolarité",
        paragraphs: [
          "Les frais de scolarité sont réglés mensuellement auprès du service comptable de l'école, avant le 05 du mois suivant.",
        ],
      },
    ],
  },
  {
    id: "titre-2",
    num: "Titre II",
    title: "Fréquentation scolaire",
    intro: "Les horaires, la présence en classe et la gestion des absences et des retards.",
    articles: [
      {
        id: "t2-a1",
        num: "Article 1",
        title: "Les horaires de l'école",
        paragraphs: [
          "Les horaires d'enseignement sont fixés comme suit :",
        ],
        list: [
          "Maternelle et primaire (à l'exception de la 6e année) : de 8h30 à 15h30 ;",
          "Collège et 6e année : de 8h00 à 16h00.",
          "Les portes de l'école ouvrent à 7h45 et ferment à 8h40.",
          "Tout élève arrivant en retard doit être accompagné d'un adulte jusqu'au secrétariat, à l'exception des élèves de maternelle.",
        ],
      },
      {
        id: "t2-a2",
        num: "Article 2",
        title: "Présence, absences et retards",
        paragraphs: [
          "La présence en classe est obligatoire. Toute absence doit être justifiée auprès du surveillant général, par un certificat médical et/ou un justificatif écrit d'un parent, et l'élève reprend les cours muni d'un billet d'excuse.",
          "Trois retards au cours d'un même mois entraînent un avertissement. Un quatrième retard entraîne le retrait d'un point de discipline.",
        ],
      },
      {
        id: "t2-a3",
        num: "Article 3",
        title: "Prévenir l'école",
        paragraphs: ["Selon la nature de l'absence, la marche à suivre est la suivante :"],
        list: [
          "absence prévisible : informer à l'avance la direction et l'enseignant(e) ;",
          "absence imprévue : avertir l'école le jour même ;",
          "absence longue : fournir un certificat médical attestant de la non-contagion avant le retour en classe.",
        ],
      },
      {
        id: "t2-a4",
        num: "Article 4",
        title: "Le matériel nécessaire aux séances",
        paragraphs: [
          "Chaque élève doit se présenter en classe avec l'ensemble des fournitures scolaires nécessaires au bon déroulement des séances.",
        ],
      },
    ],
  },
  {
    id: "titre-3",
    num: "Titre III",
    title: "Hygiène et vie scolaire",
    intro: "La tenue, le matériel, la discipline et les règles de vie commune au sein de l'établissement.",
    articles: [
      {
        id: "t3-a1",
        num: "Article 1",
        title: "Hygiène et tenue",
        paragraphs: [
          "Une attention particulière est portée à l'hygiène, notamment à la propreté des cheveux et au dépistage des poux en maternelle et au primaire.",
          "La tenue doit être propre et décente. Pour les filles du collège, les épaules et les genoux doivent être couverts ; le maquillage et les bijoux excentriques ne sont pas admis.",
          "Les coupes de cheveux excentriques, les teintures et les piercings sont interdits.",
        ],
      },
      {
        id: "t3-a2",
        num: "Article 2",
        title: "Fournitures et manuels",
        paragraphs: [
          "Les fournitures scolaires et les manuels sont achetés par les élèves.",
          "Les manuels de la bibliothèque et centre de documentation (BCD) sont prêtés par l'école. En cas de dégradation ou de perte, le remplacement du livre ou le paiement de sa valeur est à la charge des parents.",
        ],
      },
      {
        id: "t3-a3",
        num: "Article 3",
        title: "Objets personnels",
        paragraphs: [
          "Les objets personnels apportés à l'école demeurent sous la responsabilité des élèves.",
        ],
      },
      {
        id: "t3-a4",
        num: "Article 4",
        title: "Discipline et respect",
        paragraphs: [
          "La vie scolaire repose sur le dialogue, le respect, la tolérance et le pardon.",
          "Toute forme de violence est proscrite, au sein de l'école comme dans les bus scolaires et lors des sorties. Elle est sanctionnée de manière proportionnelle aux faits.",
        ],
      },
      {
        id: "t3-a5",
        num: "Article 5",
        title: "Accès aux salles de classe",
        paragraphs: [
          "Aucun élève n'entre en classe sans la présence de l'enseignant.",
        ],
      },
      {
        id: "t3-a6",
        num: "Article 6",
        title: "Téléphones et appareils électroniques",
        paragraphs: [
          "Les téléphones, tablettes et autres appareils électroniques sont interdits dans l'établissement.",
          "Tout appareil constaté est confisqué et restitué en personne à un parent ou au tuteur légal.",
        ],
      },
      {
        id: "t3-a7",
        num: "Article 7",
        title: "Objets et documents interdits",
        paragraphs: [
          "Sont interdits tous les objets ou documents contraires à la morale ou dangereux : revues indécentes, objets tranchants, jeux dangereux.",
        ],
      },
      {
        id: "t3-a8",
        num: "Article 8",
        title: "Tabac, substances et conseil de discipline",
        paragraphs: [
          "Le tabac et les drogues sont strictement interdits.",
          "Les manquements graves relèvent du conseil de discipline, dont les décisions peuvent aller jusqu'à l'exclusion, voire la remise du dossier aux instances policières et judiciaires.",
        ],
      },
    ],
  },
];

export const reglementSources =
  "Ce règlement s'appuie sur la loi 06.00 relative au statut de l'enseignement scolaire privé et sur la circulaire ministérielle n°78 du 24/06/2003.";
