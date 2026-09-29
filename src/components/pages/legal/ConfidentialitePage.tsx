import { site } from "@/data/site";
import { LegalPage, ToComplete } from "./LegalPage";

export function ConfidentialitePage() {
  return (
    <LegalPage
      chapter="01"
      title="Politique de confidentialité"
      lead="Comment Madariss Tingis collecte, utilise et protège les données personnelles transmises via ce site, conformément à la loi 09-08."
      updated="Septembre 2026"
      related={[
        { to: "/mentions-legales", label: "Mentions légales", desc: "Éditeur et informations du site." },
        { to: "/contact", label: "Contact", desc: "Exercer vos droits." },
        { to: "/inscription", label: "Demande d'inscription", desc: "Le formulaire en ligne." },
      ]}
      sections={[
        {
          id: "responsable",
          title: "Responsable du traitement",
          body: (
            <p>
              Les données collectées sur ce site sont traitées par <strong>{site.name}</strong>, {site.address}. Contact :{" "}
              <a className="text-teal-700 underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          ),
        },
        {
          id: "donnees",
          title: "Données collectées",
          body: (
            <>
              <p>Le site collecte uniquement les informations que vous saisissez dans ses formulaires :</p>
              <ul>
                <li><strong>Demande d'inscription</strong> : identité et coordonnées du parent, identité, date de naissance et niveau de l'enfant, adresse, services souhaités, commentaire.</li>
                <li><strong>Grille tarifaire</strong> : nom, email, téléphone, niveau concerné.</li>
                <li><strong>Contact</strong> : nom, email, téléphone (facultatif), objet, message.</li>
                <li><strong>Candidature</strong> : identité, coordonnées, domaine, message et CV.</li>
              </ul>
            </>
          ),
        },
        {
          id: "finalites",
          title: "Finalités",
          body: (
            <p>
              Ces données servent uniquement à répondre à votre demande : traiter une demande d'inscription, transmettre une
              information, répondre à un message ou étudier une candidature. Elles ne sont ni vendues ni utilisées à des fins
              publicitaires.
            </p>
          ),
        },
        {
          id: "destinataires",
          title: "Destinataires",
          body: <p>Les données sont destinées à l'administration et à la direction de l'école, dans la limite de ce qui est nécessaire à leur mission.</p>,
        },
        {
          id: "conservation",
          title: "Durée de conservation",
          body: (
            <p>
              Les données sont conservées le temps nécessaire au traitement de la demande, puis pendant une durée de{" "}
              <ToComplete>durée à préciser par l'école</ToComplete>.
            </p>
          ),
        },
        {
          id: "droits",
          title: "Vos droits",
          body: (
            <>
              <p>
                Conformément à la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des
                données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition.
              </p>
              <p>
                Pour l'exercer, écrivez à{" "}
                <a className="text-teal-700 underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                . Vous pouvez également vous adresser à la Commission nationale de contrôle de la protection des données à
                caractère personnel (CNDP).
              </p>
            </>
          ),
        },
        {
          id: "services-tiers",
          title: "Cartes et vidéos",
          body: (
            <p>
              Le site intègre une carte Google Maps et des vidéos YouTube (en mode confidentialité renforcée, chargées
              uniquement lorsque vous lancez une vidéo). Ces services peuvent déposer leurs propres cookies lorsque vous
              interagissez avec eux.
            </p>
          ),
        },
      ]}
    />
  );
}
