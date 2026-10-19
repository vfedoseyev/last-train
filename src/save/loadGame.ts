import type { GameState } from "../game/GameState";
import { SAVE_KEY, SAVE_VERSION } from "./saveTypes";
import type { SaveData } from "./saveTypes";

export function loadGame(): GameState | null {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;

  try {
    const data = JSON.parse(raw) as SaveData;
    if (data.version !== SAVE_VERSION) return null;
    return data;
  } catch {
    return null;
  }
}

export function resetGame(): void {
  localStorage.removeItem(SAVE_KEY);
}

export function hasSaveGame(): boolean {
  return localStorage.getItem(SAVE_KEY) !== null;
}
