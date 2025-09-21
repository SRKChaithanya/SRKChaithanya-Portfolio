from flask import Flask, render_template
import os

app = Flask(__name__,
           template_folder='../templates',
           static_folder='../static')
app.secret_key = os.environ.get('SESSION_SECRET', 'dev-secret-key')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/resume/<filename>')
def serve_resume(filename):
    """Serve resume PDF files from the public directory"""
    try:
        return send_from_directory('../public', filename, as_attachment=False)
    except FileNotFoundError:
        return "Resume file not found", 404
  
if __name__ == '__main__':
    app.run()
