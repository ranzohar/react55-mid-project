import Track from "./Track";


const Tracks = ({ addToLibraryCallback, searchResults }) => {
  return (
    <div className="spotify-tracks-container">
      {searchResults.map((searchResult, index) => {
        const id = searchResult?.id;
        const name = searchResult?.name;
        const images = searchResult?.images || searchResult?.album?.images;
        const artist = searchResult?.artists?.[0].name;

        return (
          <div
            key={index}
            className="flex-row-center"
          >
            <Track id={id} name={name} images={images} artist={artist} />
            <button
              onClick={() => addToLibraryCallback({ id, name, images, artist })}
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Tracks;
