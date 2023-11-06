function binarySearch(words, word) {
  let left = 0;
  let right = words.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const currentWord = words[middle];

    if (currentWord === word) {
      return middle; // Word found, return its index.
    }

    if (currentWord < word) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1; // Word not found.
}

// const wordArray = [
//   'apple', 'banana', 'cherry', 'date', 'elderberry',
//   'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
//   'mango', 'nectarine', 'orange', 'peach', 'quince',
//   'raspberry', 'strawberry', 'tangerine', 'watermelon', 'xylophone'
// ];

// console.log(binarySearch(wordArray, 'strawberry'));

module.exports = binarySearch;
