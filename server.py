
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    # Quick response for health checks
    return 'OK', 200

if __name__ == '__main__':
    # Production configuration
    app.run(host='0.0.0.0', port=5000, debug=False)
