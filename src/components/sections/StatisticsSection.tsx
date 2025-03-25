
import React from 'react';
import StatCounter from '@/components/ui/StatCounter';
import { Statistic } from '@/utils/mockData';

interface StatisticsSectionProps {
  statistics: Statistic[];
  isVisible: boolean;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ statistics, isVisible }) => {
  return (
    <section 
      id="stats" 
      className="animate-on-scroll py-24 bg-gradient-to-r from-brand-900 to-brand-800 text-white"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
          <div className="h-1 w-20 bg-white mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            A testament to our commitment to excellence in professional training and development.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {statistics.map((stat, index) => (
            <div 
              key={stat.id}
              className={`transition-all duration-700 delay-${index * 100} ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <StatCounter stat={stat} className="bg-white/10 backdrop-blur-sm rounded-lg transform hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
