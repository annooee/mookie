import base64
import os
import ollama
#from langchain.prompts import PromptTemplate
from langchain.llms import Ollama
from langchain.chains import LLMChain
from send_image import send_image
from add_to_playlist import main

image_path = '../images/image.jpeg' # this is static

class ImageToPlaylistChain:
    def __init__(self, send_image):
        self.image_path = send_image
        self.llm = Ollama()  # Initialize Ollama

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
            model='llama3.2-vision',
            messages=[{
                'role': 'user',
                'content': 'From this image, generate me a list of 5 songs that fit this scenery in "Song name" - Artist format. Just a list, no additional text, no *',
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
        backend_folder = os.path.join(os.getcwd(), 'backend')
        
        # Ensure the backend folder exists
        os.makedirs(backend_folder, exist_ok=True)
        
        # Full file path to save the playlist text
        file_path = os.path.join(backend_folder, file_name)
        
        # Write the songs to the file
        with open(file_path, 'w') as f:
            for song in songs:
                f.write(f"{song}\n")
        
        print(f"Playlist has been written to {file_path}")


# # Example usage:
# chain = ImageToPlaylistChain(image_path)
# songs = chain.generate_playlist()
# print(songs)

# # TXT File
# file_name = "generated_playlist.txt"
# chain.save_playlist_to_txt(songs, file_name)
# # print("Generated Playlist:")
# # for song in songs:
# #     print(song)

chain = ImageToPlaylistChain(image_path)
songs = chain.generate_playlist()
print(songs)