from flask import Blueprint, render_template, url_for

views = Blueprint("views", __name__)


@views.route('/')
def index():
    return render_template('base.html')
@views.route('/view_tle')
def function_view():
    return render_template('view_tle.html')
@views.route('/add_TLE')
def function_parse():
    return render_template('add_TLE.html')