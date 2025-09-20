from flask import Flask, render_template
import os

app = Flask(__name__,
           template_folder='../templates',
           static_folder='../static')
app.secret_key = os.environ.get('SESSION_SECRET', 'dev-secret-key')

@app.route('/')
def index():
    return render_template('index.html')
  
if __name__ == '__main__':
    app.run()
