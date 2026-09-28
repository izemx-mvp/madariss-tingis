import { Link } from "@tanstack/react-router";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/tingis-logo.png.asset.json";
import { site, telHref } from "@/data/site";
import { Action } from "./blocks/primitives";

const quickLinks = [
  { to: "/mission", label: "Mission" },
  { to: "/cycles", label: "Cycles" },
  { to: "/horaires", label: "Horaires" },
  { to: "/reglement-interieur", label: "Règlement intérieur" },
  { to: "/inscription", label: "Demande d'inscription" },
  { to: "/frais-de-scolarite", label: "Frais de scolarité" },
  { to: "/calendrier", label: "Calendrier" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-900 text-white no-print">
      <div className="zellige absolute inset-0" aria-hidden="true" />

      <div className="relative border-b border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-5 py-10 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-2xl text-white md:text-3xl">Rejoindre l'équipe&nbsp;?</h2>
            <p className="mt-1 text-white/75">
              Enseignement, vie scolaire, administration : envoyez une candidature spontanée.
            </p>
          </div>
          <Action to="/carriere" variant="light">
            Déposer ma candidature
          </Action>
        </div>
      </div>

      <div className="relative container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-block rounded-2xl bg-white px-5 py-3">
            <img src={logo.url} alt={`Logo ${site.name}`} className="h-10 w-auto" loading="lazy" width={340} height={112} />
          </div>
          <p className="mt-4 text-sm text-white/75">
            École privée à Tanger, de la maternelle au lycée. Programme marocain officiel, français renforcé et anglais
            valorisé.
          </p>
          <p lang="ar" dir="rtl" className="arabic mt-4 text-2xl text-white/70">
            {site.nameAr}
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg text-white">Liens rapides</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/75">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to as never} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-white">Nous contacter</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-teal-500" strokeWidth={1.75} />
              <span>{site.address}</span>
            </li>
            {site.phones.map((p) => (
              <li key={p} className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-teal-500" strokeWidth={1.75} />
                <a href={telHref(p)} className="hover:text-white">
                  {p}
                </a>
              </li>
            ))}
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-teal-500" strokeWidth={1.75} />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              href={site.pronote}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20"
            >
              Pronote <ExternalLink className="size-3.5" strokeWidth={1.75} />
            </a>
            <a
              href={site.massar}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20"
            >
              Massar <ExternalLink className="size-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg text-white">Nous trouver</h3>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/15">
            <iframe
              title="Carte de localisation de Madariss Tingis"
              src={site.maps}
              loading="lazy"
              className="h-44 w-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
          >
            Ouvrir dans Google Maps <ExternalLink className="size-3.5" strokeWidth={1.75} />
          </a>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex gap-4">
            <Link to="/politique-de-confidentialite" className="hover:text-white">
              Politique de confidentialité
            </Link>
            <Link to="/mentions-legales" className="hover:text-white">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
