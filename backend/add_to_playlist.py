import webbrowser
import urllib.parse
import json
import requests
import time

# with open('client_secret.txt', 'r') as file:
#     content = file.read().strip()  
#     client_secret = content

with open('client_id.txt', 'r') as file:
    content = file.read().strip()  
    CLIENT_ID = content

# Spotify API credentials
REDIRECT_URI = "http://localhost:8888/callback"
PLAYLIST_ID = "4coH6SCKnKD56jANMCI12k"

# Authorization scopes
SCOPES = [
    "playlist-modify-public",
    "playlist-modify-private"
]

def get_cached_token():
    """Try to get a cached token if it exists and hasn't expired"""
    try:
        with open("access_token.json", "r") as f:
            token_data = json.load(f)
            
            if 'created_at' not in token_data:
                return None
                
            elapsed_time = time.time() - token_data['created_at']
            if elapsed_time >= (int(token_data['expires_in']) - 60):
                return None
                
            return token_data['access_token']
    except (FileNotFoundError, json.JSONDecodeError):
        return None

def get_implicit_auth_url():
    """Generate the authorization URL for implicit grant flow"""
    base_url = "https://accounts.spotify.com/authorize"
    params = {
        "client_id": CLIENT_ID,
        "response_type": "token",
        "redirect_uri": REDIRECT_URI,
        "scope": " ".join(SCOPES),
        "show_dialog": False
    }
    auth_url = base_url + "?" + "&".join(f"{k}={v}" for k, v in params.items())
    return auth_url

def wait_for_token():
    """Wait for the access token to be saved by the callback server"""
    max_retries = 30
    retries = 0
    while retries < max_retries:
        try:
            with open("access_token.json", "r") as f:
                token_data = json.load(f)
                return token_data["access_token"]
        except (FileNotFoundError, json.JSONDecodeError):
            time.sleep(1)
            retries += 1
    raise Exception("Timeout waiting for access token")

def get_valid_token():
    """Get a valid token, either from cache or through auth flow"""
    token = get_cached_token()
    if token:
        print("Using cached token...")
        return token
        
    print("No valid cached token found, starting auth flow...")
    auth_url = get_implicit_auth_url()
    webbrowser.open(auth_url)
    return wait_for_token()

def search_track(access_token, song_name, artist):
    """Search for a track on Spotify"""
    query = f"{song_name} artist:{artist}"
    url = "https://api.spotify.com/v1/search"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    params = {
        "q": query,
        "type": "track",
        "limit": 1
    }
    
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        data = response.json()
        if data['tracks']['items']:
            track = data['tracks']['items'][0]
            return track['uri']
        else:
            print(f"No results found for: {song_name} - {artist}")
            return None
    else:
        print(f"Search failed for {song_name}. Error:", response.text)
        return None

def add_tracks_to_playlist(access_token, track_uris):
    """Add multiple tracks to the specified playlist"""
    if not track_uris:
        print("No tracks to add.")
        return
        
    url = f"https://api.spotify.com/v1/playlists/{PLAYLIST_ID}/tracks"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    # Spotify allows up to 100 tracks per request
    for i in range(0, len(track_uris), 100):
        batch = track_uris[i:i+100]
        data = {
            "uris": batch,
            "position": 0
        }
        response = requests.post(url, headers=headers, json=data)
        
        if response.status_code == 201:
            print(f"Added batch of {len(batch)} tracks successfully!")
        else:
            print(f"Failed to add batch. Error:", response.text)

def parse_song_list(song_list):
    """Parse the song list string into pairs of song names and artists"""
    songs = song_list.split(", ")
    parsed_songs = []
    
    for song in songs:
        try:
            song_name, artist = song.split(" - ")
            parsed_songs.append((song_name.strip(), artist.strip()))
        except ValueError:
            print(f"Couldn't parse song entry: {song}")
            continue
            
    return parsed_songs

def main():
    lines = []
    with open("generated_playlist.txt", "r") as file:
        for line in file:
            lines.append(line.strip())

    song_list = ", ".join(lines)
    
    # Get a valid token (either cached or new)
    access_token = get_valid_token()
    print("got valid token")
    
    # Parse the song list
    songs = parse_song_list(song_list)
    print("parsed song list")
    
    # Search for each song and collect URIs
    track_uris = []
    for song_name, artist in songs:
        print(f"Searching for: {song_name} by {artist}")
        track_uri = search_track(access_token, song_name, artist)
        if track_uri:
            track_uris.append(track_uri)
            print(f"Found: {song_name}")
        time.sleep(0.1)  # Add a small delay to avoid rate limiting
    
    # Add all found tracks to the playlist
    add_tracks_to_playlist(access_token, track_uris)

if __name__ == "__main__":
    main()