import { cn } from "@/lib/utils";

type Props = {
  /** couleur de la vague (le fond de la section qui suit) */
  fill?: "paper" | "sand" | "teal" | "coral" | "white";
  flip?: boolean;
  className?: string;
};

const fills: Record<NonNullable<Props["fill"]>, string> = {
  paper: "var(--paper)",
  sand: "var(--sand)",
  teal: "var(--teal-900)",
  coral: "var(--coral-600)",
  white: "#ffffff",
};

export function WaveDivider({ fill = "paper", flip = false, className }: Props) {
  return (
    <div className={cn("pointer-events-none -mb-px w-full leading-none", flip && "rotate-180", className)} aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-[52px] w-full md:h-[80px]">
        <path
          d="M0 44c180 40 330-24 520-24s330 58 520 40 260-52 400-40v70H0z"
          fill={fills[fill]}
        />
      </svg>
    </div>
  );
}
