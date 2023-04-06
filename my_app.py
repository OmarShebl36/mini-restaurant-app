# Some of the code and comments used in this project are added with the help of ChatGPT

# Import necessary modules
import flask
import logging
import os
from restaurant_model import Restaurant 

# Setup Flask application
app = flask.Flask("my_app")
# Load restaurant data
restaurants = Restaurant.read_restaurants()

# Routes
# Route to login page
@app.route("/login")
def login():
    return flask.render_template('login.html')

# Route to home page
@app.route("/")
def homepage():
    # Generate HTML for the restaurant images
    content = ''
    try:
        with open(os.path.normcase("templates/index.html")) as file:
            content = file.read()
    except Exception as e:
        logging.error(e)
    # Replace placeholder string in index.html with the HTML for the restaurant images
    return flask.render_template('index.html', restaurants=restaurants)

# Route to restaurant page and show its menu
@app.route("/restaurant")
def restaurant():
    # Make clicked_restaurant a global variable
    global clicked_restaurant
    clicked_restaurant_id = -1
    # Initialize clicked_restaurant with default values
    clicked_restaurant = Restaurant("name", "img_src")
    # Check if "restaurant_id" parameter is in the request URL
    clicked_restaurant_id = flask.request.args.get("restaurant_id") if flask.request.args.get("restaurant_id") != None else -1
    # If a "restaurant_id" parameter is found, get the restaurant with that ID
    if clicked_restaurant_id != -1:
        for restaurant in restaurants:
            if restaurant.id == clicked_restaurant_id:
                clicked_restaurant = restaurant
                clicked_restaurant.get_menu_items()
    # Render the restaurant.html template with the menu items for the selected restaurant
    return flask.render_template('restaurant.html', items=clicked_restaurant.menu, restaurant=clicked_restaurant.name)

# Route to checkout and send the menu items of the selected restaurant
@app.route('/checkout')
def checkout():
    # Render the checkout.html template with the menu items selected from the selected restaurant
    return flask.render_template('checkout.html', items=clicked_restaurant.menu)

# Route to success page
@app.route('/success')
def success():
    return flask.render_template('success.html')

# Route to fail page
@app.route('/fail')
def fail():
    return flask.render_template('fail.html')
