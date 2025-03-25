
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="py-20 text-center">
      <div className="inline-block w-10 h-10 border-4 border-gray-200 border-t-brand-900 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading courses...</p>
    </div>
  );
};

export default LoadingState;
