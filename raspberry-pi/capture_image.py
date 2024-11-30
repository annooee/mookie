import sys
import time
from picamera2 import Picamera2, Preview

def take_photo():
    # Set up the camera and capture an image
    picam2 = Picamera2()
    picam2.start()
    filepath = "images/image.png"
    picam2.capture_file(filepath)
    picam2.stop()
    print(f"Photo taken: {filepath}")

# DOES NOT WORK AS INTENDED
def continuous_photos():
    picam2 = Picamera2()
    picam2.start()
    while True:
        filepath = "images/image.png"
        picam2.capture_file(filepath)
        print(f"Photo taken: {filepath}")
        time.sleep(60)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python script_name.py <mode>")
        print("<mode>: 'single' for one photo or 'continuous' for photos every 60 seconds.")
        sys.exit(1)

    mode = sys.argv[1].lower()

    if mode == "single":
        take_photo()
    elif mode == "continuous":
        continuous_photos()
    else:
        print("Invalid mode. Use 'single' or 'continuous'.")
        sys.exit(1)
