import React from 'react';
import GlobalSection from './global';
import StatesSection from './states';
import UpdateSection from './update';

const StatisticsPage = () => {
  return (
    <div className="w-full pt-12 overflow-auto">
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 mt-2 gap-x-4">
            <UpdateSection />
            <StatesSection />
            <GlobalSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
