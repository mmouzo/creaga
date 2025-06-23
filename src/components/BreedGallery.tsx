import { useState } from 'react';

interface Breed {
  id: string;
  name: string;
  image: string;
  description: string;
}

const breeds: Breed[] = [
  {
    id: 'cachena',
    name: 'Cachena',
    image: '/images/image1.png',
    description: 'Raza autóctona de pequeño tamaño, muy rústica y adaptada al monte gallego. Excelente para la limpieza de monte y prevención de incendios.'
  },
  {
    id: 'caldela',
    name: 'Caldelá',
    image: '/images/image2.png',
    description: 'Raza de aptitud cárnica, bien adaptada a las condiciones climáticas de Galicia. Conocida por su docilidad y facilidad de parto.'
  },
  {
    id: 'frieiresa',
    name: 'Frieiresa',
    image: '/images/image3.png',
    description: 'Raza de gran rusticidad, tradicionalmente utilizada para trabajo y producción de carne. Muy resistente a enfermedades.'
  },
  {
    id: 'limia',
    name: 'Limiá',
    image: '/images/image4.png',
    description: 'Raza originaria de la comarca de A Limia, de gran valor genético y perfectamente adaptada al pastoreo extensivo.'
  },
  {
    id: 'rubia',
    name: 'Rubia Galega',
    image: '/images/image5.png',
    description: 'La raza bovina más representativa de Galicia, de gran tamaño y excelente producción cárnica. Símbolo de la ganadería gallega.'
  },
  {
    id: 'vianesa',
    name: 'Vianesa',
    image: '/images/image6.png',
    description: 'Raza de montaña, muy rústica y adaptada a terrenos difíciles. Excelente madre y de gran longevidad.'
  }
];

export default function BreedGallery() {
  const [selectedBreed, setSelectedBreed] = useState<Breed>(breeds[0]);

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold font-serif text-criaga-red mb-6 text-center">
          Razas Autóctonas
        </h3>
        
        {/* Breed Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {breeds.map((breed) => (
            <button
              key={breed.id}
              onClick={() => setSelectedBreed(breed)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedBreed.id === breed.id
                  ? 'bg-criaga-red text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {breed.name}
            </button>
          ))}
        </div>
        
        {/* Selected Breed Display */}
        <div className="text-center animate-fade-in">
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={selectedBreed.image}
              alt={`Imagen de ${selectedBreed.name}`}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
          <h4 className="text-xl font-bold font-serif text-criaga-red mb-2">
            {selectedBreed.name}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {selectedBreed.description}
          </p>
        </div>
      </div>
      
      {/* Chart placeholder - will be replaced with actual chart */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold font-serif text-criaga-red mb-4 text-center">
          Distribución de Superficies
        </h3>
        <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
          <div id="superficies-chart-container" className="w-full h-full">
            <canvas id="superficiesChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}