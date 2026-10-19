import type { GameState } from "../game/GameState";

export const SAVE_KEY = "last-train-save";
export const SAVE_VERSION = 1;

export interface SaveData extends GameState {
  version: number;
}
