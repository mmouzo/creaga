import { useEffect, useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedSection({ 
  children, 
  animation = 'fadeIn', 
  delay = 0, 
  duration = 0.6,
  className = '' 
}: AnimatedSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if GSAP is available
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap;
      
      // Set initial state
      const initialState: any = { opacity: 0 };
      const finalState: any = { opacity: 1, duration, delay };

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
      }

      gsap.set(element, initialState);

      // Create intersection observer for scroll-triggered animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(element, finalState);
              observer.unobserve(element);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    } else {
      // Fallback CSS animation if GSAP is not available
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  }, [animation, delay, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

// Declare GSAP on window for TypeScript
declare global {
  interface Window {
    gsap: any;
  }
}