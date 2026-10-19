// Единая точка для путей к файлам из public/ — использовать вместо голых строк
// "/images/..."/"/audio/...". GitHub Pages отдаёт project-сайт не с корня
// домена, а с /<репозиторий>/ (см. vite.config.ts base); import.meta.env.BASE_URL —
// то же самое значение, подставленное Vite в рантайме (на localhost это "/",
// поведение не меняется). Без этой обёртки все абсолютные пути вели бы мимо.
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
