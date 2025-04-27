
from http.server import HTTPServer, SimpleHTTPRequestHandler
from collections import defaultdict
import time

class RateLimitedHandler(SimpleHTTPRequestHandler):
    # Store request counts per IP
    requests = defaultdict(list)
    RATE_LIMIT = 100  # requests
    TIME_WINDOW = 10  # seconds

    def do_GET(self):
        client_ip = self.client_address[0]
        current_time = time.time()
        
        # Clean old requests
        self.requests[client_ip] = [req_time for req_time in self.requests[client_ip] 
                                  if current_time - req_time < self.TIME_WINDOW]
        
        # Check rate limit
        if len(self.requests[client_ip]) >= self.RATE_LIMIT:
            self.send_error(429, "Too Many Requests")
            return
            
        # Add current request
        self.requests[client_ip].append(current_time)
        return super().do_GET()

if __name__ == '__main__':
    server_address = ('0.0.0.0', 5000)
    httpd = HTTPServer(server_address, RateLimitedHandler)
    print(f'Serving HTTP on {server_address[0]} port {server_address[1]}...')
    httpd.serve_forever()
