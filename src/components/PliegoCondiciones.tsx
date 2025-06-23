import { useState } from 'react';

interface PliegoDataItem {
  title: string;
  content: string;
}

interface PliegoData {
  [key: string]: PliegoDataItem;
}

const pliegoData: PliegoData = {
  muro: {
    title: 'Unidad EHN030B: Muro de hormigón armado',
    content: `
      <p class="mb-4"><strong>Descripción:</strong> Muro de hormigón armado de 40 cm de espesor medio, realizado con hormigón HA-30/F/12/XC4 fabricado en central y vertido con cubilote. Armado con acero UNE-EN 10080 B 500 S (cuantía aprox. 51,4 kg/m³).</p>
      <p class="mb-4"><strong>Normativa:</strong> Elaboración, transporte y puesta en obra del hormigón según el Código Estructural.</p>
      <h4 class="font-semibold mb-2 text-criaga-red">Proceso de Ejecución:</h4>
      <ol class="list-decimal list-inside space-y-1 text-gray-700">
        <li>Replanteo y comprobación de armaduras de espera.</li>
        <li>Colocación de armadura principal con separadores homologados.</li>
        <li>Vertido y compactación del hormigón, evitando la disgregación.</li>
        <li>Curado del hormigón para garantizar la resistencia.</li>
      </ol>
    `
  },
  viga: {
    title: 'Unidad EHV030: Viga de hormigón armado',
    content: `
      <p class="mb-4"><strong>Descripción:</strong> Viga descolgada de hormigón armado, realizada con hormigón HA-25/F/20/X0 fabricado en central y vertido con cubilote. Armado con acero UNE-EN 10080 B 500 S (cuantía aprox. 112,7 kg/m³).</p>
      <p class="mb-4"><strong>Normativa:</strong> Código Estructural y NTE-EME (Encofrados).</p>
      <h4 class="font-semibold mb-2 text-criaga-red">Proceso de Ejecución:</h4>
      <ol class="list-decimal list-inside space-y-1 text-gray-700">
        <li>Montaje de sistema de encofrado con superficie tratada.</li>
        <li>Colocación de la armadura con separadores, asegurando recubrimientos.</li>
        <li>Vertido y compactación del hormigón.</li>
      </ol>
    `
  },
  losa: {
    title: 'Unidad EHL030: Losa maciza de hormigón armado',
    content: `
      <p class="mb-4"><strong>Descripción:</strong> Losa maciza horizontal de 35 cm de canto, realizada con hormigón HA-25/F/20/X0. Armado con acero UNE-EN 10080 B 500 S (cuantía aprox. 28,7 kg/m²).</p>
      <p class="mb-4"><strong>Normativa:</strong> Código Estructural y NTE-EME (Encofrados).</p>
      <h4 class="font-semibold mb-2 text-criaga-red">Proceso de Ejecución:</h4>
      <ol class="list-decimal list-inside space-y-1 text-gray-700">
        <li>Montaje de sistema de encofrado continuo sobre puntales.</li>
        <li>Colocación de armaduras (inferior, superior, de reparto) con separadores.</li>
        <li>Vertido continuo y compactación del hormigón.</li>
      </ol>
    `
  }
};

interface PliegoButtonProps {
  target: string;
  label: string;
  isActive: boolean;
  onClick: (target: string) => void;
}

const PliegoButton: React.FC<PliegoButtonProps> = ({ target, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(target)}
    className={`pliego-btn px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-criaga-red-light transition-all duration-200 transform hover:-translate-y-1 ${
      isActive ? 'bg-criaga-red text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
    data-target={target}
  >
    {label}
  </button>
);

export default function PliegoCondiciones() {
  const [activeTarget, setActiveTarget] = useState<string>('muro');

  const currentData = pliegoData[activeTarget];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <PliegoButton
          target="muro"
          label="Muro de Hormigón"
          isActive={activeTarget === 'muro'}
          onClick={setActiveTarget}
        />
        <PliegoButton
          target="viga"
          label="Viga de Hormigón"
          isActive={activeTarget === 'viga'}
          onClick={setActiveTarget}
        />
        <PliegoButton
          target="losa"
          label="Losa Maciza"
          isActive={activeTarget === 'losa'}
          onClick={setActiveTarget}
        />
      </div>

      <div id="pliego-content" className="min-h-[300px] p-1"> {/* Added p-1 for minimal padding if content is empty initially */}
        {currentData && (
          <>
            <h3 className="text-2xl font-bold font-serif text-criaga-red mb-6">{currentData.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: currentData.content }} />
          </>
        )}
      </div>
    </>
  );
}
