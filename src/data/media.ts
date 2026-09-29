/**
 * Images des pages Services / Événements.
 * Tant que les visuels dédiés ne sont pas générés, on réutilise des images
 * existantes. Pour les remplacer, il suffit de changer les imports ci-dessous :
 * aucune page n'a besoin d'être modifiée.
 */
import heroAccueil from "@/assets/hero-accueil.jpg";
import heroAdmission from "@/assets/hero-admission.jpg";
import partenariatParents from "@/assets/partenariat-parents.jpg";
import valeursCour from "@/assets/valeurs-cour.jpg";
import masterChef from "@/assets/master-chef-junior.jpg";
import cyclePrimaire from "@/assets/cycle-primaire.jpg";
import cycleMaternelle from "@/assets/cycle-maternelle.jpg";
import cycleCollege from "@/assets/cycle-college-lycee.jpg";
import bcd from "@/assets/bcd-bibliotheque.jpg";
import sport from "@/assets/sport-1.jpg";
import theatre from "@/assets/theatre-1.jpg";
import musique from "@/assets/musique-1.jpg";
import echecs from "@/assets/echecs-1.jpg";
import trilinguisme from "@/assets/trilinguisme.jpg";
import heroNosEleves from "@/assets/hero-nos-eleves.jpg";
import heroNoteRentree from "@/assets/hero-note-rentree.jpg";
import heroProjetEcole from "@/assets/hero-projet-ecole.jpg";

export type Media = { src: string; alt: string };

export const media = {
  medical: {
    hero: { src: partenariatParents, alt: "Une responsable de la vie scolaire échange avec un parent à l'entrée de l'école" },
    care: { src: cycleMaternelle, alt: "Des enfants de maternelle dans une classe lumineuse et soignée" },
    hygiene: { src: valeursCour, alt: "Élèves réunis dans la cour arborée de l'école" },
  },
  restauration: {
    hero: { src: masterChef, alt: "Élèves en tablier autour d'une table de cuisine" },
    intro: { src: valeursCour, alt: "Élèves partageant un moment convivial dans la cour" },
    gallery: [
      { src: masterChef, alt: "Atelier cuisine avec les élèves" },
      { src: cyclePrimaire, alt: "Élèves de primaire travaillant ensemble" },
      { src: heroAccueil, alt: "Une enseignante et ses élèves autour d'une table" },
      { src: cycleMaternelle, alt: "Coin convivial en maternelle" },
    ],
  },
  transport: {
    hero: { src: heroAdmission, alt: "Une famille accueillie à l'entrée de l'école" },
    safety: { src: valeursCour, alt: "Élèves dans la cour de l'école" },
    gallery: [
      { src: heroAdmission, alt: "Arrivée des familles à l'école" },
      { src: valeursCour, alt: "La cour de l'école" },
      { src: cycleCollege, alt: "Collégiens à l'école" },
      { src: partenariatParents, alt: "Échange entre un parent et l'école" },
    ],
  },
  events: {
    hero: { src: masterChef, alt: "Élèves en toque et tablier cuisinant avec un chef" },
    photos: { src: sport, alt: "Match de football entre élèves" },
    videos: { src: theatre, alt: "Élèves sur scène lors d'une représentation" },
    library: { src: bcd, alt: "La bibliothèque de l'école" },
    music: { src: musique, alt: "Élèves en atelier musique" },
    chess: { src: echecs, alt: "Deux élèves concentrés devant un échiquier" },
  },
  /**
   * Activités : une seule image dédiée existe par activité (sport-1, theatre-1…).
   * Les galeries sont complétées par des images de vie scolaire en attendant
   * les visuels dédiés (sport-2.jpg… à générer puis à brancher ici).
   */
  sport: {
    hero: { src: sport, alt: "Match de football entre élèves dans la cour de l'école" },
    gallery: [
      { src: sport, alt: "Match de football entre élèves" },
      { src: valeursCour, alt: "Élèves réunis dans la cour" },
      { src: cycleCollege, alt: "Collégiens en activité" },
      { src: heroNosEleves, alt: "Élèves de Madariss Tingis" },
      { src: heroAccueil, alt: "Travail d'équipe en classe" },
    ],
  },
  theatre: {
    hero: { src: theatre, alt: "Élèves en costumes sur scène" },
    gallery: [
      { src: theatre, alt: "Représentation des élèves sur scène" },
      { src: heroNoteRentree, alt: "Fête de l'école dans la cour" },
      { src: trilinguisme, alt: "Élèves lisant des textes à la bibliothèque" },
      { src: cyclePrimaire, alt: "Élèves préparant un projet en groupe" },
      { src: heroNosEleves, alt: "Élèves de Madariss Tingis" },
    ],
  },
  echecs: {
    hero: { src: echecs, alt: "Deux élèves concentrés devant un échiquier" },
    gallery: [
      { src: echecs, alt: "Partie d'échecs entre deux élèves" },
      { src: bcd, alt: "La bibliothèque, un lieu de concentration" },
      { src: cycleCollege, alt: "Collégiens en réflexion" },
      { src: heroProjetEcole, alt: "Élèves en activité à l'école" },
    ],
  },
  musique: {
    hero: { src: musique, alt: "Élèves en atelier musique" },
    gallery: [
      { src: musique, alt: "Atelier musique" },
      { src: heroNoteRentree, alt: "Fête de l'école" },
      { src: cycleMaternelle, alt: "Éveil artistique en maternelle" },
      { src: heroNosEleves, alt: "Élèves de Madariss Tingis" },
      { src: valeursCour, alt: "Moment partagé dans la cour" },
    ],
  },
  vieScolaire: [
    { src: bcd, alt: "La bibliothèque et centre de documentation (BCD)" },
    { src: valeursCour, alt: "La cour arborée de l'école" },
    { src: trilinguisme, alt: "Lecture en arabe, français et anglais" },
    { src: heroNoteRentree, alt: "La rentrée des classes" },
    { src: masterChef, alt: "Atelier cuisine avec les élèves" },
    { src: cyclePrimaire, alt: "Projet de groupe en primaire" },
    { src: cycleMaternelle, alt: "Coin lecture en maternelle" },
    { src: heroAccueil, alt: "Une enseignante et ses élèves" },
  ],
} satisfies Record<string, Record<string, Media | Media[]> | Media[]>;
