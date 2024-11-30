import base64
import ollama
#from langchain.prompts import PromptTemplate
from langchain.llms import Ollama
from langchain.chains import LLMChain

class ImageToPlaylistChain:
    def __init__(self, image_path):
        self.image_path = image_path
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
                'content': 'From this image, generate me a list of songs that fit this scenery in "Song name" - Artist format, no excess text',
                'images': [encoded_image]  # Pass the base64-encoded image here
            }]
        )

        print(response)

        # Extract the text response from Ollama (this will be a list of songs)
        response_text = response.get("text", "")
        print("RESPONSE TEXT: ", response_text)

        # Parse the response into a list of songs
        songs_list = [song.strip() for song in response_text.split('\n') if song.strip()]
        print("SONGS LIST: ",songs_list)
        
        return songs_list

# Example usage:
image_path = '/Users/annieyu/mookie/images/image.jpeg'  # Path to your image
chain = ImageToPlaylistChain(image_path)
print(chain)

# Generate playlist and print the result
songs = chain.generate_playlist()
print(songs)
print("Generated Playlist:")
for song in songs:
    print(song)
