import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, ExternalLink, FileSignature, Mail, Menu, Phone, X } from "lucide-react";
import logo from "@/assets/tingis-logo.png";
import { navigation, type NavGroup } from "@/data/navigation";
import { site, telHref } from "@/data/site";
import { cn } from "@/lib/utils";
import { groupFeatures, iconFor } from "./nav-meta";

const isActive = (pathname: string, to: string) => (to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`));
const groupActive = (pathname: string, group: NavGroup) =>
  group.to ? isActive(pathname, group.to) : group.links.some((l) => !l.external && isActive(pathname, l.to));

function LogoLink({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label={`${site.name} — accueil`}>
      <img
        src={logo}
        alt={`Logo ${site.name}`}
        className={cn("logo-blend w-auto transition-all duration-300", compact ? "h-9 md:h-10" : "h-[38px] md:h-12")}
        width={340}
        height={112}
      />
    </Link>
  );
}

/* ---------------- Barre supérieure ---------------- */

function TopBar({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={cn(
        "hidden overflow-hidden bg-coral-600 text-white transition-all duration-300 md:block",
        hidden ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
      )}
    >
      <div className="container-site flex items-center justify-between gap-6 py-2 text-[13px]">
        <div className="flex items-center gap-5">
          {site.phones.map((p) => (
            <a key={p} href={telHref(p)} className="inline-flex items-center gap-1.5 hover:underline">
              <Phone className="size-3.5" strokeWidth={1.75} /> {p}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 hover:underline lg:inline-flex">
            <Mail className="size-3.5" strokeWidth={1.75} /> {site.email}
          </a>
        </div>
        <div className="flex items-center gap-1">
          <span className="mr-2 text-white/75">Espace parents</span>
          {[
            { href: site.pronote, label: "Pronote" },
            { href: site.massar, label: "Massar" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold hover:bg-white/15"
            >
              {l.label} <ExternalLink className="size-3" strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Méga-menu ---------------- */

function MegaPanel({ group, pathname, onNavigate }: { group: NavGroup; pathname: string; onNavigate: () => void }) {
  const feature = groupFeatures[group.label];
  return (
    <div className="container-site">
      <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift lg:grid-cols-[1fr_20rem]">
        <div className="p-6 xl:p-8">
          <p className="text-sm font-bold text-coral-700">{group.label}</p>
          {feature ? <p className="mt-1 max-w-xl text-ink-600">{feature.intro}</p> : null}
          <ul className={cn("mt-6 grid gap-1.5", group.links.length > 4 ? "md:grid-cols-2" : "md:grid-cols-1")}>
            {group.links.map((l) => {
              const Icon = iconFor(l.to, l.external);
              const active = !l.external && isActive(pathname, l.to);
              const inner = (
                <>
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-200",
                      active ? "bg-coral-600 text-white" : "bg-teal-50 text-teal-700 group-hover:bg-coral-600 group-hover:text-white",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0">
                    <span className={cn("flex items-center gap-1.5 font-semibold", active ? "text-coral-700" : "text-ink-900")}>
                      {l.label}
                      {l.external ? <ExternalLink className="size-3 text-ink-600" /> : null}
                    </span>
                    {l.desc ? <span className="block text-sm text-ink-600">{l.desc}</span> : null}
                  </span>
                </>
              );
              const cls = cn("group flex items-center gap-3 rounded-2xl p-2.5 transition-colors", active ? "bg-coral-50" : "hover:bg-sand");
              return (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.to} target="_blank" rel="noreferrer noopener" className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <Link to={l.to as never} onClick={onNavigate} className={cls}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {feature ? (
          <Link
            to={feature.cta.to as never}
            onClick={onNavigate}
            className="group relative hidden min-h-[16rem] overflow-hidden lg:block"
          >
            <img
              src={feature.image}
              alt={feature.alt}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/30 to-transparent" />
            <span className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 text-white">
              <span className="font-display text-xl leading-tight">{feature.cta.label}</span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-teal-900 transition-transform group-hover:translate-x-1">
                <ArrowRight className="size-4" />
              </span>
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------- Header ---------------- */

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ferme tout à chaque changement de page
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  // le groupe de la page courante est déplié par défaut dans le menu mobile
  useEffect(() => {
    if (mobile) setMobileGroup(navigation.find((g) => g.links.length > 0 && groupActive(pathname, g))?.label ?? null);
  }, [mobile, pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    if (!open && !mobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mobile]);

  const openGroup = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const openPanel = navigation.find((g) => g.label === open && g.links.length > 0);

  return (
    <header className="no-print sticky top-0 z-50">
      <TopBar hidden={scrolled} />

      <div
        className={cn(
          "relative border-b transition-all duration-300",
          scrolled ? "border-line bg-paper/95 shadow-[0_10px_30px_-18px_rgba(31,42,55,0.45)] backdrop-blur" : "border-line/60 bg-paper",
        )}
        onMouseLeave={scheduleClose}
      >
        <div className={cn("container-site flex items-center justify-between gap-4 transition-all duration-300", scrolled ? "py-2" : "py-3")}>
          <LogoLink compact={scrolled} />

          <nav aria-label="Navigation principale" className="hidden items-center gap-0.5 lg:flex">
            {navigation.map((group) => {
              const active = groupActive(pathname, group);
              if (group.links.length === 0) {
                return (
                  <Link
                    key={group.label}
                    to={group.to as never}
                    onMouseEnter={scheduleClose}
                    className={cn(
                      "relative rounded-full px-2.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:text-coral-700",
                      active ? "text-coral-700" : "text-ink-900",
                    )}
                  >
                    {group.label}
                    {active ? <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-coral-500" /> : null}
                  </Link>
                );
              }
              const isOpen = open === group.label;
              return (
                <button
                  key={group.label}
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onMouseEnter={() => openGroup(group.label)}
                  onFocus={() => openGroup(group.label)}
                  onClick={() => (isOpen ? setOpen(null) : openGroup(group.label))}
                  className={cn(
                    "relative inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:text-coral-700",
                    active || isOpen ? "text-coral-700" : "text-ink-900",
                    isOpen && "bg-coral-50",
                  )}
                >
                  {group.label}
                  <ChevronDown className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")} strokeWidth={1.75} />
                  {active && !isOpen ? <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-coral-500" /> : null}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/inscription"
              className="hidden items-center gap-2 rounded-full bg-coral-600 px-4 py-2.5 text-sm font-bold whitespace-nowrap text-white shadow-soft transition-colors hover:bg-coral-700 sm:inline-flex"
            >
              <FileSignature className="size-4" strokeWidth={1.8} /> Inscrire mon enfant
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold lg:hidden"
              onClick={() => setMobile(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={mobile}
            >
              <Menu className="size-5" strokeWidth={1.75} /> Menu
            </button>
          </div>
        </div>

        <AnimatePresence>
          {openPanel ? (
            <motion.div
              key={openPanel.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={() => openGroup(openPanel.label)}
              className="absolute inset-x-0 top-full z-50 hidden pt-3 lg:block"
            >
              <MegaPanel group={openPanel} pathname={pathname} onNavigate={() => setOpen(null)} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* ---------------- Menu mobile ---------------- */}
      <AnimatePresence>
        {mobile ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-paper lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-site flex items-center justify-between border-b border-line py-3">
              <LogoLink />
              <button
                type="button"
                onClick={() => setMobile(false)}
                aria-label="Fermer le menu"
                className="grid size-11 place-items-center rounded-full border border-line bg-white"
              >
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </div>

            <div className="container-site flex-1 overflow-y-auto pb-8">
              <div className="mt-5 grid grid-cols-2 gap-3">
                <a href={telHref(site.phones[0] ?? "")} className="flex items-center gap-3 rounded-2xl bg-coral-600 p-4 font-bold text-white">
                  <Phone className="size-5" strokeWidth={1.7} /> Appeler
                </a>
                <a href={site.pronote} target="_blank" rel="noreferrer noopener" className="flex items-center gap-3 rounded-2xl bg-teal-900 p-4 font-bold text-white">
                  <ExternalLink className="size-5" strokeWidth={1.7} /> Pronote
                </a>
              </div>

              <nav aria-label="Navigation mobile" className="mt-4">
                {navigation.map((group) => {
                  const active = groupActive(pathname, group);
                  if (group.links.length === 0) {
                    return (
                      <Link
                        key={group.label}
                        to={group.to as never}
                        className={cn("block border-b border-line py-4 font-display text-xl", active && "text-coral-700")}
                      >
                        {group.label}
                      </Link>
                    );
                  }
                  const expanded = mobileGroup === group.label;
                  return (
                    <div key={group.label} className="border-b border-line">
                      <button
                        type="button"
                        className={cn("flex w-full items-center justify-between py-4 font-display text-xl", active && "text-coral-700")}
                        aria-expanded={expanded}
                        onClick={() => setMobileGroup(expanded ? null : group.label)}
                      >
                        {group.label}
                        <ChevronDown className={cn("size-5 transition-transform", expanded && "rotate-180")} strokeWidth={1.75} />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <ul className="grid gap-1 pb-4 sm:grid-cols-2">
                              {group.links.map((l) => {
                                const Icon = iconFor(l.to, l.external);
                                const on = !l.external && isActive(pathname, l.to);
                                const cls = cn("flex items-center gap-3 rounded-2xl p-2.5", on ? "bg-coral-50 text-coral-700" : "text-ink-900");
                                const inner = (
                                  <>
                                    <span className={cn("grid size-9 place-items-center rounded-xl", on ? "bg-coral-600 text-white" : "bg-teal-50 text-teal-700")}>
                                      <Icon className="size-4" strokeWidth={1.8} />
                                    </span>
                                    <span className="font-semibold">{l.label}</span>
                                  </>
                                );
                                return (
                                  <li key={l.label}>
                                    {l.external ? (
                                      <a href={l.to} target="_blank" rel="noreferrer noopener" className={cls}>
                                        {inner}
                                      </a>
                                    ) : (
                                      <Link to={l.to as never} className={cls}>
                                        {inner}
                                      </Link>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <Link to="/inscription" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-coral-600 px-6 py-3.5 font-bold text-white shadow-soft">
                <FileSignature className="size-5" strokeWidth={1.8} /> Inscrire mon enfant
              </Link>
              <div className="mt-6 space-y-2 text-sm">
                {site.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="flex items-center gap-2 text-teal-700">
                    <Phone className="size-4" /> {p}
                  </a>
                ))}
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 break-all text-teal-700">
                  <Mail className="size-4 shrink-0" /> {site.email}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
