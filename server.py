from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    try:
        return send_from_directory('.', 'index.html')
    except Exception:
        return {'status': 'ok'}, 200

@app.route('/<path:path>')
def serve_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    retries = 3
    while retries > 0:
        try:
            app.run(host='0.0.0.0', port=port, debug=False)
            break
        except OSError as e:
            if retries > 1:  # Still have retries left
                print(f"Port {port} is in use, trying {port + 1}")
                port += 1
                retries -= 1
            else:
                raise e
