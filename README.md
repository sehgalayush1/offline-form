# offline-form
A simple form app along with the feature of background synchronisation based on flask.


This is a simple form submission app based on Flask. The main feature of this app is the background synchronisation. So if a user submitts the form but due to less or no connectivity the form is not submitted, then the form data will be synchronised by the server even if the user closes the browser. So if there is no connection, the data will be stored in the browser database and will be synchronised later when there is a connection. 

I have used SERVICE WORKERS and INDEXEDDB for the client side of this application.

To run the app, create a virtual environment and enter the following code:
		
		pip install -r requirements.txt

Then open the python shell and write:

		from app import init_db
		init_db()

And to run the app, write the code:

		python app.py