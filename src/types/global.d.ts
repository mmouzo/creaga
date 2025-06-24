// Tipos globales para GSAP
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

// Tipos para los componentes de Chart.js
export interface ChartTooltipContext {
  parsed: number;
  label: string;
  dataIndex: number;
  dataset: any;
}

// Tipos para los datos del pliego
export interface PliegoData {
  muro: PliegoItem;
  viga: PliegoItem;
  losa: PliegoItem;
}

export interface PliegoItem {
  title: string;
  content: string;
}

// Tipos para las razas
export interface Breed {
  id: string;
  name: string;
  image: string;
  description: string;
}

// Tipos para las imágenes de la galería
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  metadata: {
    type: string;
    location: string;
    date: string;
  };
}

export {};
