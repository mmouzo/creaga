import { useState, useEffect } from 'react';
import { breedsData, type BreedData } from '../data/breedsData';
import InteractiveChart from './InteractiveChart'; // Importar el componente de gráfico

export default function BreedGallery() {
  const [selectedBreed, setSelectedBreed] = useState<BreedData>(breedsData[0]);

  const superficiesData = {
    labels: ['Carballeira', 'Viñedos', 'Zona Ext. Vacas', 'Granja', 'Eira', 'Caminos', 'Cultivos', 'Invernaderos'],
    datasets: [{
      label: 'Superficie (m²)',
      data: [12359.98, 4993.75, 4181.67, 2989.32, 2287.89, 1511.95, 1449.79, 432.00],
      backgroundColor: '#BF4A3F',
      borderColor: '#8C1D18',
      borderWidth: 1
    }]
  };

  const superficiesOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Superficie (m²)'
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold font-serif text-criaga-red mb-6 text-center">
          Razas Autóctonas
        </h3>
        
        {/* Breed Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {breedsData.map((breed) => (
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
              alt={selectedBreed.alt} // Usar el campo alt de BreedData
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
      
      {/* Chart using InteractiveChart component */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold font-serif text-criaga-red mb-4 text-center">
          Distribución de Superficies
        </h3>
        <div className="h-96">
          <InteractiveChart
            id="superficiesChart"
            type="bar"
            data={superficiesData}
            options={superficiesOptions}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}