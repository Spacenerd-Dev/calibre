import type { CalcAction, CalcMode } from "./state";
import type { AngleMode } from "./engine";

export type KeyVariant = "num" | "fn" | "op" | "eq" | "util" | "danger";

export type KeyDef = {
  id: string;
  label: string;
  sub?: string;
  aria: string;
  variant: KeyVariant;
  action: CalcAction;
};

function fnKey(id: string, label: string, aria: string, name: string): KeyDef {
  return { id, label, aria, variant: "fn", action: { type: "fn", name } };
}

export function getKeypad(
  mode: CalcMode,
  second: boolean,
  angle: AngleMode,
): KeyDef[][] {
  const trig = second
    ? [
        fnKey("asin", "sin⁻¹", "Inverse sine", "asin"),
        fnKey("acos", "cos⁻¹", "Inverse cosine", "acos"),
        fnKey("atan", "tan⁻¹", "Inverse tangent", "atan"),
      ]
    : [
        fnKey("sin", "sin", "Sine", "sin"),
        fnKey("cos", "cos", "Cosine", "cos"),
        fnKey("tan", "tan", "Tangent", "tan"),
      ];

  const logs = second
    ? [
        fnKey("exp", "eˣ", "e to the x", "exp"),
        fnKey("exp10", "10ˣ", "Ten to the x", "exp10"),
        fnKey("cbrt", "³√", "Cube root", "cbrt"),
      ]
    : [
        fnKey("ln", "ln", "Natural log", "ln"),
        fnKey("log", "log", "Log base 10", "log"),
        fnKey("sqrt", "√", "Square root", "sqrt"),
      ];

  const standard: KeyDef[][] = [
    [
      { id: "ac", label: "AC", aria: "All clear", variant: "danger", action: { type: "ac" } },
      { id: "neg", label: "±", aria: "Toggle sign", variant: "util", action: { type: "neg" } },
      { id: "pct", label: "%", aria: "Percent", variant: "util", action: { type: "pct" } },
      { id: "div", label: "÷", aria: "Divide", variant: "op", action: { type: "op", value: "/" } },
    ],
    [
      { id: "7", label: "7", aria: "7", variant: "num", action: { type: "digit", value: "7" } },
      { id: "8", label: "8", aria: "8", variant: "num", action: { type: "digit", value: "8" } },
      { id: "9", label: "9", aria: "9", variant: "num", action: { type: "digit", value: "9" } },
      { id: "mul", label: "×", aria: "Multiply", variant: "op", action: { type: "op", value: "*" } },
    ],
    [
      { id: "4", label: "4", aria: "4", variant: "num", action: { type: "digit", value: "4" } },
      { id: "5", label: "5", aria: "5", variant: "num", action: { type: "digit", value: "5" } },
      { id: "6", label: "6", aria: "6", variant: "num", action: { type: "digit", value: "6" } },
      { id: "sub", label: "−", aria: "Subtract", variant: "op", action: { type: "op", value: "-" } },
    ],
    [
      { id: "1", label: "1", aria: "1", variant: "num", action: { type: "digit", value: "1" } },
      { id: "2", label: "2", aria: "2", variant: "num", action: { type: "digit", value: "2" } },
      { id: "3", label: "3", aria: "3", variant: "num", action: { type: "digit", value: "3" } },
      { id: "add", label: "+", aria: "Add", variant: "op", action: { type: "op", value: "+" } },
    ],
    [
      { id: "0", label: "0", aria: "0", variant: "num", action: { type: "digit", value: "0" } },
      { id: "dot", label: ".", aria: "Decimal", variant: "num", action: { type: "dot" } },
      { id: "bksp", label: "⌫", aria: "Backspace", variant: "util", action: { type: "bksp" } },
      { id: "eq", label: "=", aria: "Equals", variant: "eq", action: { type: "eq" } },
    ],
  ];

  if (mode === "standard") return standard;

  const sciTop: KeyDef[][] = [
    [
      trig[0]!,
      logs[0]!,
      { id: "second", label: "2nd", aria: "Toggle second functions", variant: second ? "op" : "fn", action: { type: "toggle-second" } },
      { id: "angle", label: angle === "deg" ? "DEG" : "RAD", aria: "Toggle degrees and radians", variant: "fn", action: { type: "toggle-angle" } },
    ],
    [
      trig[1]!,
      logs[1]!,
      { id: "open", label: "(", aria: "Open parenthesis", variant: "fn", action: { type: "paren", which: "(" } },
      { id: "close", label: ")", aria: "Close parenthesis", variant: "fn", action: { type: "paren", which: ")" } },
    ],
    [
      trig[2]!,
      logs[2]!,
      { id: "pi", label: "π", aria: "Pi", variant: "fn", action: { type: "const", name: "pi" } },
      { id: "e", label: "e", aria: "Euler's number", variant: "fn", action: { type: "const", name: "e" } },
    ],
    [
      { id: "pow", label: "xʸ", aria: "Power", variant: "fn", action: { type: "op", value: "^" } },
      { id: "sq", label: "x²", aria: "Square", variant: "fn", action: { type: "square" } },
      { id: "inv", label: "1/x", aria: "Reciprocal", variant: "fn", action: { type: "inv" } },
      { id: "fact", label: "n!", aria: "Factorial", variant: "fn", action: { type: "fact" } },
    ],
  ];

  return [...sciTop, ...standard];
}
