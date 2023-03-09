import flask
import constants

# Setup
app = flask.Flask("my_app")

# Functions
# Get the content of the webpage
def get_html(page_name):
    html_file = open(page_name + ".html")
    content = html_file.read()
    html_file.close()
    return content

# Create restaurant images
def create_restaurants_images():
    restaurants_images = ''
    class_name = "restaurant_image"
    for restaurant in constants.restaurants:
        print(restaurant.id)
        if (int(restaurant.id) + 1) % 4 == 0:
            restaurants_images += f"<img src={restaurant.img_src} class={class_name} id={restaurant.id}><br>"
        else:
            restaurants_images += f"<img src={restaurant.img_src} class={class_name} id={restaurant.id}>"
    return restaurants_images

# Routes
# Route to login page
@app.route("/login")
def login():
    html_content = get_html("login")
    return html_content

# Route to home page
@app.route("/")
def homepage():
    html_content = get_html("index")
    restaurant_imgs = create_restaurants_images()
    return html_content.replace("$$RES$$", restaurant_imgs)

# Route to restaurant page
@app.route("/<restaurant_name>")
def restaurant(restaurant_name):
    html_content = get_html("restaurant")
    return flask.render_template("restaurant.html", restaurant_name=restaurant_name)
