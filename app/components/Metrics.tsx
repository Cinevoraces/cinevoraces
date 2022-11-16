import React from 'react';

interface MetricsProps {
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
  const metricsColors = ['purple', 'yellow', 'green'];

  const baseMetricsStyle = 'flex flex-col gap-1 items-center font-bold ';
  return (
    <section id='metrics' className='py-8 flex flex-col gap-6 text-3xl font-semibold'>
      <h2 className='text-2xl font-semibold text-center'>Cinévoraces en quelques chiffres :</h2>
      <div className='flex justify-around'>
        {
          metrics.map((metric, i) => (
            <div className={baseMetricsStyle + `text-${metricsColors[i]}`} key={metricsLabel[i]}>
              <p>{metric}</p>
              <p className='text-xl'>{metricsLabel[i]}</p>
            </div>
          ))
        }
      </div>
    </section>
  );
}
