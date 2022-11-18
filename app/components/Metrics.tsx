import React from 'react';

export interface MetricsProps {
  seasons_count: number;
  movies_count: number;
  countries_count: number;
}

/**
 * @returns Displaying global metrics component
 * @param seasons_count
 * @param movies_count
 * @param countries_count
 */
export default function Metrics(props: MetricsProps) {
  const metrics = Object.values(props);
  const metricsLabel = ['Saisons', 'Films', 'Pays'];
  const metricsColors = ['text-purple', 'text-yellow', 'text-green'];

  const baseMetricsStyle = 'flex flex-col gap-1 items-center font-bold ';
  return (
    <section id='metrics' className='container mx-auto px-4 py-8 lg:py-16 w-full flex flex-col gap-6 items-center text-3xl font-semibold'>
      <h2 className='text-2xl font-semibold text-center lg:text-3xl'>Cinévoraces en quelques chiffres :</h2>
      <div className='w-full flex justify-around max-w-2xl'>
        {
          metrics.map((metric, i) => (
            <div className={baseMetricsStyle + metricsColors[i]} key={metricsLabel[i]}>
              <p>{metric}</p>
              <p className='text-xl'>{metricsLabel[i]}</p>
            </div>
          ))
        }
      </div>
    </section>
  );
}
