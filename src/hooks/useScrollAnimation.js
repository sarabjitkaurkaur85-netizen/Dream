import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer.
 * Returns a ref to attach to the element you want to animate.
 * 
 * Usage:
 *   const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
 *   <div ref={ref} className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}>
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Only animate once
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
}

/**
 * Hook to observe multiple children of a container for staggered animations.
 * Returns a ref to attach to the parent container.
 */
export function useStaggerAnimation(options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let observer;

    const setupObserver = () => {
      if (observer) {
        observer.disconnect();
      }

      const children = container.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
      
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px 0px -40px 0px',
        }
      );

      children.forEach((child) => {
        if (!child.classList.contains('is-visible')) {
          observer.observe(child);
        }
      });
    };

    setupObserver();

    const mutationObserver = new MutationObserver(() => {
      setupObserver();
    });

    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return containerRef;
}

export default useScrollAnimation;
