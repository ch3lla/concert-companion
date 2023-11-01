const data = [
    { _trackid: '4iQ7MimpB6qw3E88J5xbaZ', name: 'Calm Down' },
    { _trackid: '62xla8336vUnmxTWNzCfRt', name: 'BUBALU' },
    { _trackid: '7bedoPzeQopW9whBDgCvK2', name: 'Calm Down' },
    { _trackid: '3de3ASYwXvqgEzqJaMWYEQ', name: 'Charm' },
    {
      _trackid: '25Kyv5SeEenT0EETpP2hYn',
      name: 'Soweto (with Don Toliver, Rema & Tempoe)'
    },
    {
      _trackid: '1p5GikXPiCkw5T2VrSPrO1',
      name: 'Pretty Girl (with Rema)'
    },
    { _trackid: '0laK8KtKGNjOihRGAGgqpk', name: 'Soundgasm' },
    { _trackid: '6CJD4LDNULzE645JA2XHpx', name: 'Dumebi' },
    { _trackid: '0XY4BwmfawgT4NB3YTVoh6', name: 'Holiday' },
    { _trackid: '3e7FAWKNVUGQJvyUQMZ5EB', name: "Don't Leave" }
  ];
  
  // Extract all the "_trackid" values
  const trackIds = data.map(item => item._trackid);
  const encodedTrackIds = trackIds.map(trackId => encodeURIComponent(trackId));

  
  console.log("Track IDs: " + encodedTrackIds);
  