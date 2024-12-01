import base64
import os
import ollama
#from langchain.prompts import PromptTemplate
from langchain.llms import Ollama
from langchain.chains import LLMChain
from send_image import send_image
from add_to_playlist import main
from get_currently_playing import get_currently_playing
import json


image_path = '../images/image.png' # this is static
prompt = (open('prompt.txt', 'r')).read()

# Load the access token from file
with open("access_token.json", "r") as f:
    token_data = json.load(f)
    access_token = token_data.get("access_token")


class ImageToPlaylistChain:
    def __init__(self, send_image, access_token):
        self.image_path = send_image
        self.llm = Ollama()  # Initialize Ollama
        self.access_token = access_token  # Store the access token

    def encode_image(self):
        """Encodes the image file to base64."""
        with open(self.image_path, 'rb') as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
        return encoded_image

    # def generate_prompt(self):
    #     """Generates the prompt to send to Ollama."""
    #     return self.prompt_template

    def generate_playlist(self):
        """Uses Ollama to generate a playlist based on the image."""
        # Encode the image to base64
        encoded_image = self.encode_image()

        # Generate the prompt
        #prompt = self.generate_prompt()

        # Correct usage of Ollama's `generate()` method with `model` and `messages`
        response = ollama.chat(
            #model="llama3.2-vision",
            model="llava",
            messages=[{
                'role': 'user',
                'content': prompt,
                'images': [encoded_image]  # Pass the base64-encoded image here
            }]
        )

        #print(response) debugging lol

        # Check if the response contains the 'assistant' message and extract content
        if response.get('message', {}).get('role') == 'assistant':
            response_text = response['message'].get('content', '')
        else:
            print("Error: No 'assistant' message found.")
            return []

        # Parse the response into a list of songs
        songs_list = [song.strip() for song in response_text.split('\n') if song.strip()]

        self.save_playlist_to_txt(songs_list, "generated_playlist.txt")
        main()
        
        return songs_list
    
    def save_playlist_to_txt(self, songs, file_name):
        """Saves the generated playlist to a text file in the backend folder."""
        # Define the path for the file to be saved inside the 'backend' folder
        #backend_folder = os.path.join()
        
        # Ensure the backend folder exists
        #os.makedirs(backend_folder, exist_ok=True)
        
        # Full file path to save the playlist text
        file_path = './generated_playlist.txt'
        
        # Write the songs to the file
        with open(file_path, 'w') as f:
            for song in songs:
                f.write(f"{song}\n")
        
        print(f"Playlist has been written to {file_path}")
        
    
    def get_and_process_current_track(self):
        """Call this function to process the current track based on the access token."""
        # Fetch the current track using the access token
        current_track = get_currently_playing(self.access_token)  # Call the function from get_currently_playing.py
        
        
        # if current_track:
        #     track_info = {
        #         "song": current_track['name'],
        #         "artist": ", ".join(current_track['artists']),
        #         "album": current_track['album']['name'],
        #         "is_playing": current_track['is_playing']
        #     }
        #     print(track_info)
        #     return track_info
        # else:
        #     print("No track currently playing or error occurred.")
        #     return None
        

    def main(self):
        """Puts everything together and calls the generate_playlist method."""
        songs = self.generate_playlist()
        print("Generated Playlist:")
        for song in songs:
            print(song)

        # Now process the current track
        track_info = self.get_and_process_current_track()
        if track_info:
            print(f"Currently playing track: {track_info}")


# # Example usage:
# chain = ImageToPlaylistChain(image_path, access_token)
# songs = chain.generate_playlist()
# #bro = chain.get_and_process_current_track()
# print(songs)

chain = ImageToPlaylistChain(image_path, access_token)  # Pass the access_token
chain.main()  # Call the main method on the chain instance