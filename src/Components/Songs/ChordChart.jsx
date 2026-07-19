import { useMemo, useState } from "react";
import { KEYS, isChordLine, transposeLine, semitoneShift } from "../../utils/chords";

const ChordChart = ({ chords, originalKey }) => {
  const [selectedKey, setSelectedKey] = useState(originalKey || "C");

  const shift = useMemo(
    () => semitoneShift(originalKey || "C", selectedKey),
    [originalKey, selectedKey]
  );

  const lines = useMemo(() => (chords || "").split("\n"), [chords]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40 mr-1">
          Key
        </span>
        {KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelectedKey(key)}
            className={`w-8 h-8 rounded-md text-xs font-mono font-semibold transition-colors ${
              key === selectedKey
                ? "bg-brass text-inkwell"
                : "bg-white border border-inkwell/15 text-inkwell/60 hover:border-brass"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap bg-white border border-inkwell/10 rounded-lg p-4 overflow-x-auto">
        {lines.map((line, i) => {
          const trimmed = line.trim();
          const isSection = /^\[.*\]$/.test(trimmed);

          if (isSection) {
            return (
              <div key={i} className="text-brass font-semibold mt-3 first:mt-0">
                {trimmed}
              </div>
            );
          }

          if (isChordLine(line)) {
            return (
              <div key={i} className="text-brass font-semibold">
                {transposeLine(line, shift)}
              </div>
            );
          }

          return (
            <div key={i} className="text-inkwell/80">
              {line || " "}
            </div>
          );
        })}
      </pre>
    </div>
  );
};

export default ChordChart;
