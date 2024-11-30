import ollama
import base64

#TO BE DELTED 

def encode_image(image_path):
    """Encodes the image file to base64."""
    with open(image_path, 'rb') as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_image

# Path to your image
image_path = '/Users/annieyu/mookie/images/image.jpeg' 

# Encode the image to base64
encoded_image = encode_image(image_path)

# Make the request to Ollama with the encoded image
response = ollama.chat(
    model='llama3.2-vision',
    messages=[{
        'role': 'user',
        'content': 'From this image, generate me a list of songs that fit this scenery in "Song name" - Artist format, no excess text',
        'images': [encoded_image]  # Pass the base64-encoded image here
    }]
)

# Print the response
print(response)
