import { useGame } from "../game/GameContext";
import "./Epilogue.css";

// Три концовки — GDD §39. Текст описывает исход, но не переигрывает сцену
// заново — сама сцена прощания уже отыграна в диалоге misha_departure.
const ENDING_CONTENT: Record<string, { title: string; text: string }> = {
  truth: {
    title: "Концовка: Правда",
    text: "Артём рассказывает то, что узнал. История Лены перестаёт быть тайной. Взрослые наконец перестают скрывать прошлое.",
  },
  letGo: {
    title: "Концовка: Отпустить",
    text: "Мы не можем изменить то, что произошло. Артём оставляет историю в прошлом. Миша сохраняет найденные вещи.",
  },
  search: {
    title: "Концовка: Искать",
    text: "Среди старых бумаг находится фотография из другого города. На ней — человек, похожий на Лену. Доказательств недостаточно. Но теперь есть о чём думать.",
  },
};

interface EpilogueProps {
  onReturnToMenu: () => void;
}

export function Epilogue({ onReturnToMenu }: EpilogueProps) {
  const { state } = useGame();
  const ending = state.ending ? ENDING_CONTENT[state.ending] : null;

  return (
    <div className="epilogue">
      <div className="epilogue__text">
        Артём остаётся на платформе. Поезд исчезает вдали.
      </div>
      <div className="epilogue__quote">
        «Некоторые места остаются с нами, даже когда мы из них уезжаем.»
      </div>
      {ending && (
        <>
          <div className="epilogue__ending-title">{ending.title}</div>
          <div className="epilogue__ending-text">{ending.text}</div>
        </>
      )}
      <button type="button" className="epilogue__button" onClick={onReturnToMenu}>
        В главное меню
      </button>
    </div>
  );
}
