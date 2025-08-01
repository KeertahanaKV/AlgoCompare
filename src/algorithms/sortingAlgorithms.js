// Bubble Sort
export const bubbleSort = async (arr, updateVisualization, sleep, speed, incrementComparisons, incrementSwaps) => {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    updateVisualization(arr, { i, outerLoop: `${i}/${n-1}` }, 0);
    await sleep(speed);
    
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Mark elements being compared
      arr[j].state = 'comparing';
      arr[j + 1].state = 'comparing';
      updateVisualization(arr, { i, j, comparing: `${arr[j].value} vs ${arr[j + 1].value}` }, 1);
      await sleep(speed);
      
      incrementComparisons();
      
      if (arr[j].value > arr[j + 1].value) {
        // Mark elements being swapped
        arr[j].state = 'swapping';
        arr[j + 1].state = 'swapping';
        updateVisualization(arr, { i, j, swapping: `${arr[j].value} ↔ ${arr[j + 1].value}` }, 2);
        await sleep(speed);
        
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        incrementSwaps();
      }
      
      // Reset states
      arr[j].state = 'default';
      arr[j + 1].state = 'default';
      updateVisualization(arr, { i, j }, 3);
      await sleep(speed * 0.5);
    }
    
    // Mark the last element as sorted
    arr[n - 1 - i].state = 'sorted';
    updateVisualization(arr, { i, sorted: `Position ${n-1-i} sorted` }, 4);
    await sleep(speed);
    
    if (!swapped) break;
  }
  
  // Mark remaining elements as sorted
  for (let k = 0; k < n; k++) {
    arr[k].state = 'sorted';
  }
  updateVisualization(arr, { completed: true }, 5);
};

// Selection Sort
export const selectionSort = async (arr, updateVisualization, sleep, speed, incrementComparisons, incrementSwaps) => {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    arr[i].state = 'comparing';
    updateVisualization(arr, { i, minIdx, currentMin: arr[minIdx].value }, 0);
    await sleep(speed);
    
    for (let j = i + 1; j < n; j++) {
      arr[j].state = 'comparing';
      updateVisualization(arr, { i, j, minIdx, comparing: `${arr[j].value} vs ${arr[minIdx].value}` }, 1);
      await sleep(speed);
      
      incrementComparisons();
      
      if (arr[j].value < arr[minIdx].value) {
        if (minIdx !== i) arr[minIdx].state = 'default';
        minIdx = j;
        arr[minIdx].state = 'swapping';
        updateVisualization(arr, { i, j, minIdx, newMin: arr[minIdx].value }, 2);
      } else {
        arr[j].state = 'default';
      }
      await sleep(speed * 0.5);
    }
    
    if (minIdx !== i) {
      arr[i].state = 'swapping';
      arr[minIdx].state = 'swapping';
      updateVisualization(arr, { i, minIdx, swapping: `${arr[i].value} ↔ ${arr[minIdx].value}` }, 3);
      await sleep(speed);
      
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      incrementSwaps();
    }
    
    arr[i].state = 'sorted';
    if (minIdx !== i) arr[minIdx].state = 'default';
    updateVisualization(arr, { i, sorted: `Position ${i} sorted` }, 4);
    await sleep(speed);
  }
  
  arr[n - 1].state = 'sorted';
  updateVisualization(arr, { completed: true }, 5);
};

// Insertion Sort
export const insertionSort = async (arr, updateVisualization, sleep, speed, incrementComparisons, incrementSwaps) => {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    key.state = 'comparing';
    let j = i - 1;
    
    updateVisualization(arr, { i, j, key: key.value, sorted: `Inserting ${key.value}` }, 0);
    await sleep(speed);
    
    while (j >= 0) {
      arr[j].state = 'comparing';
      updateVisualization(arr, { i, j, comparing: `${arr[j].value} vs ${key.value}` }, 1);
      await sleep(speed);
      
      incrementComparisons();
      
      if (arr[j].value <= key.value) {
        arr[j].state = 'default';
        break;
      }
      
      arr[j].state = 'swapping';
      arr[j + 1] = arr[j];
      arr[j + 1].state = 'swapping';
      updateVisualization(arr, { i, j, shifting: `Moving ${arr[j].value}` }, 2);
      await sleep(speed);
      
      arr[j].state = 'default';
      incrementSwaps();
      j--;
    }
    
    arr[j + 1] = key;
    arr[j + 1].state = 'sorted';
    
    // Mark all elements from 0 to i as sorted
    for (let k = 0; k <= i; k++) {
      if (arr[k].state !== 'sorted') arr[k].state = 'sorted';
    }
    
    updateVisualization(arr, { i, inserted: `${key.value} inserted at position ${j + 1}` }, 3);
    await sleep(speed);
  }
  
  updateVisualization(arr, { completed: true }, 4);
};

