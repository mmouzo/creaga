import { useEffect, useRef } from 'react';

interface ChartProps {
  readonly id: string;
  readonly type: 'doughnut' | 'bar' | 'line' | 'pie';
  readonly data: any;
  readonly options?: any;
  readonly className?: string;
  readonly height?: number;
}

export default function InteractiveChart({ 
  id, 
  type, 
  data, 
  options = {}, 
  className = '', 
  height = 400 
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Wait for Chart.js to be available
    const initChart = () => {
      // @ts-ignore - Chart.js is loaded via CDN
      const Chart = window.Chart;
      if (!Chart) {
        console.error('Chart.js not loaded');
        return;
      }

      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      // Destroy existing chart
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      // Simplified approach for debugging tooltips
      const finalOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: { family: "'Inter', sans-serif", size: 12 },
              color: '#333333',
              padding: 15,
              usePointStyle: true
            }
          },
          tooltip: {
            enabled: true,  // Explicitly enable tooltips
            mode: 'nearest',
            intersect: false
          }
        }
      };

      // Apply ALL custom options - letting them completely override defaults
      if (options && typeof options === 'object') {
        Object.keys(options).forEach(key => {
          if (key === 'plugins' && options.plugins) {
            Object.keys(options.plugins).forEach(plugin => {
              if (!finalOptions.plugins[plugin]) {
                finalOptions.plugins[plugin] = {};
              }
              finalOptions.plugins[plugin] = { ...finalOptions.plugins[plugin], ...options.plugins[plugin] };
            });
          } else {
            finalOptions[key] = options[key];
          }
        });
      }

      // Type-specific options with working tooltips
      if (type === 'doughnut' || type === 'pie') {
        finalOptions.plugins.legend.position = 'right';
        finalOptions.cutout = type === 'doughnut' ? '60%' : '0%';
        
        // Configure tooltips specifically for circular charts
        finalOptions.plugins.tooltip = {
          enabled: true,
          backgroundColor: 'rgba(140, 29, 24, 0.96)',
          titleColor: '#FCFBF8',
          bodyColor: '#FCFBF8',
          borderColor: '#8C1D18',
          borderWidth: 2,
          cornerRadius: 12,
          displayColors: true,
          padding: 16,
          titleFont: { family: "'Inter', sans-serif", size: 16, weight: 'bold' },
          bodyFont: { family: "'Inter', sans-serif", size: 13, weight: '500' },
          footerFont: { family: "'Inter', sans-serif", size: 11, style: 'italic' },
          callbacks: {
            title: function(context: any) {
              const item = context[0];
              return `${item.label} - ${item.parsed}%`;
            },
            label: function(context: any) {
              if (id === 'budgetChart') {
                const cost = (context.parsed * 30872.46 / 100).toFixed(0);
                return `💰 Importe: ${cost} €`;
              } else if (id === 'costAreasChart') {
                const cost = (context.parsed * 30872.46 / 100).toFixed(0);
                return `💰 Coste: ${cost} € (${context.parsed}%)`;
              }
              return `${context.label}: ${context.parsed}%`;
            },
            afterLabel: function(context: any) {
              if (id === 'budgetChart') {
                const descriptions = [
                  'Movimiento de tierras y preparación del terreno',
                  'Estructuras principales de hormigón y acero', 
                  'Viales, senderos y áreas de acceso',
                  'Electricidad, fontanería y sistemas técnicos',
                  'Cimentaciones y zapatas de estructuras',
                  'Cubiertas y sistemas de impermeabilización',
                  'Aislamientos térmicos y acústicos',
                  'Ventanas, puertas y elementos de cierre',
                  'Partidas menores y varios'
                ];
                return ['', `📋 ${descriptions[context.dataIndex]}`, '', '🏗️ Proyecto CRIAGA - Centro de Recuperación'];
              } else if (id === 'costAreasChart') {
                const areas = [
                  'Infraestructura básica del proyecto',
                  'Construcción de edificaciones',
                  'Ordenación paisajística',
                  'Sistemas técnicos y servicios', 
                  'Acabados y detalles finales'
                ];
                return ['', `📝 ${areas[context.dataIndex]}`, '', '🌱 Enfoque sostenible y ecológico'];
              }
              return [];
            },
            footer: function() {
              return ['Presupuesto total: 30.872,46 €', 'Superficie: 246,63 m²'];
            }
          }
        };
        
        // Enhanced hover effects
        finalOptions.interaction = { intersect: false, mode: 'point' };
        finalOptions.elements = {
          arc: {
            hoverBackgroundColor: function(context: any) {
              const originalColor = context.dataset.backgroundColor[context.dataIndex];
              if (originalColor.includes('#')) {
                const hex = originalColor.replace('#', '');
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const b = parseInt(hex.substr(4, 2), 16);
                return `rgba(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)}, 0.9)`;
              }
              return originalColor;
            },
            hoverBorderColor: '#FCFBF8',
            hoverBorderWidth: 4,
            hoverOffset: 15
          }
        };

        finalOptions.onHover = (event: any, activeElements: any[]) => {
          if (canvasRef.current) {
            canvasRef.current.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
          }
        };
      }

      if (type === 'bar') {
        finalOptions.scales = {
          x: {
            beginAtZero: true,
            grid: {
              color: '#E5E5E5'
            },
            ticks: {
              font: {
                family: "'Inter', sans-serif"
              },
              color: '#333333'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#E5E5E5'
            },
            ticks: {
              font: {
                family: "'Inter', sans-serif"
              },
              color: '#333333'
            }
          },
          ...finalOptions.scales
        };
      }

      try {
        // Debug: Log all options for debugging
        console.log('=== CHART DEBUG ===');
        console.log('Chart type:', type);
        console.log('Chart ID:', id);
        console.log('Input options:', options);
        console.log('Final options:', finalOptions);
        console.log('Tooltip config:', finalOptions.plugins?.tooltip);
        console.log('==================');
        
        // Create new chart
        chartRef.current = new Chart(ctx, {
          type,
          data,
          options: finalOptions
        });
        
        // Additional debug after chart creation
        if (chartRef.current && (type === 'doughnut' || type === 'pie')) {
          console.log('Chart created successfully:', chartRef.current);
          console.log('Chart options applied:', chartRef.current.options);
        }
      } catch (error) {
        console.error('Error creating chart:', error);
      }
    };

    // Check if Chart.js is already loaded
    if (typeof window !== 'undefined' && window.Chart) {
      initChart();
    } else {
      // Wait for Chart.js to load
      const checkChart = setInterval(() => {
        if (typeof window !== 'undefined' && window.Chart) {
          clearInterval(checkChart);
          initChart();
        }
      }, 100);

      // Cleanup interval after 5 seconds
      setTimeout(() => clearInterval(checkChart), 5000);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [type, data, options, id]);

  return (
    <div className={`relative w-full transition-all duration-300 ease-in-out ${className}`} style={{ height: `${height}px` }}>
      <canvas 
        ref={canvasRef} 
        id={id}
        className="w-full h-full transition-all duration-200 ease-in-out hover:drop-shadow-lg"
        aria-label={`Gráfico ${type} - ${id}`}
      />
    </div>
  );
}

// Declare Chart.js on window for TypeScript
declare global {
  interface Window {
    Chart: any;
  }
}