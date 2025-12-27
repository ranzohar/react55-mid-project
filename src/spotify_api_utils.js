import axios from 'axios';


const CLIENT_ID = CLIENT_ID//add client id;
const CLIENT_SECRET = CLIENT_SECRET//add client secret id;
const authHeader = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

async function getAccessToken() {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    {
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

    return response.data.access_token;
}

async function searchSpotify(query) {
  const token = await getAccessToken()

  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: query,
        type: 'track',
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error searching Spotify:', error.response?.data || error.message);
  }
}

async function getTopTracksByArtistName(artistName, limit, currentTrackId) {
  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };

  const res = await axios.get(
    'https://api.spotify.com/v1/search',
    {
      headers,
      params: {
        q: `artist:${artistName}`,
        type: 'track',
      }
    }
  );

  return res.data.tracks.items
    .filter(track => track.id !== currentTrackId)
    .map(track => ({
      id: track.id,
      name: track.name,
      images: track.album.images,
      artists: track.artists
    }))
    .slice(0, limit);
}

async function getActiveDeviceId() {
  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };

  const res = await axios.get("https://api.spotify.com/v1/me/player/devices", { headers });
  const devices = res.data.devices;

  // Find the first active device
  const activeDevice = devices.find(d => d.is_active);

  if (activeDevice) {
    return activeDevice.id;
  }

  // If no active device, optionally use the first available device
  if (devices.length > 0) {
    return devices[0].id;
  }

  throw new Error("No available Spotify devices found. Please open Spotify on a device.");
}

export {getAccessToken, searchSpotify, getTopTracksByArtistName}