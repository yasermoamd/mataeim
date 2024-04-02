from flask import render_template, Blueprint

main_bp = Blueprint("main", __name__, template_folder="templates")


@main_bp.route("/")
def index():
    return render_template("pages/index.html", page_title="Home Page")


@main_bp.route("/about")
def about():
    return render_template("pages/about.html")