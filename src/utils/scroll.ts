/**
 * Единый smooth-scroll для всех навигационных кнопок.
 * Под `prefers-reduced-motion` прокрутка мгновенная — JS-поведение не наследует
 * CSS-правило, поэтому запрос на сниженную подвижность читается здесь.
 */
const isReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToSection(sectionId: string): void {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.scrollIntoView({
    behavior: isReducedMotion() ? 'auto' : 'smooth',
  });
}

export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: isReducedMotion() ? 'auto' : 'smooth',
  });
}
