from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SESSION_SECRET', 'dev-secret-key')

@app.route('/')
def index():
    return render_template('index.html')
  
if __name__ == '__main__':
    app.run()
