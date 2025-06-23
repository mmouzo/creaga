import { useEffect, useRef } from 'react';

interface ChartProps {
  id: string;
  type: 'doughnut' | 'bar' | 'line';
  data: any;
  options?: any;
  className?: string;
}

export default function InteractiveChart({ id, type, data, options = {}, className = '' }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return;

    // @ts-ignore - Chart.js is loaded via CDN
    const Chart = window.Chart;
    if (!Chart) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Default options
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              family: "'Inter', sans-serif"
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(140, 29, 24, 0.9)',
          titleColor: '#FCFBF8',
          bodyColor: '#FCFBF8',
          borderColor: '#8C1D18',
          borderWidth: 1
        }
      },
      ...options
    };

    // Create new chart
    chartRef.current = new Chart(ctx, {
      type,
      data,
      options: defaultOptions
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} id={id}></canvas>
    </div>
  );
}