// Merge Sort
export const mergeSort = async (arr, updateVisualization, sleep, speed, incrementComparisons, incrementSwaps) => {
  const mergeSortHelper = async (start, end) => {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    updateVisualization(arr, { 
      start, 
      mid, 
      end, 
      dividing: `Dividing [${start}..${end}] at ${mid}` 
    }, 0);
    await sleep(speed);
    
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);
    await merge(start, mid, end);
  };
  
  const merge = async (start, mid, end) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    
    // Mark merge range
    for (let idx = start; idx <= end; idx++) {
      arr[idx].state = 'comparing';
    }
    updateVisualization(arr, { 
      start, 
      mid, 
      end, 
      merging: `Merging [${start}..${mid}] and [${mid+1}..${end}]` 
    }, 1);
    await sleep(speed);
    
    while (i < left.length && j < right.length) {
      incrementComparisons();
      
      if (left[i].value <= right[j].value) {
        arr[k] = { ...left[i], state: 'swapping' };
        updateVisualization(arr, { 
          k, 
          comparing: `${left[i].value} ≤ ${right[j].value}`,
          taking: `Taking ${left[i].value} from left`
        }, 2);
        i++;
      } else {
        arr[k] = { ...right[j], state: 'swapping' };
        updateVisualization(arr, { 
          k, 
          comparing: `${left[i].value} > ${right[j].value}`,
          taking: `Taking ${right[j].value} from right`
        }, 2);
        j++;
      }
      incrementSwaps();
      await sleep(speed);
      k++;
    }
    
    while (i < left.length) {
      arr[k] = { ...left[i], state: 'swapping' };
      updateVisualization(arr, { k, remaining: `Taking remaining ${left[i].value}` }, 3);
      await sleep(speed * 0.5);
      i++;
      k++;
      incrementSwaps();
    }
    
    while (j < right.length) {
      arr[k] = { ...right[j], state: 'swapping' };
      updateVisualization(arr, { k, remaining: `Taking remaining ${right[j].value}` }, 3);
      await sleep(speed * 0.5);
      j++;
      k++;
      incrementSwaps();
    }
    
    // Mark merged section as sorted
    for (let idx = start; idx <= end; idx++) {
      arr[idx].state = 'sorted';
    }
    updateVisualization(arr, { 
      start, 
      end, 
      merged: `Merged [${start}..${end}]` 
    }, 4);
    await sleep(speed);
  };
  
  await mergeSortHelper(0, arr.length - 1);
  updateVisualization(arr, { completed: true }, 5);
};

// Quick Sort
export const quickSort = async (arr, updateVisualization, sleep, speed, incrementComparisons, incrementSwaps) => {
  const quickSortHelper = async (low, high) => {
    if (low < high) {
      updateVisualization(arr, { 
        low, 
        high, 
        sorting: `Sorting [${low}..${high}]` 
      }, 0);
      await sleep(speed);
      
      const pi = await partition(low, high);
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  };
  
  const partition = async (low, high) => {
    const pivot = arr[high];
    pivot.state = 'pivot';
    updateVisualization(arr, { 
      low, 
      high, 
      pivot: pivot.value,
      partitioning: `Pivot: ${pivot.value}` 
    }, 1);
    await sleep(speed);
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      arr[j].state = 'comparing';
      updateVisualization(arr, { 
        i: i + 1, 
        j, 
        pivot: pivot.value,
        comparing: `${arr[j].value} vs ${pivot.value}` 
      }, 2);
      await sleep(speed);
      
      incrementComparisons();
      
      if (arr[j].value < pivot.value) {
        i++;
        arr[j].state = 'swapping';
        if (i !== j) {
          arr[i].state = 'swapping';
          updateVisualization(arr, { 
            i, 
            j, 
            swapping: `${arr[i].value} ↔ ${arr[j].value}` 
          }, 3);
          await sleep(speed);
          
          [arr[i], arr[j]] = [arr[j], arr[i]];
          incrementSwaps();
        }
        arr[i].state = 'left';
      } else {
        arr[j].state = 'right';
      }
      await sleep(speed * 0.5);
    }
    
    // Place pivot in correct position
    arr[i + 1].state = 'swapping';
    arr[high].state = 'swapping';
    updateVisualization(arr, { 
      pivotPos: i + 1,
      swapping: `Placing pivot ${pivot.value} at position ${i + 1}` 
    }, 4);
    await sleep(speed);
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    incrementSwaps();
    
    // Reset states
    for (let k = low; k <= high; k++) {
      if (k === i + 1) {
        arr[k].state = 'sorted';
      } else {
        arr[k].state = 'default';
      }
    }
    
    updateVisualization(arr, { 
      pivotFinalPos: i + 1,
      placed: `Pivot ${arr[i + 1].value} placed correctly` 
    }, 5);
    await sleep(speed);
    
    return i + 1;
  };
  
  await quickSortHelper(0, arr.length - 1);
  
  // Mark all as sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = 'sorted';
  }
  updateVisualization(arr, { completed: true }, 6);
};

