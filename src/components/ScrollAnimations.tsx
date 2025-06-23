import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap;
      
      // Register ScrollTrigger plugin
      if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);

        // Parallax effect for hero section
        gsap.to('.hero-bg', {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        // Stagger animation for cards
        gsap.fromTo('.animate-card', 
          { 
            opacity: 0, 
            y: 50 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.cards-container',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Progress bar animation
        gsap.fromTo('.progress-bar', 
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left center',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.progress-section',
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Counter animation
        const counters = document.querySelectorAll('.counter');
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target') || '0');
          gsap.fromTo(counter, 
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });

        // Reveal animations for sections
        gsap.utils.toArray('.reveal-section').forEach((section: any) => {
          gsap.fromTo(section.children, 
            { 
              opacity: 0, 
              y: 30 
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }
    }
  }, []);

  return null;
}

// Declare ScrollTrigger on window for TypeScript
declare global {
  interface Window {
    ScrollTrigger: any;
  }
}