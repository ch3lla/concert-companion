function binarySearch(artists, artistName) {
    let left = 0;
    let right = artists.length - 1;
  
    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      const artist = artists[middle];
  
      if (artist.name === artistName) {
        return middle; // Artist found, return its index.
      }
  
      if (artist.name < artistName) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
  
    return -1; // Artist not found.
  }

  module.exports = binarySearch;