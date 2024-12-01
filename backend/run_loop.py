import time
from langchain_integration import ImageToPlaylistChain  # Assuming langchain_integration.py is the name of the file with the class
from capture_send import trigger_capture_and_send  # Import the function to trigger capture and send

image_path = '../images/image.png'  # This is the static path for the image

def main_loop():
    for i in range(3):
        print(f"Running iteration {i + 1}...")

        # Trigger the image capture and send process
        trigger_capture_and_send()

        # Create an instance of the ImageToPlaylistChain class and run the main method
        chain = ImageToPlaylistChain(image_path)
        chain.main()

        print(f"Iteration {i + 1} completed.\n")
        
        # Add a small delay between each iteration to avoid overwhelming the system or API rate limits
        time.sleep(5)  # You can adjust the sleep time as needed

if __name__ == "__main__":
    main_loop()
