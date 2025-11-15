import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigation } from "react-router-dom";

const EASING_DURATION = 800;
const MIN_VISIBLE_MS = 400;
const AUTO_COMPLETE_DELAY = 1200;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const PageProgress = () => {
  const location = useLocation();
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const rafRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoFinishRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastStartRef = useRef<number>(0);

  const clearTimers = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (completeTimeoutRef.current) {
      clearTimeout(completeTimeoutRef.current);
      completeTimeoutRef.current = null;
    }
    if (autoFinishRef.current) {
      clearTimeout(autoFinishRef.current);
      autoFinishRef.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    clearTimers();
    lastStartRef.current = performance.now();
    setIsVisible(true);
    setProgress(0);

    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastStartRef.current;
      const eased = easeOutCubic(Math.min(1, elapsed / EASING_DURATION));
      const next = Math.min(95, eased * 95);
      setProgress(next);
      if (next < 95) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    autoFinishRef.current = setTimeout(() => {
      finishProgress();
    }, AUTO_COMPLETE_DELAY);
  }, [clearTimers]);

  const finishProgress = useCallback(() => {
    const elapsed = performance.now() - lastStartRef.current;
    const delay = elapsed < MIN_VISIBLE_MS ? MIN_VISIBLE_MS - elapsed : 0;

    if (completeTimeoutRef.current) {
      clearTimeout(completeTimeoutRef.current);
    }
    if (autoFinishRef.current) {
      clearTimeout(autoFinishRef.current);
      autoFinishRef.current = null;
    }

    completeTimeoutRef.current = setTimeout(() => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setProgress(100);
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 250);
    }, delay);
  }, []);

  useEffect(() => {
    startProgress();
    return () => clearTimers();
  }, [clearTimers, startProgress, location.pathname, location.search]);

  useEffect(() => {
    if (navigation.state === "loading") {
      startProgress();
    } else {
      finishProgress();
    }

    return () => clearTimers();
  }, [clearTimers, finishProgress, navigation.state, startProgress]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        className="h-full w-full origin-left scale-x-0 bg-brand transition-transform duration-100"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
};
