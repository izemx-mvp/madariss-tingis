import masterChef from "@/assets/master-chef-junior.jpg";
import cyclePrimaire from "@/assets/cycle-primaire.jpg";
import valeursCour from "@/assets/valeurs-cour.jpg";

export type ArticleBlock =
  | { kind: "text"; paragraphs: string[] }
  | { kind: "list"; intro?: string; items: string[] }
  | { kind: "image"; src: string; alt: string; caption: string }
  | { kind: "callout"; title: string; text: string };

export type ArticleSection = { id: string; title: string; blocks: ArticleBlock[] };

export type SchoolEvent = {
  slug: string;
  title: string;
  lead: string;
  badge: string;
  status: "upcoming" | "past";
  /** null = date communiquée plus tard via Pronote */
  date: string | null;
  image: string;
  alt: string;
  tags: string[];
  readingTime: string;
  quote: string;
  sections: ArticleSection[];
};

export const events: SchoolEvent[] = [
  {
    slug: "master-chef-junior",
    title: "Master Chef Junior arrive bientôt à Madariss Tingis !",
    lead: "Un atelier gourmand où nos élèves enfilent la toque, goûtent, dosent, présentent… et apprennent autrement.",
    badge: "Bientôt",
    status: "upcoming",
    date: null,
    image: masterChef,
    alt: "Élèves en toque et tablier cuisinant avec un chef",
    tags: ["Atelier", "Travail d'équipe", "Tous niveaux"],
    readingTime: "3 min de lecture",
    quote: "On retient mieux ce que l'on a fait de ses mains.",
    sections: [
      {
        id: "idee",
        title: "L'idée",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Cuisiner, c'est lire une consigne, mesurer, compter, coopérer et présenter son travail. C'est exactement ce que nous aimons faire vivre à nos élèves : apprendre en faisant, ensemble, avec le sourire.",
              "Master Chef Junior transforme la cuisine en salle de classe grandeur nature, où chaque geste a un sens et chaque équipe a un rôle à jouer.",
            ],
          },
        ],
      },
      {
        id: "deroulement",
        title: "Comment ça se passe",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Master Chef Junior réunira des équipes d'élèves autour d'ateliers de préparation, de dégustation et de présentation.",
            ],
          },
          {
            kind: "list",
            intro: "Chaque équipe travaillera :",
            items: [
              "l'organisation et la répartition des rôles ;",
              "le goût et le soin apporté à la préparation ;",
              "la propreté du plan de travail ;",
              "la prise de parole devant les autres.",
            ],
          },
          {
            kind: "image",
            src: cyclePrimaire,
            alt: "Élèves travaillant en équipe autour d'une table",
            caption: "Le travail d'équipe, au cœur de chaque atelier.",
          },
        ],
      },
      {
        id: "apprentissages",
        title: "Ce que les élèves apprennent",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Derrière la toque se cachent des compétences que nous travaillons toute l'année : suivre des étapes dans l'ordre, calculer des proportions, s'écouter, s'entraider et valoriser le travail bien fait.",
              "C'est aussi une belle occasion de développer la confiance en soi, en présentant fièrement sa création devant ses camarades.",
            ],
          },
          {
            kind: "callout",
            title: "Apprendre autrement",
            text: "Lire, mesurer, coopérer, présenter : Master Chef Junior relie les apprentissages de la classe à une expérience concrète et joyeuse.",
          },
        ],
      },
      {
        id: "infos",
        title: "Infos pratiques",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Les informations pratiques (date, organisation, niveaux concernés) seront communiquées aux familles via Pronote. En attendant, l'administration reste à votre disposition pour toute question.",
            ],
          },
          {
            kind: "image",
            src: valeursCour,
            alt: "Élèves réunis dans la cour de l'école",
            caption: "Une école où l'on apprend aussi en dehors de la classe.",
          },
        ],
      },
    ],
  },
];

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
