import sys
import time
from picamzero import Camera

def take_photo():
    filepath = f"images/image.png"
    cam = Camera()
    cam.take_photo(filepath)
    print(f"Photo taken: {filepath}")

def continuous_photos():
    cam = Camera()
    while True:
        filepath = f"images/image.png"
        cam.take_photo(filepath)
        print(f"Photo taken: {filepath}")
        time.sleep(60)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python script_name.py <mode>")
        print("<mode>: 'single' for one photo or 'continuous' for photos every 60 seconds.")
        sys.exit(1)

    mode = sys.argv[1].lower()

    if mode == "single":
        filepath = "images/image.png"
        take_photo()
    elif mode == "continuous":
        continuous_photos()
    else:
        print("Invalid mode. Use 'single' or 'continuous'.")
        sys.exit(1)
