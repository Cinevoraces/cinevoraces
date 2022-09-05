import { useEffect, useState } from 'react';
import { useGetUserMetricsQuery } from 'redux/api';
import styles from './UserMetrics.module.scss';

function UserMetrics({id}: {id: string}) {
  const {data: metricsData, isLoading} = useGetUserMetricsQuery((id));
  const [metrics, setMetrics] = useState<{[key: string]: string | number}[]>();

  useEffect(() => {
    if (metricsData) {
      const {propositions_count, comments_count, likes_count, watchlist_count} = metricsData[0];
      setMetrics([
        {style: 'primary', text: `proposé${propositions_count > 1 ? 's' : ''}`, count: propositions_count},
        {style: 'secondary', text: `commenté${comments_count > 1 ? 's' : ''}`, count: comments_count},
        {style: 'purple', text: `aimé${likes_count > 1 ? 's' : ''}`, count: likes_count},
        {style: 'yellow', text: 'dans ma\nwatchlist', count: watchlist_count}
      ]);
    }}, [metricsData]);

  return (
    <div className={styles['user-metrics']}>
      {!isLoading && metrics && metrics.map(({style, text, count}) => (
        <div key={style} className={`${styles['metric']} ${styles[`metric--${style}`]}`}>
          <span className={styles['count']}>{count}</span>
          <span className={styles['type']}>
            Film{(count > 1) && 's'}
            <br/>{text}
          </span>
        </div>))}
    </div>
  );
}

export default UserMetrics;