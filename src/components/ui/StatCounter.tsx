
import React from 'react';
import { cn } from '@/lib/utils';
import useAnimatedCounter from '@/hooks/useAnimatedCounter';
import { Statistic } from '@/utils/mockData';

interface StatCounterProps {
  stat: Statistic;
  className?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({ stat, className }) => {
  const { count, ref } = useAnimatedCounter({
    end: stat.value,
    prefix: stat.prefix || '',
    suffix: stat.suffix || '',
  });

  return (
    <div 
      ref={ref}
      className={cn(
        "flex flex-col items-center text-center p-6",
        className
      )}
    >
      <div className="mb-2">
        <span className="text-4xl md:text-5xl font-bold text-brand-900">{count}</span>
      </div>
      <h3 className="text-lg font-medium text-gray-700">{stat.label}</h3>
    </div>
  );
};

export default StatCounter;
