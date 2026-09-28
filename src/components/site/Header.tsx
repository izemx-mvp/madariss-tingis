import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ExternalLink, Mail, Menu, Phone, X } from "lucide-react";
import logo from "@/assets/tingis-logo.png.asset.json";
import heroVieScolaire from "@/assets/valeurs-cour.jpg";
import heroActivites from "@/assets/master-chef-junior.jpg";
import { navigation } from "@/data/navigation";
import { site, telHref } from "@/data/site";
import { cn } from "@/lib/utils";

function LogoLink({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center", className)} aria-label={`${site.name} — accueil`}>
      <img
        src={logo.url}
        alt={`Logo ${site.name}`}
        className="logo-blend h-[38px] w-auto md:h-12"
        width={340}
        height={112}
      />
    </Link>
  );
}

function TopBar() {
  return (
    <div className="hidden bg-coral-600 text-white md:block">
      <div className="container-site flex items-center justify-between gap-6 py-2 text-[13px]">
        <div className="flex items-center gap-5">
          {site.phones.map((p) => (
            <a key={p} href={telHref(p)} className="inline-flex items-center gap-1.5 hover:underline">
              <Phone className="size-3.5" strokeWidth={1.75} /> {p}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:underline">
            <Mail className="size-3.5" strokeWidth={1.75} /> {site.email}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href={site.pronote} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:underline">
            Pronote <ExternalLink className="size-3.5" strokeWidth={1.75} />
          </a>
          <a href={site.massar} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:underline">
            Massar <ExternalLink className="size-3.5" strokeWidth={1.75} />
          </a>
          <Link to="/inscription" className="rounded-full bg-white/15 px-3 py-1 font-semibold hover:bg-white/25">
            Inscription
          </Link>
        </div>
      </div>
    </div>
  );
}

const featuredImages = {
  "vie-scolaire": { src: heroVieScolaire, alt: "Élèves réunis dans la cour de l'école" },
  activites: { src: heroActivites, alt: "Élèves en atelier cuisine avec un chef" },
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  return (
    <header className="sticky top-0 z-50 no-print">
      <TopBar />
      <div
        className={cn(
          "border-b border-line/70 bg-paper transition-shadow duration-300",
          scrolled && "shadow-[0_10px_30px_-18px_rgba(31,42,55,0.4)]",
        )}
      >
        <div className="container-site flex items-center justify-between gap-4 py-3">
          <LogoLink />

          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpen(null)}>
            {navigation.map((group) =>
              group.links.length === 0 ? (
                <Link
                  key={group.label}
                  to={group.to as never}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-ink-900 transition-colors hover:text-coral-700"
                  activeProps={{ className: "text-coral-700" }}
                >
                  {group.label}
                </Link>
              ) : (
                <div key={group.label} className="relative" onMouseEnter={() => setOpen(group.label)}>
                  <button
                    type="button"
                    aria-expanded={open === group.label}
                    onClick={() => setOpen(open === group.label ? null : group.label)}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink-900 transition-colors hover:text-coral-700"
                  >
                    {group.label}
                    <ChevronDown className="size-4" strokeWidth={1.75} />
                  </button>
                </div>
              ),
            )}
            <Link
              to="/inscription"
              className="ml-2 rounded-full bg-coral-600 px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-colors hover:bg-coral-700"
            >
              Inscrire mon enfant
            </Link>

            <AnimatePresence>
              {navigation
                .filter((g) => g.label === open && g.links.length > 0)
                .map((group) => (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 z-50 w-[min(900px,92vw)] -translate-x-1/2 pt-4"
                  >
                    <div className="grid gap-6 rounded-3xl border border-line bg-white p-6 shadow-lift md:grid-cols-[1fr_auto]">
                      <ul className="grid gap-1 md:grid-cols-2">
                        {group.links.map((l) =>
                          l.external ? (
                            <li key={l.label}>
                              <a
                                href={l.to}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="flex gap-3 rounded-2xl p-3 transition-colors hover:bg-sand"
                              >
                                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700">
                                  <ExternalLink className="size-4" strokeWidth={1.75} />
                                </span>
                                <span>
                                  <span className="block font-semibold text-ink-900">{l.label}</span>
                                  <span className="block text-sm text-ink-600">{l.desc}</span>
                                </span>
                              </a>
                            </li>
                          ) : (
                            <li key={l.label}>
                              <Link
                                to={l.to as never}
                                onClick={() => setOpen(null)}
                                className="flex gap-3 rounded-2xl p-3 transition-colors hover:bg-sand"
                              >
                                <span className="mt-0.5 size-9 shrink-0 rounded-full bg-coral-50" />
                                <span>
                                  <span className="block font-semibold text-ink-900">{l.label}</span>
                                  <span className="block text-sm text-ink-600">{l.desc}</span>
                                </span>
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                      {group.featured ? (
                        <img
                          src={featuredImages[group.featured].src}
                          alt={featuredImages[group.featured].alt}
                          loading="lazy"
                          className="tab-shape hidden h-56 w-64 object-cover md:block"
                        />
                      ) : null}
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </nav>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold lg:hidden"
            onClick={() => setMobile(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="size-5" strokeWidth={1.75} /> Menu
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-paper lg:hidden"
          >
            <div className="container-site flex items-center justify-between py-3">
              <LogoLink />
              <button
                type="button"
                onClick={() => setMobile(false)}
                aria-label="Fermer le menu"
                className="grid size-10 place-items-center rounded-full border border-line"
              >
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </div>
            <div className="container-site flex-1 overflow-y-auto pb-10">
              {navigation.map((group) =>
                group.links.length === 0 ? (
                  <Link
                    key={group.label}
                    to={group.to as never}
                    onClick={() => setMobile(false)}
                    className="block border-b border-line py-4 font-display text-xl"
                  >
                    {group.label}
                  </Link>
                ) : (
                  <div key={group.label} className="border-b border-line">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-4 font-display text-xl"
                      aria-expanded={mobileGroup === group.label}
                      onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                    >
                      {group.label}
                      <ChevronDown
                        className={cn("size-5 transition-transform", mobileGroup === group.label && "rotate-180")}
                        strokeWidth={1.75}
                      />
                    </button>
                    {mobileGroup === group.label ? (
                      <ul className="pb-4">
                        {group.links.map((l) => (
                          <li key={l.label}>
                            {l.external ? (
                              <a
                                href={l.to}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="block py-2 text-ink-600"
                              >
                                {l.label}
                              </a>
                            ) : (
                              <Link
                                to={l.to as never}
                                onClick={() => setMobile(false)}
                                className="block py-2 text-ink-600"
                              >
                                {l.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ),
              )}
              <Link
                to="/inscription"
                onClick={() => setMobile(false)}
                className="mt-6 block rounded-full bg-coral-600 px-6 py-3 text-center font-bold text-white"
              >
                Inscrire mon enfant
              </Link>
              <div className="mt-6 space-y-2 text-sm">
                {site.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="block text-teal-700">
                    {p}
                  </a>
                ))}
                <a href={`mailto:${site.email}`} className="block text-teal-700">
                  {site.email}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
