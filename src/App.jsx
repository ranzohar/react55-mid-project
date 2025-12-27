import './App.css'
import {Routes, Route} from 'react-router'
import Library from "./Library";
import ArtistPage from "./ArtistPage";
import HomeButton from "./HomeButton";
import FindTrack from "./FindTrack";
import { useState } from 'react';


function App() {
  const [libraryTracks, setLibraryTracks] = useState([]);
  const addToLibraryCallback = (trackToAdd) => {
      if ((libraryTracks.findIndex((libraryTrack) => libraryTrack.id == trackToAdd.id)) === -1) {
          setLibraryTracks([...libraryTracks, trackToAdd])
      }
  }
  const removeFromLibraryCallback = (trackId) => {
      setLibraryTracks(libraryTracks.filter((track) => track.id != trackId))
  }

  return (
    <>
    <Routes>
      <Route
          path="/"
          element={
            <Library
              libraryTracks={libraryTracks}
              removeFromLibraryCallback={removeFromLibraryCallback}
              addToLibraryCallback={addToLibraryCallback}
            />
          }
        >
          <Route index element={<FindTrack/>} />
          <Route element={<HomeButton/>}>
            <Route path=":id" element={<ArtistPage/>} />
          </Route>
        </Route>
    </Routes>
    </>
  )
}

export default App
