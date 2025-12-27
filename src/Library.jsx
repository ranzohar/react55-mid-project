import { Outlet } from "react-router-dom";
import Track from "./Track";


const Library = ({ libraryTracks, removeFromLibraryCallback, addToLibraryCallback }) => {
  return (
    <div className="main-page">
      <div className="library">
        <h3 style={{ width: "100%" }}>Library:</h3>

        {libraryTracks?.map((libraryTrack, index) => (
          <div
            key={index}
            className="flex-row-center"
          >
            <Track {...libraryTrack} />
            <button
              onClick={() => removeFromLibraryCallback(libraryTrack.id)}
            >
              -
            </button>
          </div>
        ))}
      </div>

      <div className="dashboard">
        <Outlet context={{ addToLibraryCallback }} />
      </div>
    </div>
  );
};

export default Library;
