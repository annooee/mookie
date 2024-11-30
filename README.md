# Mookie - Your Day Wrapped
Ever wanted to feel like the main character in a movie? Mookie creates a bespoke dynamically changing playlist that reflects your current moment, and provides a daily review to keep track of your life! 

## How to Run - Server

1. Clone repository

`git clone https://github.com/annooee/mookie`

2. Active virtual environment

`python3 -m venv .venv`

`source .venv/bin/activate`

3. Install requirements

`pip3 install -r requirements.txt` 

4. Run flask server

`python3 app.py`

5. Send image from client to flask server

`python3 send_image.py <your file path here>`

`ex. python3 send_image.py /Users/jshiman/Desktop/annie.png`


## How to Run - Raspberry Pi

1. Update Raspberry Pi 

`sudo apt update`

2. Install picamzero

`sudo apt install python3-picamzero`