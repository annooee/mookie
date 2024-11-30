import requests
import sys

def send_image(file_path):
    url = 'http://127.0.0.1:5000/upload'  # Flask server URL

    # Open the file in binary mode and send the request
    with open(file_path, 'rb') as image_file:
        files = {'image': image_file}
        response = requests.post(url, files=files)

    print(response.json())

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python client.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]
    send_image(file_path)
