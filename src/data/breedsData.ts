export interface BreedData {
  id: string;
  name: string;
  image: string;
  description: string;
  alt: string;
  title: string; // Puede ser igual a name, o más específico para la galería
  metadata: {
    type: string;
    location: string;
  };
}

export const breedsData: BreedData[] = [
  {
    id: 'cachena',
    name: 'Cachena',
    image: '/images/image1.png',
    alt: 'Vaca Cachena pastando',
    title: 'Vaca Cachena',
    description: 'Raza autóctona de pequeño tamaño, muy rústica y adaptada al monte gallego. Excelente para la limpieza de monte y prevención de incendios.',
    metadata: { type: 'Bovino', location: 'Galicia' }
  },
  {
    id: 'caldela',
    name: 'Caldelá',
    image: '/images/image2.png',
    alt: 'Vaca Caldelá en prado',
    title: 'Vaca Caldelá',
    description: 'Raza de aptitud cárnica, bien adaptada a las condiciones climáticas de Galicia. Conocida por su docilidad y facilidad de parto.',
    metadata: { type: 'Bovino', location: 'Galicia' }
  },
  {
    id: 'frieiresa',
    name: 'Frieiresa',
    image: '/images/image3.png',
    alt: 'Vaca Frieiresa en el campo',
    title: 'Vaca Frieiresa',
    description: 'Raza de gran rusticidad, tradicionalmente utilizada para trabajo y producción de carne. Muy resistente a enfermedades.',
    metadata: { type: 'Bovino', location: 'Galicia' }
  },
  {
    id: 'limia',
    name: 'Limiá',
    image: '/images/image4.png',
    alt: 'Vaca Limiá de perfil',
    title: 'Vaca Limiá',
    description: 'Raza originaria de la comarca de A Limia, de gran valor genético y perfectamente adaptada al pastoreo extensivo.',
    metadata: { type: 'Bovino', location: 'A Limia' }
  },
  {
    id: 'rubia',
    name: 'Rubia Galega',
    image: '/images/image5.png',
    alt: 'Ejemplar de Rubia Galega',
    title: 'Rubia Galega',
    description: 'La raza bovina más representativa de Galicia, de gran tamaño y excelente producción cárnica. Símbolo de la ganadería gallega.',
    metadata: { type: 'Bovino', location: 'Galicia' }
  },
  {
    id: 'vianesa',
    name: 'Vianesa',
    image: '/images/image6.png',
    alt: 'Vaca Vianesa en zona montañosa',
    title: 'Vaca Vianesa',
    description: 'Raza de montaña, muy rústica y adaptada a terrenos difíciles. Excelente madre y de gran longevidad.',
    metadata: { type: 'Bovino', location: 'Viana do Bolo' }
  }
];
