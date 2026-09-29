export type SchoolVideo = { id: string; title: string; text: string };

/** Vidéos YouTube de l'école. Les titres sont à ajuster selon le contenu réel. */
export const videos: SchoolVideo[] = [
  { id: "T7Q97qG7FR4", title: "Moments de vie à Madariss Tingis", text: "Un aperçu de la vie de l'école." },
  { id: "jMaCeS6IshY", title: "Nos élèves en action", text: "Activités et temps forts de l'année." },
  { id: "nhL5M8PrH9c", title: "Sur scène", text: "Spectacles et représentations des élèves." },
  { id: "RoUOhoeLVec", title: "Esprit d'équipe", text: "Le sport et les jeux collectifs." },
  { id: "SAR6--3QW88", title: "Fête de l'école", text: "Un moment partagé avec les familles." },
  { id: "SUQ6v_MPYw0", title: "Apprendre autrement", text: "Ateliers et projets de classe." },
  { id: "ih_keSWjhSA", title: "Talents en herbe", text: "Musique, théâtre et expression." },
  { id: "CNmpXE8THvU", title: "La vie de l'école", text: "Des souvenirs de l'année scolaire." },
  { id: "uuZOW3QPu6E", title: "Ensemble", text: "Élèves, familles et équipe éducative." },
];

export const thumb = (id: string, q: "maxresdefault" | "hqdefault" = "maxresdefault") =>
  `https://img.youtube.com/vi/${id}/${q}.jpg`;
export const embed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
