import { prettyPrint, tryEvaluate, formatNumber, type AngleMode } from "@/lib/calculator/engine";
import { cn } from "@/lib/utils";

type DisplayProps = {
  expr: string;
  angle: AngleMode;
  error: string | null;
  justEvaluated: boolean;
  memory: number;
};

export function Display({ expr, angle, error, justEvaluated, memory }: DisplayProps) {
  const pretty = prettyPrint(expr);
  const live = !justEvaluated && expr ? tryEvaluate(expr, angle) : null;
  const showLive = Boolean(live?.ok && pretty !== formatNumber(live.value) && !/^[0-9.]+$/.test(expr));

  const length = pretty.length;
  const sizeClass =
    length > 16 ? "text-2xl sm:text-3xl" : length > 10 ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl";

  return (
    <div className="rounded-panel bg-elevated px-5 py-4 shadow-key">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-faint">
          <span>{angle === "deg" ? "Deg" : "Rad"}</span>
          {memory !== 0 ? (
            <span className="rounded-pill bg-key px-2 py-0.5 text-muted">M</span>
          ) : null}
        </div>
        <p className="min-h-4 text-right font-mono text-xs text-danger" role="status">
          {error ?? ""}
        </p>
      </div>
      <p
        className={cn(
          "min-h-12 break-all text-right font-mono font-medium tabular-nums tracking-tight text-fg",
          sizeClass,
        )}
        aria-live="polite"
      >
        {pretty}
      </p>
      <p className="mt-2 min-h-6 text-right font-mono text-base tabular-nums text-muted">
        {error ? "" : showLive && live?.ok ? formatNumber(live.value) : "\u00a0"}
      </p>
    </div>
  );
}
