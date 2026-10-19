import type { Condition } from "../utils/conditions";
import type { HotspotDefinition } from "../interaction/interactionTypes";
import type { GameEffect } from "../game/gameEffects";

// Не полный список локаций из GDD §18 — только то, что нужно для Пролога и ближайших глав.
// wasteland и weather_station пока без контента, см. CLAUDE_CODE_PROMPT.md §13.
export type SceneId =
  | "home"
  | "hallway"
  | "bathroom"
  | "kitchen"
  | "yard"
  | "street"
  | "school"
  | "classroom"
  | "misha_home"
  | "garages"
  | "garage_entrance"
  | "garage_17"
  | "garage_inside"
  | "shop"
  | "shop_exterior"
  | "station"
  | "old_railway"
  | "weather_station"
  | "wasteland";

export interface CharacterPlacement {
  characterId: string;
  x: number;
  y: number;
  scale?: number;
  visibleWhen?: Condition[];
}

export interface SceneExit {
  id: string;
  targetSceneId: SceneId;
  label?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  conditions?: Condition[];
  lockedMessage?: string;
}

export interface SceneDefinition {
  id: SceneId;
  name: string;
  background: string;
  music?: string;
  ambience?: string;
  hotspots: HotspotDefinition[];
  characters?: CharacterPlacement[];
  exits?: SceneExit[];
  // Применяются при каждом входе на сцену (идемпотентные эффекты — setFlag/discoverClue
  // безопасно повторять). Используется, например, для garageUnlocked.
  onEnter?: GameEffect[];
}
