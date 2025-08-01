export const generateArray = (size, type) => {
  let array = [];
  
  switch (type) {
    case 'random':
      array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
      break;
    case 'sorted':
      array = Array.from({ length: size }, (_, i) => i + 1);
      break;
    case 'reversed':
      array = Array.from({ length: size }, (_, i) => size - i);
      break;
    case 'nearly-sorted':
      array = Array.from({ length: size }, (_, i) => i + 1);
      // Randomly swap a few elements to make it nearly sorted
      for (let i = 0; i < Math.floor(size * 0.1); i++) {
        const idx1 = Math.floor(Math.random() * size);
        const idx2 = Math.floor(Math.random() * size);
        [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
      }
      break;
    default:
      array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  }
  
  return array;
};

export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const isSorted = (array) => {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
};