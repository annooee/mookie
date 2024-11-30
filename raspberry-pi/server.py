from flask import Flask, jsonify
import subprocess
import time

app = Flask(__name__)

@app.route('/capture_and_send', methods=['GET'])
def capture_and_send():
    try:
        # Run capture_image.py to take a photo
        subprocess.run(['python3', 'capture_image.py', 'single'], check=True)
        
        # Wait for a moment to ensure the file is saved
        time.sleep(2)  

        # Run send_image.py to send the photo
        subprocess.run(['python3', 'send_image.py', 'images/image.png'], check=True)
        
        return jsonify({"status": "success", "message": "Image captured and sent!"})
    except subprocess.CalledProcessError as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
