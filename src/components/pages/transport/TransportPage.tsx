import { Bus, CalendarCheck, DoorClosed, DoorOpen, HandHeart, MessageSquareText, ShieldCheck, Sun, UserCheck } from "lucide-react";
import { HeroSplit } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { StepsRoad } from "@/components/site/blocks/StepsRoad";
import { SplitFeature } from "@/components/site/blocks/SplitFeature";
import { ChecklistInteractive } from "@/components/site/blocks/ChecklistInteractive";
import { MasonryGallery } from "@/components/site/blocks/MasonryGallery";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { ContactAction } from "@/components/site/blocks/ContactAction";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { media } from "@/data/media";
import { doors } from "@/data/site";

const keyTimes = [
  { icon: DoorOpen, time: doors.open, label: "Ouverture des portes", tone: "bg-teal-50 text-teal-700" },
  { icon: DoorClosed, time: doors.close, label: "Fermeture des portes", tone: "bg-coral-50 text-coral-600" },
  { icon: Sun, time: "13h30", label: "Sortie du vendredi", tone: "bg-sand text-teal-900" },
];

export function TransportPage() {
  return (
    <>
      <HeroSplit
        chapter="01"
        eyebrow="Services"
        title={
          <>
            Le transport <span className="hand-underline-teal">scolaire</span>
          </>
        }
        lead="Pour les familles qui le souhaitent, l'école organise le trajet entre la maison et Madariss Tingis. Voici comment en faire la demande."
        crumbs={[{ label: "Services" }, { label: "Transport scolaire" }]}
        image={media.transport.hero.src}
        imageAlt={media.transport.hero.alt}
        badge="Demande auprès de l'administration"
        actions={
          <>
            <ContactAction objet="Transport scolaire">Faire une demande</ContactAction>
            <Action to="/horaires" variant="secondary">
              Voir les horaires
            </Action>
          </>
        }
      />

      <Section
        tone="paper"
        pattern="lines"
        chapter="02"
        eyebrow="La démarche"
        title="Comment utiliser le transport"
        lead="Trois étapes, de la demande au trajet quotidien."
      >
        <StepsRoad
          steps={[
            {
              icon: MessageSquareText,
              title: "La demande",
              text: "Contactez l'administration en précisant l'adresse de la famille et le niveau de votre enfant.",
            },
            {
              icon: CalendarCheck,
              title: "La confirmation",
              text: "L'administration vous confirme les modalités du service et les informations pratiques.",
            },
            {
              icon: Bus,
              title: "Le suivi",
              text: "Au quotidien, les changements ponctuels sont communiqués aux familles, notamment via Pronote.",
            },
          ]}
        />
      </Section>

      <Section tone="sand" chapter="03" eyebrow="Préparer sa demande" title="Tout est prêt ?">
        <ChecklistInteractive
          title="Ma demande de transport"
          doneLabel="Parfait, vous pouvez contacter l'administration !"
          items={[
            { id: "adresse", label: "L'adresse exacte du domicile", help: "Avec un repère connu si possible." },
            { id: "niveau", label: "Le niveau de votre enfant", help: "Les horaires varient selon le niveau." },
            { id: "trajets", label: "Les trajets souhaités", help: "Aller, retour ou les deux, et le cas du vendredi." },
            { id: "contact", label: "Un numéro de parent joignable", help: "Pour être prévenu en cas d'imprévu." },
            { id: "autorises", label: "Les personnes autorisées", help: "Qui peut récupérer l'enfant à l'arrêt." },
          ]}
        />
      </Section>

      <Section tone="paper" chapter="04" eyebrow="Sécurité">
        <SplitFeature
          reverse
          eyebrow="À bord"
          title="Les règles de l'école s'appliquent aussi dans le bus"
          text={
            <p>
              Le règlement intérieur est clair : toute forme de violence est proscrite au sein de l'école, dans les bus
              scolaires et lors des sorties. Le trajet est un moment de vie scolaire à part entière.
            </p>
          }
          points={[
            "Respect des camarades et des adultes présents",
            "Calme pendant le trajet et à la montée",
            "Toute violence est sanctionnée de manière proportionnée",
          ]}
          image={media.transport.safety.src}
          imageAlt={media.transport.safety.alt}
          note="un trajet serein pour tous"
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
              <ShieldCheck className="size-4" strokeWidth={1.8} /> Règlement, Titre III, art. 4
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-coral-50 px-4 py-2 text-sm font-bold text-coral-700">
              <HandHeart className="size-4" strokeWidth={1.8} /> Dialogue et respect
            </span>
          </div>
        </SplitFeature>
      </Section>

      <Section
        tone="white"
        pattern="grid"
        chapter="05"
        eyebrow="Les heures clés"
        title="Les horaires à connaître"
        lead="Trois repères pour organiser les trajets de la semaine."
        align="center"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {keyTimes.map((k, i) => {
            const Icon = k.icon;
            return (
              <Reveal key={k.label} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center rounded-[2rem] border border-line bg-white p-8 text-center shadow-soft">
                  <span className={`grid size-16 place-items-center rounded-3xl ${k.tone}`}>
                    <Icon className="size-8" strokeWidth={1.5} />
                  </span>
                  <p className="mt-5 font-display text-5xl text-teal-900 tabular-nums">{k.time}</p>
                  <p className="mt-2 font-bold text-ink-600">{k.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <NoteMargin>en retard ? l'élève est accompagné au secrétariat (sauf maternelle)</NoteMargin>
        </div>
      </Section>

      <Section tone="sand" chapter="06" eyebrow="En images" title="Le chemin de l'école">
        <MasonryGallery images={media.transport.gallery} />
      </Section>

      <CtaBand
        title="Besoin du transport scolaire ?"
        text="Faites votre demande : l'administration vous confirme les modalités."
        tone="teal"
      >
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ContactAction objet="Transport scolaire" variant="light">
            Faire une demande
          </ContactAction>
        </div>
        <p className="mt-6 inline-flex items-center gap-2 text-white/80">
          <UserCheck className="size-5" strokeWidth={1.7} /> Réponse par téléphone ou par email
        </p>
      </CtaBand>

      <RelatedPages
        links={[
          { to: "/horaires", label: "Horaires", desc: "Portes, journée et vendredi." },
          { to: "/restauration", label: "Restauration", desc: "Le service de cantine de l'école." },
          { to: "/reglement-interieur", label: "Règlement intérieur", desc: "Les règles de vie, bus compris." },
        ]}
      />
    </>
  );
}
