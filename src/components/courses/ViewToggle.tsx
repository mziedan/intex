
import React from 'react';
import { Grid3X3, List, Table } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'grid' | 'list' | 'table';
  setViewMode: (mode: 'grid' | 'list' | 'table') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-md ${
          viewMode === 'grid' 
            ? 'bg-brand-100 text-brand-900' 
            : 'text-gray-500 hover:text-brand-900 hover:bg-gray-100'
        }`}
        aria-label="Grid view"
      >
        <Grid3X3 size={18} />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-md ${
          viewMode === 'list' 
            ? 'bg-brand-100 text-brand-900' 
            : 'text-gray-500 hover:text-brand-900 hover:bg-gray-100'
        }`}
        aria-label="List view"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => setViewMode('table')}
        className={`p-2 rounded-md ${
          viewMode === 'table' 
            ? 'bg-brand-100 text-brand-900' 
            : 'text-gray-500 hover:text-brand-900 hover:bg-gray-100'
        }`}
        aria-label="Table view"
      >
        <Table size={18} />
      </button>
    </div>
  );
};

export default ViewToggle;
