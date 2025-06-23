import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { TweenVars } from 'gsap';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export default function AnimatedSection({ 
  children, 
  animation = 'fadeIn', 
  delay = 0, 
  duration = 0.6,
  className = '',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
}: AnimatedSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
      
    // Set initial state
    const initialState: TweenVars = { opacity: 0 };
    // Define final state, ensuring opacity is always part of it.
    const finalState: TweenVars = { opacity: 1, duration, delay };

    switch (animation) {
      case 'slideUp':
        initialState.y = 50;
        finalState.y = 0;
        break;
      case 'slideLeft':
        initialState.x = 50;
        finalState.x = 0;
        break;
      case 'slideRight':
        initialState.x = -50;
        finalState.x = 0;
        break;
      case 'scale':
        initialState.scale = 0.8;
        finalState.scale = 1;
        break;
      // Default case is 'fadeIn', which only uses opacity handled by initialState and finalState.
    }

    gsap.set(element, initialState);

    // Create intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(element, finalState);
            observer.unobserve(element); // Unobserve after animation starts
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      // Optional: Kill GSAP animations associated with the element if needed,
      // though GSAP usually handles this well.
      // gsap.killTweensOf(element);
    };
  }, [animation, delay, duration, threshold, rootMargin]); // Add threshold and rootMargin to dependencies

  return (
    <div ref={elementRef} className={className} style={{ opacity: 0 }}> {/* Start with opacity 0 */}
      {children}
    </div>
  );
}