import { cva, type VariantProps } from "class-variance-authority";
import { Delete } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KeyDef } from "@/lib/calculator/keys";

const keyStyles = cva(
  [
    "relative flex min-h-11 items-center justify-center select-none",
    "rounded-key font-medium tracking-tight",
    "shadow-key",
    "transition-[transform,background-color,box-shadow] duration-150 ease-out",
    "touch-manipulation",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
    "active:scale-[0.96] disabled:opacity-40",
  ].join(" "),
  {
    variants: {
      variant: {
        num: "bg-key text-fg text-xl",
        fn: "bg-key-fn text-muted text-sm",
        op: "bg-key-op text-fg text-xl",
        eq: "bg-accent text-accent-fg text-xl shadow-key-eq",
        util: "bg-key-fn text-fg text-lg",
        danger: "bg-key-fn text-danger text-sm font-semibold tracking-wide",
      },
    },
    defaultVariants: { variant: "num" },
  },
);

type CalcKeyProps = {
  def: KeyDef;
  onPress: (def: KeyDef) => void;
} & VariantProps<typeof keyStyles>;

export function CalcKey({ def, onPress }: CalcKeyProps) {
  return (
    <button
      type="button"
      aria-label={def.aria}
      className={cn(keyStyles({ variant: def.variant }))}
      onClick={() => onPress(def)}
    >
      {def.id === "bksp" ? (
        <Delete className="size-5" strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <span className="leading-none">{def.label}</span>
      )}
    </button>
  );
}
