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
    
    # Give the restaurant images class name to work with it in JS scripts
    class_name = "restaurant_image"
    for restaurant in constants.restaurants:
        
        # Controls the display of the images.
        # We added 1 to the id as the ids starts with 0.
        if (int(restaurant.id) + 1) % 4 == 0:
            
            # After diplaying 4 images, create a new line.
            restaurants_images += f'<img src={restaurant.img_src} class={class_name} id={restaurant.id} width="200" height="200"><br>'
        else:
            restaurants_images += f'<img src={restaurant.img_src} class={class_name} id={restaurant.id} width="200" height="200">'
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
    # Generate the restaurants clickable images
    restaurant_imgs = create_restaurants_images()
    
    global clicked_restaurant_id
    global clicked_restaurant
    clicked_restaurant_id = flask.request.args.get("restaurant_id") if flask.request.args.get("restaurant_id") != None else -1
    if clicked_restaurant_id != -1:
        print(clicked_restaurant_id)
        for restaurant in constants.restaurants:
            if restaurant.id == clicked_restaurant_id:
                clicked_restaurant = restaurant
                print(clicked_restaurant.name)
                html_content = get_html("restaurant")
                return html_content.replace("$$MENU$$", "Menu item").replace("$$REST$$", clicked_restaurant.name)
                
    return html_content.replace("$$RES$$", restaurant_imgs)

# Route to restaurant page
@app.route("/restaurant")
def restaurant():
    html_content = get_html("restaurant")
    return html_content.replace("$$MENU$$", "Menu item").replace("$$REST$$", clicked_restaurant.name)
