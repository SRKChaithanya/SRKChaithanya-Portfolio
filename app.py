from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SESSION_SECRET', 'dev-secret-key')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory('attached_assets', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)