from flask import Flask
from flask import render_template
from flask import request

app = Flask(__name__)


@app.route("/")
def hello():
    return render_template("app.html")


@app.route("/kerf_check", methods=["POST"])
def kerf_check():
    json = request.json
    width = json["width"]
    height = json["height"]
    thickness = json["thickness"]

    if abs(thickness) < 1:
        return "刻み幅が小さすぎます。刻み幅は1mmまでしか設定できません。", 500

    txt = generate_svg(width, height, thickness)

    return txt, 200, {"Content-Type": "image/svg+xml"}


def generate_svg(width, height, thickness):
    result = width + height + thickness
    return result
