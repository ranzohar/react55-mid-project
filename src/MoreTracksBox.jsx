const MoreTracksBox = ({ tracks, artist }) => {
  return (
    <div className="more-tracks-container">
      <h3 className="more-tracks-header">
        More Tracks by {artist} (suggested by AI):
      </h3>
      <ul className="more-tracks-list">
        {tracks.map((track, index) => (
          <li key={index}>{track}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoreTracksBox;
