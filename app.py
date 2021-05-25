from flask import Flask, render_template, jsonify, request
from api import Api


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/count', methods=["POST"])
def add_number():
    json_data = request.json
    api = Api.sqrt(int(json_data))
    return jsonify(api)


if __name__ == '__main__':
    app.run(debug=True)
