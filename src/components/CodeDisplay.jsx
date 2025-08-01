import React from 'react';
import { Code } from 'lucide-react';
import { sortingAlgorithms } from '../utils/sortingAlgorithms';

const CodeDisplay = ({ algorithm, stepInfo }) => {
  const algorithmCode = sortingAlgorithms[algorithm]?.code || '';
  const lines = algorithmCode.split('\n');

  const getCurrentLine = () => {
    if (!stepInfo || !stepInfo.currentLine) return -1;
    return stepInfo.currentLine;
  };

  const currentLine = getCurrentLine();

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Code className="w-5 h-5 mr-2" />
        Algorithm Code
      </h3>
      
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`flex ${
                index === currentLine 
                  ? 'bg-primary/20 border-l-4 border-primary' 
                  : ''
              } ${line.trim() === '' ? 'h-5' : ''}`}
            >
              <span className="text-gray-500 mr-4 min-w-[2ch] text-right">
                {index + 1}
              </span>
              <code className={`${
                index === currentLine ? 'text-white font-semibold' : 'text-gray-300'
              }`}>
                {line}
              </code>
            </div>
          ))}
        </pre>
      </div>

      {stepInfo && stepInfo.description && (
        <div className="mt-4 p-3 bg-gray-700 rounded-lg">
          <p className="text-gray-300 text-sm">{stepInfo.description}</p>
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;