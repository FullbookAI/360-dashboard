// Shared "paper" theme for the Lead Intelligence and Job Attribution views.
// Lifted out of App.jsx so both can use it without a circular import.
export const LI = {
  paper:"#F7F6F2", ink:"#1E2A26", soft:"#5B6A63", ever:"#16352B",
  signal:"#3FB984", signalD:"#2A8C63", amber:"#E0A458", amberD:"#C0883C",
  clay:"#B5654B", na:"#9AA59E", line:"#E3E0D7", line2:"#D5D2C7", card:"#FFFFFF",
};
export const SERIF = "'Fraunces', serif";
export const MONO  = "'IBM Plex Mono', monospace";

// Categorical series colours for charts on the paper surface (#F7F6F2).
// Validated with the dataviz palette validator in light mode — all six checks
// pass (worst adjacent pair ΔE 16.0 normal / 14.4 deutan, all ≥ 3:1 contrast).
// The theme's own amber/clay pair was rejected: ΔE 9.9 in normal vision, i.e.
// hard to tell apart even with full colour vision. Do not swap them back in
// without re-running the validator.
export const SERIES = ["#2A8C63", "#3B6FA8", "#BE6B1E", "#A04E7C"];
