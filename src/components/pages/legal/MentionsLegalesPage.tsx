import { site } from "@/data/site";
import { LegalPage, ToComplete } from "./LegalPage";

export function MentionsLegalesPage() {
  return (
    <LegalPage
      chapter="01"
      title="Mentions légales"
      lead={`Les informations relatives à l'éditeur et à l'hébergement du site ${site.domain}.`}
      updated="Septembre 2026"
      related={[
        { to: "/politique-de-confidentialite", label: "Politique de confidentialité", desc: "Vos données et vos droits." },
        { to: "/contact", label: "Contact", desc: "Joindre l'administration." },
        { to: "/reglement-interieur", label: "Règlement intérieur", desc: "Les règles de l'école." },
      ]}
      sections={[
        {
          id: "editeur",
          title: "Éditeur du site",
          body: (
            <ul>
              <li><strong>{site.name}</strong>, établissement d'enseignement scolaire privé</li>
              <li>Adresse : {site.address}</li>
              <li>Téléphone : {site.phones.join(" / ")}</li>
              <li>Email : {site.email}</li>
              <li>Identifiants légaux (RC, ICE) : <ToComplete>à compléter par l'école</ToComplete></li>
            </ul>
          ),
        },
        {
          id: "publication",
          title: "Directeur de la publication",
          body: <p><ToComplete>Nom et fonction à compléter par l'école</ToComplete></p>,
        },
        {
          id: "hebergement",
          title: "Hébergement",
          body: <p><ToComplete>Nom, adresse et contact de l'hébergeur à compléter</ToComplete></p>,
        },
        {
          id: "propriete",
          title: "Propriété intellectuelle",
          body: (
            <p>
              Le nom, le logo, les textes et les visuels du site sont la propriété de {site.name} ou utilisés avec
              autorisation. Toute reproduction sans accord préalable est interdite.
            </p>
          ),
        },
        {
          id: "visuels",
          title: "Crédits visuels",
          body: <p>Certaines images du site sont des illustrations et ne représentent pas nécessairement des élèves ou des membres du personnel de l'école.</p>,
        },
        {
          id: "liens",
          title: "Liens externes",
          body: (
            <p>
              Le site propose des liens vers des services externes (Pronote, Massar, Google Maps, YouTube). {site.name} n'est
              pas responsable de leur contenu ni de leurs conditions d'utilisation.
            </p>
          ),
        },
      ]}
    />
  );
}
