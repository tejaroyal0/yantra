import { useRef, useState, useCallback } from 'react';

interface TiltConfig {
  max?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export function useTilt<T extends HTMLElement>({
  max = 15,
  perspective = 1000,
  scale = 1.04,
  speed = 300,
}: TiltConfig = {}) {
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState('');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;

      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
      );
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    },
    [max, perspective, scale]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTransform(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`
    );
  }, [perspective]);

  return {
    ref,
    transform,
    glarePos,
    isHovering,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    transitionStyle: { transition: `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)` },
  };
}
