![peter-parking-dancing](testing/peter-parker-dancing.png)

# Mookie - Your Day Wrapped
Is your life feeling stale? Have you ever wanted to feel like the main character in a movie? Mookie harnesses the power of vision AI to create a dynamically changing playlist that reflects your real-time environment, and provides a daily review to keep track of your life! 

> *By: Annie Yu, Pranav Varma, Anthony Ung, and Joshua Shiman*

## How does Mookie work?

Mookie leverages a Raspberry Pi Zero 2 Wifi with the Raspberry Pi Camera 3 Module to take continously take snapshots of your experiences at regular intervals throughout the day. *But what about my data privacy?* Mookie passes off those images to a locally-hosted, open source, multi-modal GenAI model to analyze attributes, feelings and the mood of your current environment. Mookie takes that as an input for a semantic search of publically sourced music datasets and maps the vibes of your situation to songs that Mookie compiles into a playlist. At the end of your day, Mookie provides a daily wrapped to digest and reflect on your day!

## How to Run - Backend

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

## How to Run - Frontend

1. Navigate to react

`cd frontend/mookie`

2. Start React server

`npm start`


## How to Run - Raspberry Pi

1. Update Raspberry Pi 

`sudo apt update`

2. Install picamera2

`sudo apt install -y python3-picamera2`

3. Install requirements

`pip3 install -r requirements.txt`

4. Edit send_image.py and modify IP Address

`url = 'http://<YOUR FLASK SERVER ADDRESS>:5000/upload'` 