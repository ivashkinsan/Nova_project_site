import { useState, useEffect } from 'react';

interface TypewriterProps {
  words?: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  newTextDelay?: number;
  className?: string;
}

export default function Typewriter({
  words = ['curate', 'represent', 'conceptualise'],
  typingSpeed = 100,
  erasingSpeed = 50,
  newTextDelay = 2000,
  className,
}: TypewriterProps) {
  const [textArrayIndex, setTextArrayIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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

  const currentText = words[textArrayIndex].substring(0, charIndex);

  return (
    <span className={className}>
      {currentText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}
