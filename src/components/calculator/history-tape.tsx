import { ScrollText, Trash2 } from "lucide-react";
import type { HistoryEntry } from "@/lib/calculator/state";
import { cn } from "@/lib/utils";

type HistoryTapeProps = {
  id?: string;
  entries: HistoryEntry[];
  onLoad: (value: string) => void;
  onClear: () => void;
  className?: string;
};

export function HistoryTape({ id, entries, onLoad, onClear, className }: HistoryTapeProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex min-h-0 flex-col rounded-card bg-surface p-3 shadow-card",
        className,
      )}
      aria-label="Calculation history"
    >
      <header className="mb-3 flex items-center justify-between gap-2 px-2 pt-1">
        <div className="flex items-center gap-2 text-muted">
          <ScrollText className="size-4" strokeWidth={1.75} aria-hidden="true" />
          <h2 className="text-sm font-medium tracking-wide text-fg">Tape</h2>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-key px-3 text-sm text-muted transition-colors duration-150 ease-out hover:text-fg disabled:opacity-30"
          onClick={onClear}
          disabled={entries.length === 0}
          aria-label="Clear history"
        >
          <Trash2 className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
          Clear
        </button>
      </header>
      {entries.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <p className="text-sm font-medium text-fg">No calculations yet</p>
          <p className="mt-1 max-w-xs text-sm text-pretty text-muted">
            Results collect here like a paper tape. Tap one to reuse it.
          </p>
        </div>
      ) : (
        <ol className="tape-edge min-h-0 flex-1 space-y-1 overflow-y-auto px-1 pb-2">
          {entries.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => onLoad(entry.result)}
                className="flex w-full min-h-11 flex-col items-end rounded-panel px-3 py-2 text-right transition-colors duration-150 ease-out hover:bg-elevated"
              >
                <span className="w-full truncate font-mono text-xs text-muted">{entry.expression}</span>
                <span className="font-mono text-base tabular-nums text-fg">{entry.result}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
