function mapArtistData(data) {
    return data.items.map(artist => ({
        _id: artist.id,
        name: artist.name,
        genres: artist.genres,
    }));
}

function mapArtistDetails(artist) {
    return {
        _id: artist.id,
        name: artist.name,
        genres: artist.genres,
        external_urls: artist.external_urls,
        followers: artist.followers,
        href: artist.href,
        images: artist.images,
        popularity: artist.popularity,
        type: artist.type,
        uri: artist.uri
    };
}

module.exports = {mapArtistData, mapArtistDetails};