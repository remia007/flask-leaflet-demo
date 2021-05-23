from flask import Flask, render_template, jsonify

app = Flask(__name__)

BASECOORDS = [-13.9626, 33.7741]

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/plot', methods=['POST'])
# def plot():

if __name__ == '__main__':
    app.run(debug=True)
