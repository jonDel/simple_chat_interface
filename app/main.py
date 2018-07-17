from flask import Flask, render_template
import json

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/get_botresponse")
def get_bot_response():
    return json.dumps(["Answered.", "or not..."])


if __name__ == "__main__":
    app.run(port=5005)

