import React, { useState } from 'react';
import { Shuffle, Plus, Minus, Sliders, Zap } from 'lucide-react';
import { generateArray } from '../utils/arrayUtils';

const ArrayControls = ({ array, onArrayChange, speed, onSpeedChange, disabled }) => {
  const [arraySize, setArraySize] = useState(12);
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleArrayTypeChange = (type) => {
    const newArray = generateArray(arraySize, type);
    onArrayChange(newArray);
  };

  const handleSizeChange = (newSize) => {
    setArraySize(newSize);
    const newArray = generateArray(Math.min(newSize, 20), 'random');
    onArrayChange(newArray);
  };

  const handleCustomInput = () => {
    try {
      const values = customInput
        .split(',')
        .map(v => parseInt(v.trim()))
        .filter(v => !isNaN(v) && v > 0);
      
      if (values.length > 0) {
        const limitedValues = values.slice(0, 20); // Limit to 20 elements for better visualization
        onArrayChange(limitedValues);
        setArraySize(values.length);
        setShowCustomInput(false);
        setCustomInput('');
      }
    } catch (error) {
      alert('Please enter valid numbers separated by commas');
    }
  };

  return (
    <div className="space-y-4">
      {/* Quick Start Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-white font-medium text-sm">Quick Start:</span>
        </div>
        <button
          onClick={() => {
            const quickArray = [64, 34, 25, 12, 22, 11, 90];
            onArrayChange(quickArray);
            setArraySize(quickArray.length);
          }}
          disabled={disabled}
          className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-500 disabled:opacity-50 transition-colors text-sm"
        >
          Example Array
        </button>
        <button
          onClick={() => {
            const smallArray = [5, 2, 8, 1, 9];
            onArrayChange(smallArray);
            setArraySize(smallArray.length);
          }}
          disabled={disabled}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 disabled:opacity-50 transition-colors text-sm"
        >
          Small Array
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">Array Type:</span>
          <button
            onClick={() => handleArrayTypeChange('random')}
            disabled={disabled}
            className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/80 disabled:opacity-50 transition-colors text-sm"
          >
            Random
          </button>
          <button
            onClick={() => handleArrayTypeChange('sorted')}
            disabled={disabled}
            className="px-3 py-1 bg-secondary text-white rounded hover:bg-secondary/80 disabled:opacity-50 transition-colors text-sm"
          >
            Sorted
          </button>
          <button
            onClick={() => handleArrayTypeChange('reversed')}
            disabled={disabled}
            className="px-3 py-1 bg-warning text-white rounded hover:bg-warning/80 disabled:opacity-50 transition-colors text-sm"
          >
            Reversed
          </button>
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            disabled={disabled}
            className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 disabled:opacity-50 transition-colors text-sm"
          >
            Custom
          </button>
        </div>
      </div>

      {showCustomInput && (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter up to 20 numbers (e.g., 64,34,25,12,22,11,90)"
            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-primary focus:outline-none"
          />
          <button
            onClick={handleCustomInput}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">Size:</span>
          <button
            onClick={() => handleSizeChange(Math.max(5, arraySize - 1))}
            disabled={disabled || arraySize <= 5}
            className="p-1 bg-gray-600 text-white rounded hover:bg-gray-500 disabled:opacity-50 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-white min-w-[3ch] text-center">{arraySize}</span>
          <button
            onClick={() => handleSizeChange(Math.min(20, arraySize + 1))}
            disabled={disabled || arraySize >= 20}
            className="p-1 bg-gray-600 text-white rounded hover:bg-gray-500 disabled:opacity-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-white" />
          <span className="text-white font-medium">Animation Speed:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
            disabled={disabled}
            className="w-24 accent-primary"
          />
          <span className="text-white min-w-[4ch] text-center text-sm">
            {speed <= 3 ? 'Slow' : speed <= 7 ? 'Normal' : 'Fast'}
          </span>
        </div>

        <button
          onClick={() => handleArrayTypeChange('random')}
          disabled={disabled}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 disabled:opacity-50 transition-colors"
        >
          <Shuffle className="w-4 h-4" />
          <span>Shuffle</span>
        </button>
      </div>
    </div>
  );
};

export default ArrayControls;