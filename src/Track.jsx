import { Link } from "react-router-dom";

const Track = ({ id, name, images, artist }) => {
  const imageUrl = images?.[2]?.url;
  const imageSize = images?.[2]?.width;

  return (
    <Link
      to={`/${id}`}
      state={{ trackName: name, artistName: artist, images }}
      className="track-link"
    >
      <img
        src={imageUrl}
        alt={name}
        className="track-image"
        style={{ width: imageSize, height: imageSize }}
      />

      <div className="track-info">
        <strong className="track-name">{name}</strong>
        <span className="track-artist">{artist?.name || artist}</span>
      </div>
    </Link>
  );
};

export default Track;
