import type { SceneDefinition } from "../../scenes/sceneTypes";
import { asset } from "../../utils/asset";

// Ванная — необязательная для сюжета комната, чисто атмосферная (2007 год,
// обычная северная квартира).
export const bathroomScene: SceneDefinition = {
  id: "bathroom",
  name: "Ванная",
  background: asset("images/scenes/bathroom.webp"),

  hotspots: [
    {
      id: "mirror",
      label: "Зеркало",
      x: 18,
      y: 2,
      width: 37,
      height: 40,
      interaction: {
        type: "inspect",
        text: "Зеркало над раковиной, треснувшее в углу — трещина там уже год.",
      },
    },
    {
      id: "sink",
      label: "Раковина",
      x: 20,
      y: 68,
      width: 48,
      height: 30,
      interaction: {
        type: "inspect",
        text: "Раковина с капающим краном. Никто так и не собрался починить.",
      },
    },
  ],

  exits: [
    { id: "to_hallway", targetSceneId: "hallway", label: "Выйти", x: 2, y: 30, width: 8, height: 40 },
  ],
};
