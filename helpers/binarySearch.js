function binarySearch(artists, performingArtist) {
  let left = 0;
  let right = artists.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const currentArtist = artists[middle];

    if (currentArtist === performingArtist) {
      return middle; // Artist found, return its index.
    }

    if (currentArtist < performingArtist) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1; // Artist not found.
}

module.exports = binarySearch;
