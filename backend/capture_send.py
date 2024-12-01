import subprocess

def trigger_capture_and_send():
    # Define the curl command
    url = "http://10.0.0.193:8080/capture_and_send"
    command = ["curl", url]

    try:
        # Execute the curl command
        result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # Check the result of the command
        print("Success:", result.stdout.decode('utf-8'))

    except subprocess.CalledProcessError as e:
        print("Error:", e.stderr.decode('utf-8'))

if __name__ == '__main__':
    trigger_capture_and_send()