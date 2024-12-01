import requests
from typing import Optional, Dict, Any
import json
import os
from datetime import datetime

def get_currently_playing(access_token: str, output_file: str = "current_track.json") -> Optional[Dict[str, Any]]:
    """
    Fetch the currently playing track information from Spotify API and save to JSON.
    
    Args:
        access_token (str): Valid Spotify API access token
        output_file (str): Name of the JSON file to write to (default: "current_track.json")
        
    Returns:
        Optional[Dict[str, Any]]: Dictionary containing track information if something is playing,
                                 None if no track is playing or in case of error
    """
    url = "https://api.spotify.com/v1/me/player/currently-playing"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.get(url, headers=headers)
        
        # Handle different response status codes
        if response.status_code == 204:
            print("No track currently playing")
            # Write empty state to JSON
            output_data = {
                "timestamp": datetime.now().isoformat(),
                "is_playing": False,
                "track_data": None
            }
            with open(output_file, 'w') as f:
                json.dump(output_data, f, indent=2)
            return None
            
        if response.status_code != 200:
            print(f"Error fetching current track. Status code: {response.status_code}")
            print(f"Error message: {response.text}")
            return None

        # Parse the response
        track_data = response.json()
        
        # Check if we actually have a track
        if not track_data.get('item'):
            print("No track information available")
            return None

        # Extract relevant information
        current_track = {
            'name': track_data['item']['name'],
            'artists': [artist['name'] for artist in track_data['item']['artists']],
            'album': {
                'name': track_data['item']['album']['name'],
                'images': track_data['item']['album']['images']
            },
            'is_playing': track_data['is_playing'],
            'progress_ms': track_data.get('progress_ms'),
            'duration_ms': track_data['item']['duration_ms'],
            'external_urls': track_data['item']['external_urls']
        }

        # Prepare output data with timestamp
        output_data = {
            "timestamp": datetime.now().isoformat(),
            "is_playing": track_data['is_playing'],
            "track_data": current_track
        }

        # Write to JSON file
        with open(output_file, 'w') as f:
            json.dump(output_data, f, indent=2)
        print(f"Track data written to {output_file}")

        return current_track

    except requests.exceptions.RequestException as e:
        print(f"Network error occurred: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error parsing response: {e}")
        return None
    except KeyError as e:
        print(f"Unexpected response format: {e}")
        return None

if __name__ == "__main__":
    # Read the access token from file
    try:
        with open("access_token.json", "r") as f:
            token_data = json.load(f)
            access_token = token_data["access_token"]
            
        current_track = get_currently_playing(access_token)
        
        if current_track:
            print(f"Currently playing: {current_track['name']}")
            print(f"By: {', '.join(current_track['artists'])}")
            print(f"From album: {current_track['album']['name']}")
            print(f"Is playing: {current_track['is_playing']}")
            print(f"Progress: {current_track['progress_ms']}ms / {current_track['duration_ms']}ms")
        else:
            print("No track currently playing or error occurred")
            
    except FileNotFoundError:
        print("access_token.json not found")
    except json.JSONDecodeError:
        print("Error parsing access_token.json")
    except KeyError:
        print("Invalid token file format")