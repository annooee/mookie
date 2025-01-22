![mookie](mookie.jpg)

# Mookie - The Soundtrack of your Life
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

1. Navigate to Frontend

`cd frontend/mookie`

2. Build Node server

`npm build`

3. Start Node server

`npm start`


## How to Run - Raspberry Pi
Images are taken and named image.png

1. SSH into raspberry pi

`ssh root@dietpi` or `ssh root@<RASPBERRY PI IP ADDRESS>`

2. Update Raspberry Pi 

`sudo apt update`

3. Install picamera2

`sudo apt install -y python3-picamera2`

4. Install requirements

`pip3 install -r requirements.txt`

5. Edit send_image.py and modify `url` to point to your Flask server IP Address

`url = 'http://<YOUR FLASK SERVER ADDRESS>:5000/upload'` 

6. Navigate to directory and start server

`cd mookie/raspberry-pi/`

`python3 server.py`

6. From langchain/any client device, send a request to raspberry pi to trigger image capture and upload

`curl http://dietpi:8080/capture_and_send`
