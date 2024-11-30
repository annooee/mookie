import http.server
import urllib.parse
import webbrowser
import random
import string
import json

PORT = 8888
REDIRECT_URI = f"http://localhost:{PORT}/callback"

class CallbackHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/callback"):
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            
            # Updated HTML with better error handling and logging
            html = """
            <html>
            <body>
                <script>
                    try {
                        // Get the fragment from the URL
                        const hash = window.location.hash.substring(1);
                        console.log('Hash:', hash);  // For debugging
                        
                        // Parse the fragment into an object
                        const params = new URLSearchParams(hash);
                        const token_data = {
                            access_token: params.get('access_token'),
                            expires_in: params.get('expires_in'),
                            token_type: params.get('token_type')
                        };
                        
                        console.log('Token data:', token_data);  // For debugging
                        
                        // Send the token to our server
                        fetch('/save_token', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(token_data)
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        }).then(data => {
                            document.body.innerHTML = 'Authorization successful! You can close this window.';
                        }).catch(error => {
                            document.body.innerHTML = 'Error saving token: ' + error.message;
                            console.error('Error:', error);
                        });
                    } catch (error) {
                        document.body.innerHTML = 'Error processing authorization: ' + error.message;
                        console.error('Error:', error);
                    }
                </script>
                <p>Processing authorization...</p>
            </body>
            </html>
            """
            self.wfile.write(html.encode())
            
    def do_POST(self):
        if self.path.startswith("/save_token"):
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                token_data = json.loads(post_data)
                
                # Save the token to a file
                with open("access_token.json", "w") as f:
                    json.dump(token_data, f)
                
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode())

if __name__ == "__main__":
    print(f"Starting callback server at {REDIRECT_URI}")
    httpd = http.server.HTTPServer(("localhost", PORT), CallbackHandler)
    httpd.serve_forever()