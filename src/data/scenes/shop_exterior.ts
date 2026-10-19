import type { SceneDefinition } from "../../scenes/sceneTypes";
import { asset } from "../../utils/asset";

// Магазин снаружи — промежуточная сцена между улицей и интерьером магазина,
// по образцу референса игрока (магазин: снаружи/внутри, как двор/дом).
export const shopExteriorScene: SceneDefinition = {
  id: "shop_exterior",
  name: "Магазин (снаружи)",
  background: asset("images/scenes/shop_exterior.webp"),

  hotspots: [
    {
      id: "sign",
      label: "Вывеска",
      x: 23,
      y: 1,
      width: 36,
      height: 22,
      interaction: { type: "inspect", text: "Вывеска «Магазин» — буквы давно выцвели." },
    },
  ],

  exits: [
    { id: "to_street", targetSceneId: "street", label: "На улицу", x: 2, y: 30, width: 8, height: 40 },
    { id: "to_shop", targetSceneId: "shop", label: "Войти", x: 27, y: 23, width: 20, height: 42 },
  ],
};
