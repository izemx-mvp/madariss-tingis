import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Briefcase, Clock, ExternalLink, FileSignature, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/tingis-logo.png";
import { doors, site, telHref } from "@/data/site";
import { WaveDivider } from "./blocks/WaveDivider";
import { iconFor } from "./nav-meta";

const columns: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "L'école",
    links: [
      { to: "/mission", label: "Mission" },
      { to: "/projet-ecole", label: "Projet d'école" },
      { to: "/cycles", label: "Cycles" },
      { to: "/nos-eleves", label: "Nos élèves" },
      { to: "/reglement-interieur", label: "Règlement intérieur" },
      { to: "/horaires", label: "Horaires" },
    ],
  },
  {
    title: "Familles",
    links: [
      { to: "/inscription", label: "Demande d'inscription" },
      { to: "/conditions-admission", label: "Conditions d'admission" },
      { to: "/frais-de-scolarite", label: "Frais de scolarité" },
      { to: "/calendrier", label: "Calendrier" },
      { to: "/restauration", label: "Restauration" },
      { to: "/transport-scolaire", label: "Transport scolaire" },
    ],
  },
  {
    title: "Activités",
    links: [
      { to: "/sport", label: "Sport" },
      { to: "/theatre", label: "Théâtre" },
      { to: "/echecs", label: "Échecs" },
      { to: "/musique", label: "Musique" },
      { to: "/photos", label: "Galerie photos" },
      { to: "/videos", label: "Galerie vidéo" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="no-print relative">
      {/* la vague chevauche le bas de la section précédente, quelle que soit sa couleur */}
      <WaveDivider fill="teal" className="absolute inset-x-0 bottom-full" />
      <div className="relative overflow-hidden bg-teal-900 text-white">
        <div className="zellige absolute inset-0" aria-hidden="true" />
        <span
          lang="ar"
          dir="rtl"
          aria-hidden="true"
          className="arabic pointer-events-none absolute -bottom-10 -left-6 text-[9rem] leading-none text-white/[0.04] select-none md:text-[15rem]"
        >
          {site.nameAr}
        </span>

        {/* ---------- Deux portes d'entrée ---------- */}
        <div className="relative container-site pt-6 pb-12">
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              to="/inscription"
              className="group flex items-center gap-5 rounded-[2rem] bg-coral-600 p-6 shadow-lift transition-transform duration-300 hover:-translate-y-1 md:p-8"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15">
                <FileSignature className="size-7" strokeWidth={1.5} />
              </span>
              <span className="flex-1">
                <span className="block font-display text-2xl text-white md:text-3xl">Inscrire mon enfant</span>
                <span className="mt-1 block text-white/85">Une demande en ligne, en quelques minutes.</span>
              </span>
              <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link
              to="/carriere"
              className="group flex items-center gap-5 rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur transition-transform duration-300 hover:-translate-y-1 md:p-8"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/10">
                <Briefcase className="size-7" strokeWidth={1.5} />
              </span>
              <span className="flex-1">
                <span className="block font-display text-2xl text-white md:text-3xl">Rejoindre l'équipe</span>
                <span className="mt-1 block text-white/80">Enseignement, vie scolaire, administration.</span>
              </span>
              <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

        {/* ---------- Colonnes ---------- */}
        <div className="relative container-site grid gap-10 border-t border-white/10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,1fr)_1.3fr]">
          <div>
            <div className="inline-block rounded-2xl bg-white px-5 py-3">
              <img src={logo} alt={`Logo ${site.name}`} className="h-10 w-auto" loading="lazy" width={340} height={112} />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/75">
              École privée à Tanger, de la maternelle au lycée. Programme marocain officiel, français renforcé et anglais
              valorisé.
            </p>
            <p className="hand-note mt-4" style={{ color: "var(--teal-500)" }}>
              {site.tagline}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-lg text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => {
                  const Icon = iconFor(l.to);
                  return (
                    <li key={l.to}>
                      <Link to={l.to as never} className="group inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white">
                        <Icon className="size-3.5 text-teal-500 transition-colors group-hover:text-coral-500" strokeWidth={1.8} />
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-display text-lg text-white">Nous contacter</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-teal-500" strokeWidth={1.75} />
                <a href={site.mapsLink} target="_blank" rel="noreferrer noopener" className="hover:text-white">
                  {site.address}
                </a>
              </li>
              {site.phones.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <Phone className="mt-0.5 size-4 shrink-0 text-teal-500" strokeWidth={1.75} />
                  <a href={telHref(p)} className="hover:text-white">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-teal-500" strokeWidth={1.75} />
                <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-teal-500" strokeWidth={1.75} />
                <span>
                  Portes ouvertes de {doors.open} à {doors.close}
                  <br />
                  Vendredi : sortie à 13h30
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- Carte + espace parents ---------- */}
        <div className="relative container-site grid gap-6 pb-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/15">
            <iframe
              title="Carte de localisation de Madariss Tingis"
              src={site.maps}
              loading="lazy"
              className="h-56 w-full grayscale-[35%]"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-[2rem] border border-white/15 bg-white/5 p-6 md:p-8">
            <div>
              <h3 className="font-display text-xl text-white">Espace parents</h3>
              <p className="mt-2 text-sm text-white/75">Suivi de la scolarité, annonces de l'école et résultats officiels.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[
                { href: site.pronote, label: "Pronote", sub: "Communication école-familles" },
                { href: site.massar, label: "Massar", sub: "Service du ministère" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3 transition-colors hover:bg-white/20"
                >
                  <span>
                    <span className="block font-bold text-white">{l.label}</span>
                    <span className="block text-xs text-white/70">{l.sub}</span>
                  </span>
                  <ExternalLink className="size-4 shrink-0 text-white/80" strokeWidth={1.8} />
                </a>
              ))}
            </div>
            <a
              href={site.mapsLink}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
            >
              Itinéraire dans Google Maps <ExternalLink className="size-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        {/* ---------- Bas de page ---------- */}
        <div className="relative border-t border-white/10">
          <div className="container-site flex flex-col items-center justify-between gap-4 py-5 text-xs text-white/60 md:flex-row">
            <p>
              © {new Date().getFullYear()} {site.name} · Tanger
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/politique-de-confidentialite" className="hover:text-white">
                Politique de confidentialité
              </Link>
              <Link to="/mentions-legales" className="hover:text-white">
                Mentions légales
              </Link>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white hover:bg-white/20"
                aria-label="Revenir en haut de la page"
              >
                <ArrowUp className="size-3.5" /> Haut de page
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
