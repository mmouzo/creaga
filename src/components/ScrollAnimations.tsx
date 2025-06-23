import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
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
      // Asegurarse de que counter es un HTMLElement para acceder a textContent
      if (counter instanceof HTMLElement) {
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
            },
            // GSAP's textContent tweening might need a roundProps or similar for whole numbers if not default
            // Forcing update on each tick for text.
            onUpdate: function() {
              if (counter instanceof HTMLElement) { // Type guard
                counter.textContent = Math.ceil(parseFloat(gsap.getProperty(counter, "textContent").toString())).toString();
              }
            }
          }
        );
      }
    });

    // Reveal animations for sections
    gsap.utils.toArray<Element>('.reveal-section').forEach((section) => {
      // Asegurarse de que section.children son elementos para GSAP
      const children = Array.from(section.children).filter(child => child instanceof Element) as Element[];
      if (children.length > 0) {
        gsap.fromTo(children,
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
      }
    });

    // Cleanup ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Potentially also kill all tweens if necessary, though ScrollTrigger.kill() often handles associated tweens.
      // gsap.killTweensOf("*"); // Be cautious with broad selectors
    };

  }, []);

  return null; // This component does not render anything itself
}