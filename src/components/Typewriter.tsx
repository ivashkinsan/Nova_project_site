import { useEffect, useState } from 'react';

interface TypewriterProps {
  words?: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  newTextDelay?: number;
  className?: string;
}

// Уважение prefers-reduced-motion: печатание не запускается, показана статичная первая строка
function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Typewriter({
  words = ['curate', 'represent', 'conceptualise'],
  typingSpeed = 100,
  erasingSpeed = 50,
  newTextDelay = 2000,
  className,
}: TypewriterProps) {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  const [textArrayIndex, setTextArrayIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => {
      setReduced(query.matches);
      if (query.matches) {
        // статичное состояние: первый полный жанр, таймер не работает
        setCharIndex(words[0].length);
        setIsDeleting(false);
        setTextArrayIndex(0);
      }
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [words]);

  useEffect(() => {
    if (reduced) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < words[textArrayIndex].length) {
      timeoutId = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex === words[textArrayIndex].length) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, newTextDelay);
    } else if (isDeleting && charIndex > 0) {
      timeoutId = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
      }, erasingSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextArrayIndex((prev) => (prev + 1) % words.length);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [charIndex, isDeleting, textArrayIndex, words, typingSpeed, erasingSpeed, newTextDelay]);

  const currentText = reduced
    ? words[0]
    : words[textArrayIndex].substring(0, charIndex);

  return (
    <span className={className}>
      {currentText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}
