import requests
from typing import Optional, Dict, Any
import json
import os
from datetime import datetime

def get_queue(access_token: str, output_file: str = "next_in_queue.json") -> Optional[Dict[str, Any]]:
    """
    Fetch the queue information from Spotify API and save the next track to JSON.
    
    Args:
        access_token (str): Valid Spotify API access token
        output_file (str): Name of the JSON file to write to (default: "next_in_queue.json")
        
    Returns:
        Optional[Dict[str, Any]]: Dictionary containing next track information if available,
                                 None if queue is empty or in case of error
    """
    url = "https://api.spotify.com/v1/me/player/queue"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.get(url, headers=headers)
        
        # Handle different response status codes
        if response.status_code != 200:
            print(f"Error fetching queue. Status code: {response.status_code}")
            print(f"Error message: {response.text}")
            return None

        # Parse the response
        queue_data = response.json()
        
        # Check if we have any tracks in the queue
        if not queue_data.get('queue') or len(queue_data['queue']) == 0:
            print("Queue is empty")
            # Write empty state to JSON
            output_data = {
                "timestamp": datetime.now().isoformat(),
                "has_next_track": False,
                "track_data": None
            }
            with open(output_file, 'w') as f:
                json.dump(output_data, f, indent=2)
            return None

        # Get the next track (first item in queue)
        next_track = queue_data['queue'][0]
        
        # Extract relevant information (matching the format from get_currently_playing)
        track_info = {
            'name': next_track['name'],
            'artists': [artist['name'] for artist in next_track['artists']],
            'album': {
                'name': next_track['album']['name'],
                'images': next_track['album']['images']
            },
            'is_playing': False,  # Since it's next in queue, not currently playing
            'duration_ms': next_track['duration_ms'],
            'external_urls': next_track['external_urls']
        }

        # Prepare output data with timestamp
        output_data = {
            "timestamp": datetime.now().isoformat(),
            "has_next_track": True,
            "track_data": track_info
        }

        # Write to JSON file
        with open(output_file, 'w') as f:
            json.dump(output_data, f, indent=2)
        print(f"Next track data written to {output_file}")

        return track_info

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
            
        next_track = get_queue(access_token)
        
        if next_track:
            print(f"Next in queue: {next_track['name']}")
            print(f"By: {', '.join(next_track['artists'])}")
            print(f"From album: {next_track['album']['name']}")
            print(f"Duration: {next_track['duration_ms']}ms")
        else:
            print("No tracks in queue or error occurred")
            
    except FileNotFoundError:
        print("access_token.json not found")
    except json.JSONDecodeError:
        print("Error parsing access_token.json")
    except KeyError:
        print("Invalid token file format")