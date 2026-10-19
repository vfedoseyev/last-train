import type { Condition } from "../utils/conditions";
import type { GameEffect } from "../game/gameEffects";
import type { ItemId } from "../inventory/inventoryTypes";

export type InteractionType = "inspect" | "talk" | "take" | "use" | "combine" | "puzzle";

export interface InteractionVariant {
  conditions?: Condition[];
  text?: string;
  dialogueId?: string;
  effects?: GameEffect[];
}

export interface InteractionDefinition {
  type: InteractionType;
  text?: string;
  itemId?: ItemId;
  dialogueId?: string;
  effects?: GameEffect[];
  variants?: InteractionVariant[];
  // Для type: "use" — какой выбранный в инвентаре предмет нужен, чтобы сработал text/effects.
  requiredItem?: ItemId;
}

export interface HotspotDefinition {
  id: string;
  // Короткая надпись для плейсхолдер-режима (пока нет реального фона, см. Scene.tsx
  // isPlaceholder) — не показывается, когда у сцены появится настоящее изображение.
  label?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  // Отдельная картинка предмета поверх фона сцены (object-fit: contain внутри
  // рамки хотспота) — нужна, когда предмет не нарисован на самом фоне (фон и
  // мелкие объекты генерируются отдельно, см. CLAUDE_CODE_PROMPT.md §35.1).
  image?: string;
  interaction: InteractionDefinition;
  visibleWhen?: Condition[];
  enabledWhen?: Condition[];
}
