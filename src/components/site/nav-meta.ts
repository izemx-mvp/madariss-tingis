import {
  Backpack,
  Bus,
  CalendarDays,
  Clapperboard,
  ClipboardCheck,
  Clock,
  Compass,
  Crown,
  Drama,
  ExternalLink,
  FileSignature,
  GraduationCap,
  HeartPulse,
  Images,
  Music,
  NotebookPen,
  Palmtree,
  PartyPopper,
  ScrollText,
  Soup,
  Sparkles,
  Target,
  Trophy,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import heroMission from "@/assets/hero-mission.jpg";
import valeursCour from "@/assets/valeurs-cour.jpg";
import partenariatParents from "@/assets/partenariat-parents.jpg";
import heroAdmission from "@/assets/hero-admission.jpg";
import masterChef from "@/assets/master-chef-junior.jpg";
import sport from "@/assets/sport-1.jpg";

/** Icône de chaque lien du menu (clé = route). */
export const linkIcons: Record<string, LucideIcon> = {
  "/mission": Target,
  "/projet-ecole": Compass,
  "/cycles": GraduationCap,
  "/reglement-interieur": ScrollText,
  "/note-de-rentree-2026-2027": NotebookPen,
  "/conditions-admission": ClipboardCheck,
  "/fournitures-manuels": Backpack,
  "/horaires": Clock,
  "/vacances-scolaires": Palmtree,
  "/nos-eleves": Sparkles,
  "/assistance-medicale": HeartPulse,
  "/restauration": Soup,
  "/transport-scolaire": Bus,
  "/inscription": FileSignature,
  "/frais-de-scolarite": Wallet,
  "/calendrier": CalendarDays,
  "/evenements": PartyPopper,
  "/sport": Trophy,
  "/theatre": Drama,
  "/echecs": Crown,
  "/musique": Music,
  "/photos": Images,
  "/videos": Clapperboard,
};

export const iconFor = (to: string, external?: boolean): LucideIcon => (external ? ExternalLink : (linkIcons[to] ?? Sparkles));

/** Carte mise en avant dans chaque méga-menu (clé = libellé du groupe). */
export const groupFeatures: Record<string, { intro: string; image: string; alt: string; cta: { to: string; label: string } }> = {
  Présentation: {
    intro: "Notre mission, notre projet éducatif et nos cycles, de la maternelle au lycée.",
    image: heroMission,
    alt: "Élèves et enseignante à Madariss Tingis",
    cta: { to: "/mission", label: "Découvrir l'école" },
  },
  "Vie Scolaire": {
    intro: "Règlement, horaires, rentrée et admission : tout pour bien vivre l'année.",
    image: valeursCour,
    alt: "Élèves réunis dans la cour de l'école",
    cta: { to: "/horaires", label: "Voir les horaires" },
  },
  Services: {
    intro: "Santé, restauration et transport : les services qui simplifient le quotidien.",
    image: partenariatParents,
    alt: "Échange entre un parent et l'école",
    cta: { to: "/contact", label: "Poser une question" },
  },
  Inscription: {
    intro: "Déposez votre demande en ligne et découvrez comment fonctionne la scolarité.",
    image: heroAdmission,
    alt: "Une famille accueillie à l'école",
    cta: { to: "/inscription", label: "Inscrire mon enfant" },
  },
  Calendrier: {
    intro: "Rentrée, congés, examens et événements : les temps forts de l'année.",
    image: masterChef,
    alt: "Atelier Master Chef Junior",
    cta: { to: "/evenements/master-chef-junior", label: "Master Chef Junior" },
  },
  Activités: {
    intro: "Sport, théâtre, échecs et musique : apprendre aussi en dehors de la classe.",
    image: sport,
    alt: "Match de football entre élèves",
    cta: { to: "/photos", label: "La galerie photos" },
  },
};
