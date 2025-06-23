import { useState } from 'react';

interface SlideData {
  id: number;
  title: string;
  description: string;
  image: string;
  details: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: 'Preexistencias y Parcela',
    description: 'Análisis del estado inicial del terreno',
    image: '/images/image7.png',
    details: 'Dos edificaciones en ruinas en parcelas separadas. El proyecto parte del reconocimiento de las preexistencias y la topografía natural del terreno.'
  },
  {
    id: 2,
    title: 'Idea de Volumen Inicial',
    description: 'Concepto arquitectónico básico',
    image: '/images/image8.png',
    details: 'Un gran volumen longitudinal para la granja que se adapta a la pendiente natural del terreno, minimizando el impacto visual.'
  },
  {
    id: 3,
    title: 'Idea Estructural Inicial',
    description: 'Sistema constructivo propuesto',
    image: '/images/image9.png',
    details: 'Secuencia de muros permeables que permiten la ventilación natural y el paso del ganado, integrándose con el paisaje.'
  },
  {
    id: 4,
    title: 'Adaptación a la Topografía',
    description: 'Integración con el entorno natural',
    image: '/images/image10.png',
    details: 'El volumen se quiebra para seguir las curvas de nivel, respetando la topografía existente y minimizando los movimientos de tierra.'
  },
  {
    id: 5,
    title: 'Desarrollo y Estado Final',
    description: 'Propuesta arquitectónica definitiva',
    image: '/images/image11.png',
    details: 'Edificio final con cubierta vegetal, completamente integrado en el paisaje. La arquitectura desaparece para dar protagonismo al entorno natural.'
  }
];

export default function DesignSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Image Container */}
      <div className="relative h-96 bg-gray-100">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover transition-opacity duration-500"
          loading="lazy"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-criaga-red p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Imagen anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-criaga-red p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Imagen siguiente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-criaga-red scale-110'
                  : 'bg-white/70 hover:bg-white'
              }`}
              aria-label={`Ir a la imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold font-serif text-criaga-red">
            {slide.title}
          </h3>
          <span className="text-sm text-gray-500">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
        
        <p className="text-gray-600 mb-3 font-medium">
          {slide.description}
        </p>
        
        <p className="text-sm text-gray-700 leading-relaxed">
          {slide.details}
        </p>
      </div>
    </div>
  );
}