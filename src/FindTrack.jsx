import { useState } from 'react';
import { searchSpotify } from "./spotify_api_utils";
import Tracks from './Tracks';
import { useOutletContext } from "react-router-dom";

const FindTrack = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { addToLibraryCallback } = useOutletContext();

    const findTrack = async () => {
        const searchResults = await searchSpotify(searchQuery)
        setSearchResults(searchResults.tracks.items)
    }
    return (
    <>
        <strong>Find Tracks:</strong>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') findTrack();
          }}
        />
          <button
            aria-label="Search"
            onClick={findTrack}
            className='search-button'
          > 🔍</button>
        <br />
        {searchResults?.length>0 && <><h3>Search Results: </h3><Tracks addToLibraryCallback={addToLibraryCallback} searchResults={searchResults}/></>}
    </>
  );
};

export default FindTrack;