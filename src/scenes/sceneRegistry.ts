import type { SceneDefinition, SceneId } from "./sceneTypes";
import { homeScene } from "../data/scenes/home";
import { hallwayScene } from "../data/scenes/hallway";
import { bathroomScene } from "../data/scenes/bathroom";
import { kitchenScene } from "../data/scenes/kitchen";
import { yardScene } from "../data/scenes/yard";
import { streetScene } from "../data/scenes/street";
import { shopScene } from "../data/scenes/shop";
import { shopExteriorScene } from "../data/scenes/shop_exterior";
import { schoolScene } from "../data/scenes/school";
import { classroomScene } from "../data/scenes/classroom";
import { mishaHomeScene } from "../data/scenes/misha_home";

// Наполняется по мере реализации глав — см. TODO.md. Главы 2-8 временно в
// last-train/archive/ (вне src/, чтобы tsc их не подхватывал) — решение сосредоточиться
// на Прологе/Главе 1, вернуть при продолжении работы над следующими главами.
export const scenes: Partial<Record<SceneId, SceneDefinition>> = {
  home: homeScene,
  hallway: hallwayScene,
  bathroom: bathroomScene,
  kitchen: kitchenScene,
  yard: yardScene,
  street: streetScene,
  shop: shopScene,
  shop_exterior: shopExteriorScene,
  school: schoolScene,
  classroom: classroomScene,
  misha_home: mishaHomeScene,
};
