import type { GameState } from "../game/GameState";
import { SAVE_KEY, SAVE_VERSION } from "./saveTypes";
import type { SaveData } from "./saveTypes";

export function saveGame(state: GameState): void {
  const data: SaveData = { ...state, version: SAVE_VERSION };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}
