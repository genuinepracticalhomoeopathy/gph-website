'use client';

import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="bg-[#FE9300] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center justify-center p-6 border-r border-white/20 last:border-0">
              <h3 className="text-5xl font-bold mb-3">25+</h3>
              <p className="text-sm text-white/80 font-medium uppercase tracking-wider">Years Experience</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 border-r border-white/20 last:border-0">
              <h3 className="text-5xl font-bold mb-3">97%</h3>
              <p className="text-sm text-white/80 font-medium uppercase tracking-wider">Positive Reviews</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 last:border-0">
              <h3 className="text-5xl font-bold mb-3">100+</h3>
              <p className="text-sm text-white/80 font-medium uppercase tracking-wider">Trusted by Students</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;