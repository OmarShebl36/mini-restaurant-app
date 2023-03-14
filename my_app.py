import flask
from restaurant_model import Restaurant 

# Setup
app = flask.Flask("my_app")
restaurants = Restaurant.read_restaurants()

# Functions
# Create restaurant images
def create_restaurants_images():
    restaurants_images = ''
    
    # Give the restaurant images class name to work with it in JS scripts
    class_name = "restaurant_image"
    for restaurant in restaurants:
        
        # Controls the display of the images.
        # We added 1 to the id as the ids starts with 0.
        if (int(restaurant.id) + 1) % 5 == 0:
            
            # After diplaying 4 images, create a new line.
            restaurants_images += f'<img src={restaurant.img_src} class={class_name} id={restaurant.id} alt={restaurant.name} width="200" height="200" onclick=submitForm({restaurant.id})><br>'
        else:
            restaurants_images += f'<img src={restaurant.img_src} class={class_name} id={restaurant.id} alt={restaurant.name} width="200" height="200" onclick=submitForm({restaurant.id})>'
    return restaurants_images

# Routes
# Route to login page
@app.route("/login")
def login():
    return flask.render_template('login.html')

# Route to home page
@app.route("/")
def homepage():
    # Generate the restaurants clickable images
    restaurant_imgs = create_restaurants_images()
    content = ''
    try:
        with open("templates\index.html") as file:
            content = file.read()
    except:
        print("File not found")
    # Display the restaurants clickable images
    return content.replace("$$RES$$", restaurant_imgs)

# Route to restaurant page and show its menu
@app.route("/restaurant")
def restaurant():
    global clicked_restaurant
    clicked_restaurant_id = -1
    clicked_restaurant = Restaurant("name", "img_src")
    # Check the parameters for the restaurant_id parameter.
    # If found, save it. If not, do nothing.
    clicked_restaurant_id = flask.request.args.get("restaurant_id") if flask.request.args.get("restaurant_id") != None else -1

    # If the parameter is found get the restaurant by its id.
    if clicked_restaurant_id != -1:
        for restaurant in restaurants:
            if restaurant.id == clicked_restaurant_id:
                clicked_restaurant = restaurant
                clicked_restaurant.get_menu_items()

    return flask.render_template('restaurant.html', items=clicked_restaurant.menu, restaurant=clicked_restaurant.name)

# Route to checkout and send the menu items of the selected restaurant
@app.route('/checkout')
def checkout():
    return flask.render_template('checkout.html', items=clicked_restaurant.menu)

# Route to success page
@app.route('/success')
def success():
    return flask.render_template('success.html')

# Route to fail page
@app.route('/fail')
def fail():
    return flask.render_template('fail.html')