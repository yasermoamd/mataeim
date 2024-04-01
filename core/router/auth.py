from flask import render_template, Blueprint

auth_bp = Blueprint("auth", __name__, template_folder="templates")


@auth_bp.route("/", methods=["POST"])
def login(self):
    return render_template("pages/authentic.html")


@auth_bp.route("/", methods=["POST"])
def signup(self):
    return render_template("pages/authentic.html")
