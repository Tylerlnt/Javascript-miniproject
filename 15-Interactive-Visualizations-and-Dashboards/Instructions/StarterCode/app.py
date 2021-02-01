import json
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():

    # use render_template to serve up the index.html
    return render_template('index.html')

@app.route("/samples")
def samples():

    with open('stactic/data/samples.json') as samples_file:
        samples_json = json.load(samples_file)
    return samples_json

if __name__ == "__main__":
    app.run(debug=True)