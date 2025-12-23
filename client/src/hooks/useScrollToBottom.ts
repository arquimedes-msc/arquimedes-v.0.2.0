import { useEffect, useState, useRef } from 'react';

interface UseScrollToBottomOptions {
  /**
   * Threshold in pixels from bottom to trigger callback
   * @default 100
   */
  threshold?: number;
  /**
   * Callback to execute when user reaches bottom
   */
  onReachBottom?: () => void;
  /**
   * Only trigger once
   * @default true
   */
  once?: boolean;
}

/**
 * Hook to detect when user has scrolled to the bottom of the page
 * Useful for auto-completing lessons when user finishes reading
 */
export function useScrollToBottom({
  threshold = 100,
  onReachBottom,
  once = true,
}: UseScrollToBottomOptions = {}) {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // If already triggered and once=true, don't attach listener
    if (once && hasTriggeredRef.current) {
      return;
    }

    const handleScroll = () => {
      // Calculate how far from bottom
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // Check if within threshold
      if (distanceFromBottom <= threshold && !hasTriggeredRef.current) {
        setHasReachedBottom(true);
        hasTriggeredRef.current = true;
        
        if (onReachBottom) {
          onReachBottom();
        }
      }
    };

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check immediately in case content is short
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, onReachBottom, once]);

  return { hasReachedBottom };
}
