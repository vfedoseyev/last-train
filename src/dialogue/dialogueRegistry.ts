import type { Dialogue } from "./dialogueTypes";
import { mishaYardIntro } from "../data/dialogue/yard";
import { teacherTask, teacherFirstHint } from "../data/dialogue/classroom";
import { mishaAfterSchool } from "../data/dialogue/street";
import { shopkeeperIntro } from "../data/dialogue/shop";
import { fatherEvening } from "../data/dialogue/home";
import { mishaHomeStrange } from "../data/dialogue/misha_home";

// Главы 2-8 временно в last-train/archive/ (см. TODO.md) — решение сосредоточиться
// на Прологе/Главе 1. Возвращать импорты по мере восстановления следующих глав.
export const dialogues: Record<string, Dialogue> = {
  [mishaYardIntro.id]: mishaYardIntro,
  [teacherTask.id]: teacherTask,
  [teacherFirstHint.id]: teacherFirstHint,
  [mishaAfterSchool.id]: mishaAfterSchool,
  [shopkeeperIntro.id]: shopkeeperIntro,
  [fatherEvening.id]: fatherEvening,
  [mishaHomeStrange.id]: mishaHomeStrange,
};
