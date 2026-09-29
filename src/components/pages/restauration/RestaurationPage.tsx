import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  HandHeart,
  Info,
  MessageCircleQuestion,
  Soup,
  Sun,
  Users,
  UtensilsCrossed,
  Volume1,
} from "lucide-react";
import { HeroFull } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { SplitFeature } from "@/components/site/blocks/SplitFeature";
import { IconCardGrid } from "@/components/site/blocks/IconCardGrid";
import { AccordionList } from "@/components/site/blocks/AccordionList";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { ContactAction } from "@/components/site/blocks/ContactAction";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { media } from "@/data/media";

/* ---------- Carrousel d'images (élément interactif) ---------- */

function Carousel() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={track}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {media.restauration.gallery.map((img, i) => (
          <figure
            key={img.src + i}
            className="relative w-[82%] shrink-0 snap-start overflow-hidden rounded-[2rem] border-4 border-white shadow-soft sm:w-[60%] lg:w-[42%]"
          >
            <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-paper/90 px-4 py-2 text-sm font-bold text-teal-900 backdrop-blur">
              {img.alt}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <NoteMargin>faites défiler →</NoteMargin>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Image précédente"
            className="grid size-12 place-items-center rounded-full border-2 border-teal-700 text-teal-700 transition-colors hover:bg-teal-50"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Image suivante"
            className="grid size-12 place-items-center rounded-full bg-coral-600 text-white shadow-soft transition-colors hover:bg-coral-700"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Règles de vie à table ---------- */

const tableRules = [
  { icon: HandHeart, title: "Respect", text: "Des camarades, du personnel et de la nourriture." },
  { icon: Volume1, title: "Calme", text: "Un repas partagé dans une ambiance détendue et apaisée." },
  { icon: Users, title: "Entraide", text: "Les grands montrent l'exemple, chacun trouve sa place." },
  { icon: UtensilsCrossed, title: "Zéro violence", text: "Comme partout à l'école, toute violence est proscrite." },
];

/* ---------- Page ---------- */

export function RestaurationPage() {
  return (
    <>
      <HeroFull
        chapter="01"
        eyebrow="Services"
        title="La restauration scolaire"
        lead="Le temps du repas fait partie de la journée d'école : un moment pour reprendre des forces, partager et apprendre à vivre ensemble."
        crumbs={[{ label: "Services" }, { label: "Restauration" }]}
        image={media.restauration.hero.src}
        imageAlt={media.restauration.hero.alt}
        stamp={["Bon", "appétit !"]}
        actions={
          <>
            <ContactAction objet="Restauration" variant="light">
              Demander des informations
            </ContactAction>
            <Action to="/horaires" variant="secondary" className="border-white text-white hover:bg-white/10">
              Voir les horaires
            </Action>
          </>
        }
      />

      <Section tone="paper" chapter="02" eyebrow="Le service">
        <SplitFeature
          eyebrow="Un moment de vie"
          title="Bien manger pour bien apprendre"
          text={
            <p>
              Madariss Tingis propose un service de restauration aux familles qui le souhaitent. La pause du midi est
              encadrée par les mêmes valeurs que la classe : écoute, bienveillance et respect.
            </p>
          }
          points={[
            "Inscription au service auprès de l'administration",
            "Informations pratiques communiquées sur demande",
            "Un moment encadré par les règles de vie de l'école",
          ]}
          image={media.restauration.intro.src}
          imageAlt={media.restauration.intro.alt}
          note="on partage, on discute"
        />
      </Section>

      <Section
        tone="sand"
        chapter="03"
        eyebrow="En images"
        title="À table, ensemble"
        lead="Un aperçu de l'ambiance conviviale que nous voulons pour chaque repas."
      >
        <Carousel />
      </Section>

      <Section
        tone="paper"
        pattern="grid"
        chapter="04"
        eyebrow="Repères"
        title="Ce qu'il faut savoir"
        lead="Trois repères pour organiser la restauration de votre enfant."
      >
        <IconCardGrid
          cards={[
            {
              icon: ClipboardList,
              title: "S'inscrire au service",
              text: "L'inscription à la restauration se fait auprès de l'administration de l'école.",
              note: "une simple demande",
            },
            {
              icon: Info,
              title: "Les informations pratiques",
              text: "Organisation, modalités et conditions : l'administration vous les communique sur demande.",
            },
            {
              icon: Soup,
              title: "Les règles à la cantine",
              text: "Le règlement intérieur s'applique aussi pendant le repas : respect, calme et bienveillance.",
            },
          ]}
        />
      </Section>

      <Section tone="teal" pattern="zellige" chapter="05" eyebrow="Savoir-vivre" title="Les règles de vie à table">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tableRules.map((rule, i) => {
            const Icon = rule.icon;
            return (
              <Reveal key={rule.title} delay={i * 0.06}>
                <article className="relative h-full overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                  <span className="grid size-12 place-items-center rounded-2xl bg-coral-600 text-white">
                    <Icon className="size-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-white">{rule.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{rule.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="paper" chapter="06" eyebrow="Bon à savoir" title="Le vendredi et vos questions">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-coral-600 p-8 text-white shadow-lift md:p-10">
              <div className="zellige absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <Sun className="size-10" strokeWidth={1.4} />
                <p className="mt-6 text-xs font-bold tracking-[0.18em] text-white/80 uppercase">Vendredi</p>
                <p className="mt-2 font-display text-5xl text-white">13h30</p>
                <p className="mt-4 text-white/90">
                  Le vendredi, tous les niveaux terminent à 13h30. Pensez à adapter l'organisation du repas de votre
                  enfant ce jour-là.
                </p>
                <div className="mt-8">
                  <Action to="/horaires" variant="light">
                    Tous les horaires
                  </Action>
                </div>
              </div>
            </div>
          </Reveal>

          <AccordionList
            defaultOpen="r-1"
            entries={[
              {
                id: "r-1",
                title: "Comment inscrire mon enfant à la restauration ?",
                content: <p>Adressez votre demande à l'administration, par téléphone, par email ou via le formulaire de contact.</p>,
              },
              {
                id: "r-2",
                title: "Où trouver les menus et l'organisation ?",
                content: <p>Les informations pratiques sont communiquées aux familles par l'administration, sur demande.</p>,
              },
              {
                id: "r-3",
                title: "Mon enfant suit un régime particulier",
                content: (
                  <p>
                    Signalez-le à l'administration au moment de l'inscription : elle vous indiquera les possibilités et les
                    démarches.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Inscrire votre enfant à la restauration"
        text="L'administration vous transmet toutes les informations pratiques."
        tone="gradient"
      >
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ContactAction objet="Restauration" variant="light">
            Demander des informations
          </ContactAction>
        </div>
        <p className="mt-6 inline-flex items-center gap-2 text-white/80">
          <MessageCircleQuestion className="size-5" strokeWidth={1.7} /> Réponse par téléphone ou par email
        </p>
      </CtaBand>

      <RelatedPages
        links={[
          { to: "/transport-scolaire", label: "Transport scolaire", desc: "Se rendre à l'école et en revenir." },
          { to: "/assistance-medicale", label: "Assistance médicale", desc: "Santé et bien-être des élèves." },
          { to: "/horaires", label: "Horaires", desc: "La journée et la semaine par niveau." },
        ]}
      />
    </>
  );
}
