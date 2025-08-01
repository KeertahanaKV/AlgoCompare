import React from 'react';
import { sortingAlgorithms } from '../utils/sortingAlgorithms';

const AlgorithmSelector = ({ selectedAlgorithm, onAlgorithmChange }) => {
  const algorithms = Object.keys(sortingAlgorithms);

  return (
    <div className="flex items-center space-x-4">
      <span className="text-white font-medium">Algorithm:</span>
      <select
        value={selectedAlgorithm}
        onChange={(e) => onAlgorithmChange(e.target.value)}
        className="px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-primary focus:outline-none"
      >
        {algorithms.map(algo => (
          <option key={algo} value={algo}>
            {sortingAlgorithms[algo].name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AlgorithmSelector;