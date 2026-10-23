import { useScrollPosition } from '@/hooks/useScrollPosition';

export function ScrollProgress() {
  const { scrollProgress } = useScrollPosition();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-accent-400 via-accent-300 to-gold-400 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
}
