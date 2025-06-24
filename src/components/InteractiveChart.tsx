import { useEffect, useRef } from 'react';

interface ChartProps {
  id: string;
  type: 'doughnut' | 'bar' | 'line' | 'pie';
  data: any;
  options?: any;
  className?: string;
  height?: number;
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

      // Default options with CRIAGA theme
      const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                family: "'Inter', sans-serif",
                size: 12
              },
              color: '#333333',
              padding: 15,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: 'rgba(140, 29, 24, 0.95)',
            titleColor: '#FCFBF8',
            bodyColor: '#FCFBF8',
            borderColor: '#8C1D18',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            titleFont: {
              family: "'Inter', sans-serif",
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              family: "'Inter', sans-serif",
              size: 12
            }
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeOutQuart'
        },
        ...options
      };

      // Type-specific options
      if (type === 'doughnut' || type === 'pie') {
        defaultOptions.plugins.legend.position = 'right';
        defaultOptions.cutout = type === 'doughnut' ? '60%' : '0%';
      }

      if (type === 'bar') {
        defaultOptions.scales = {
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
          ...defaultOptions.scales
        };
      }

      try {
        // Create new chart
        chartRef.current = new Chart(ctx, {
          type,
          data,
          options: defaultOptions
        });
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
    <div className={`relative w-full ${className}`} style={{ height: `${height}px` }}>
      <canvas 
        ref={canvasRef} 
        id={id}
        className="w-full h-full"
        aria-label={`Gráfico ${type} - ${id}`}
        role="img"
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