// Heap Sort
export const heapSort = async (arr, updateVisualization, sleep, speed, incrementComparisons, incrementSwaps) => {
  const n = arr.length;
  
  // Build max heap
  updateVisualization(arr, { phase: 'Building Max Heap' }, 0);
  await sleep(speed);
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }
  
  updateVisualization(arr, { phase: 'Heap built, starting sort' }, 1);
  await sleep(speed);
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    arr[0].state = 'swapping';
    arr[i].state = 'swapping';
    updateVisualization(arr, { 
      extracting: `Moving max ${arr[0].value} to position ${i}` 
    }, 2);
    await sleep(speed);
    
    [arr[0], arr[i]] = [arr[i], arr[0]];
    incrementSwaps();
    
    arr[i].state = 'sorted';
    arr[0].state = 'default';
    updateVisualization(arr, { 
      sorted: `${arr[i].value} placed at position ${i}`,
      heapSize: i 
    }, 3);
    await sleep(speed);
    
    // Call heapify on the reduced heap
    await heapify(i, 0);
  }
  
  arr[0].state = 'sorted';
  updateVisualization(arr, { completed: true }, 4);
  
  async function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    arr[i].state = 'comparing';
    updateVisualization(arr, { 
      i, 
      left: left < n ? left : 'none', 
      right: right < n ? right : 'none',
      heapifying: `Heapifying at index ${i}` 
    }, 5);
    await sleep(speed);
    
    if (left < n) {
      arr[left].state = 'comparing';
      updateVisualization(arr, { 
        comparing: `${arr[left].value} vs ${arr[largest].value}` 
      }, 6);
      await sleep(speed);
      
      incrementComparisons();
      if (arr[left].value > arr[largest].value) {
        largest = left;
      }
      arr[left].state = 'default';
    }
    
    if (right < n) {
      arr[right].state = 'comparing';
      updateVisualization(arr, { 
        comparing: `${arr[right].value} vs ${arr[largest].value}` 
      }, 6);
      await sleep(speed);
      
      incrementComparisons();
      if (arr[right].value > arr[largest].value) {
        largest = right;
      }
      arr[right].state = 'default';
    }
    
    if (largest !== i) {
      arr[i].state = 'swapping';
      arr[largest].state = 'swapping';
      updateVisualization(arr, { 
        swapping: `${arr[i].value} ↔ ${arr[largest].value}` 
      }, 7);
      await sleep(speed);
      
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      incrementSwaps();
      
      arr[i].state = 'default';
      arr[largest].state = 'default';
      
      await heapify(n, largest);
    } else {
      arr[i].state = 'default';
    }
  }
};

// Radix Sort
export const radixSort = async (arr, updateVisualization, sleep, speed, incrementComparisons, incrementSwaps) => {
  const getMax = () => {
    let max = arr[0].value;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].value > max) max = arr[i].value;
    }
    return max;
  };
  
  const countingSort = async (exp) => {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    updateVisualization(arr, { 
      exp, 
      digit: exp === 1 ? 'ones' : exp === 10 ? 'tens' : exp === 100 ? 'hundreds' : 'thousands',
      phase: `Sorting by ${exp === 1 ? 'ones' : exp === 10 ? 'tens' : exp === 100 ? 'hundreds' : 'thousands'} place` 
    }, 0);
    await sleep(speed);
    
    // Count occurrences
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i].value / exp) % 10;
      count[digit]++;
      arr[i].state = 'comparing';
      updateVisualization(arr, { 
        counting: `${arr[i].value} has digit ${digit} at position ${exp}`,
        digitCounts: count.slice() 
      }, 1);
      await sleep(speed * 0.5);
      arr[i].state = 'default';
    }
    
    // Calculate cumulative count
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    updateVisualization(arr, { 
      cumulativeCounts: count.slice(),
      phase: 'Building output array' 
    }, 2);
    await sleep(speed);
    
    // Build output array
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i].value / exp) % 10;
      output[count[digit] - 1] = { ...arr[i], state: 'swapping' };
      count[digit]--;
      
      updateVisualization(arr, { 
        placing: `Placing ${arr[i].value} at position ${count[digit]}`,
        digit 
      }, 3);
      await sleep(speed);
      incrementSwaps();
    }
    
    // Copy output array back to arr
    for (let i = 0; i < n; i++) {
      arr[i] = { ...output[i], state: 'sorted' };
    }
    
    updateVisualization(arr, { 
      phase: `Completed sorting by ${exp === 1 ? 'ones' : exp === 10 ? 'tens' : exp === 100 ? 'hundreds' : 'thousands'} place` 
    }, 4);
    await sleep(speed);
    
    // Reset states
    for (let i = 0; i < n; i++) {
      arr[i].state = 'default';
    }
  };
  
  const max = getMax();
  updateVisualization(arr, { 
    max, 
    phase: `Starting Radix Sort (max value: ${max})` 
  }, 5);
  await sleep(speed);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await countingSort(exp);
  }
  
  // Mark all as sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = 'sorted';
  }
  updateVisualization(arr, { completed: true }, 6);
};