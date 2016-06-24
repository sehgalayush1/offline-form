import sqlite3
import os
from flask import Flask, request, session, g, redirect, url_for, render_template, flash
from contextlib import closing

basedir = os.path.abspath(os.path.dirname(__file__))

DATABASE = os.path.join(basedir, 'app.db')
DEBUG = True
SECRET_KEY = 'all_men_must_die'


app = Flask(__name__)
app.config.from_object(__name__)


def connect_db():
	return sqlite3.connect(app.config['DATABASE'])


def init_db():
	with closing(connect_db()) as db:
		with app.open_resource('schema.sql', mode='r') as f:
			db.cursor().executescript(f.read())
		db.commit()


@app.before_request
def before_request():
    g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()

@app.route('/', methods=['GET', 'POST'])
def index():
	if request.method == 'POST':
		g.db.execute(
			'insert into entries (email, password, twitter, facebook, google, fname, lname, phone, address) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[
				request.form['email'], request.form['pass'], request.form['twitter'], request.form['facebook'], request.form['gplus'], request.form['fname'], request.form['lname'], request.form['phone'], request.form['address']
			]
		)
		g.db.commit()
		flash('New entry was posted!')
	return render_template('index.html')



if __name__ == '__main__':
	app.run(debug=True)
