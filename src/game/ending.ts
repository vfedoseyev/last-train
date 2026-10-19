import type { GameState } from "./GameState";

// Дополнительные (не обязательные для прохождения) улики — GDD §39, "Концовка 3 — Искать"
// достижима только если собраны вообще все улики, включая необязательные side-находки,
// а не только те, что прямо требуются для перехода между главами (GDD §43 "Система улик").
const OPTIONAL_CLUE_IDS = [
  "father_reaction",
  "lena_wanted_to_leave",
  "shopkeeper_lena",
  "train_schedule",
  "lena_letter",
  "lena_ticket",
  "lena_photograph",
  "pendant",
];

export type Ending = "truth" | "letGo" | "search";

// Не хранить ending заранее — вычислять только в конце игры (TECHNICAL ARCHITECTURE.md §158-159).
export function getEnding(state: GameState): Ending {
  if (!state.flags.allCluesFound) return "letGo";

  const foundAllOptional = OPTIONAL_CLUE_IDS.every((id) => state.discoveredClues.includes(id));
  return foundAllOptional ? "search" : "truth";
}
