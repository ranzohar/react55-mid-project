import { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { getSuggestionsFromAIForArtist } from './open_ai_utils';
import { getTopTracksByArtistName } from './spotify_api_utils'
import Tracks from './Tracks';
import { useLocation } from 'react-router-dom';
import MoreTracksBox from './MoreTracksBox';
import { useParams } from "react-router-dom";

const ArtistPage = () => {
  const { id } = useParams();
  const { addToLibraryCallback } = useOutletContext();
  const [searchResults, setSearchResults] = useState([]);
  const [openAiSuggestionResults, setOpenAiSuggestionResults] = useState([]);
  const { state } = useLocation();
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [seeSuggestionsInteadOfImage, setSeeSuggestionsInteadOfImage] = useState(false);

    useEffect(() => {
    if (!state?.artistName) return;

    const fetchTracks = async () => {
        const spotifyResults = await getTopTracksByArtistName(state?.artistName, 10, id);
        const aiResults = await getSuggestionsFromAIForArtist(state?.artistName);
        setSearchResults(spotifyResults);
        setOpenAiSuggestionResults(aiResults);
    };

    fetchTracks();
    }, [state?.artistName]);

    const handlePlay = async () => {

    }
  return (
    <>
      <div onClick={() => setSeeSuggestionsInteadOfImage(!seeSuggestionsInteadOfImage)}>
        {!seeSuggestionsInteadOfImage && (
          <div
            className="track-container"
            onMouseOver={() => setShowAiSuggestions(true)}
            onMouseLeave={() => setShowAiSuggestions(false)}
          >
            <img src={state?.images[1].url} className="track-image" />
            <div className="suggestion-popup">
              {showAiSuggestions && (
                <MoreTracksBox tracks={openAiSuggestionResults} artist={state?.artistName} />
              )}
            </div>
          </div>
          
        )}
        {seeSuggestionsInteadOfImage && (
          <MoreTracksBox tracks={openAiSuggestionResults} artist={state?.artistName} />
        )}
      </div>

      Name: {state?.trackName}
      <br />
      Artist: {state?.artistName}
      <button
        className="play-button"
        onClick={handlePlay}
        aria-label="Play track"
      >
        ▶
      </button>

      {searchResults?.length>0 && <>
          <h3>More Tracks by {state?.artistName}:
          </h3><Tracks addToLibraryCallback={addToLibraryCallback} searchResults={searchResults}/>
      </>}
    </>
  );
};

export default ArtistPage;