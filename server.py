
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    # Quick response for health checks
    return 'OK', 200

@app.route('/<path:path>')
def serve_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    # Production configuration
    app.run(host='0.0.0.0', port=5000, debug=False)
