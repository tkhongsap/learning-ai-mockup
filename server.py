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
    try:
        port = int(os.getenv('PORT', 5000))
    except (TypeError, ValueError):
        raise RuntimeError("PORT environment variable must be set to a valid integer")
    app.run(host='0.0.0.0', port=port, debug=False)
