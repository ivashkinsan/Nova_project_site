import { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

interface LottieAnimationProps {
  animationData: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}

export default function LottieAnimation({
  animationData,
  className,
  loop = true,
  autoplay = true,
  speed = 1,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      animationData: typeof animationData === 'string' ? JSON.parse(animationData) : animationData,
    });

    if (animationRef.current) {
      animationRef.current.setSpeed(speed);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [animationData, loop, autoplay, speed]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
