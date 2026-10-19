import "./ChapterBanner.css";

interface ChapterInfo {
  title: string;
  subtitle: string;
  // Только там, где GDD явно подразумевает скачок во времени между главами.
  // Глава 5 ("Той ночью") восстанавливает прошлую ночь, а не начинает новую —
  // для неё ремарки нет. Точных сроков GDD не даёт (кроме Главы 8, "несколько
  // месяцев, весна") — для остальных используется нейтральная формулировка,
  // а не выдуманное точное число дней.
  timeSkip?: string;
}

// Главы 2-8 временно в last-train/archive/ (см. TODO.md) — вернуть записи по мере
// восстановления следующих глав.
const CHAPTER_INFO: Record<number, ChapterInfo> = {
  1: { title: "Глава 1", subtitle: "Последняя зима", timeSkip: "Прошло несколько дней." },
};

interface ChapterBannerProps {
  chapter: number;
  onDismiss: () => void;
}

export function ChapterBanner({ chapter, onDismiss }: ChapterBannerProps) {
  const info = CHAPTER_INFO[chapter];
  if (!info) return null;

  return (
    <div className="chapter-banner" onClick={onDismiss}>
      <div className="chapter-banner__title">{info.title}</div>
      <div className="chapter-banner__subtitle">{info.subtitle}</div>
      {info.timeSkip && <div className="chapter-banner__timeskip">{info.timeSkip}</div>}
      <div className="chapter-banner__hint">Нажми, чтобы продолжить</div>
    </div>
  );
}
