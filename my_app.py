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
            restaurants_images += f'<img src={restaurant.img_src} class={class_name} id={restaurant.id} alt={restaurant.name} width="200" height="200" onclick=submitForm({restaurant.id})><br>'
        else:
            restaurants_images += f'<img src={restaurant.img_src} class={class_name} id={restaurant.id} alt={restaurant.name} width="200" height="200" onclick=submitForm({restaurant.id})>'
    return restaurants_images

# Create menu items
def create_menu_items(restaurant):
    menu_items_html = ''
    for item in restaurant.menu:
        menu_items_html += f"""
        <div class="menu-item" id="{str(item.id)}" 
            <h3 class="item_title">{item.name}</h3>
            <h3 class="item_price">{str(item.price)} EGP</h3>
            <button class="minus_button" onclick=minus({str(item.id)})>-</button>
            <h1 class="item_counter">{str(item.selected_counter)}</h1>
            <button class="plus_button" onclick=plus({str(item.id)})>+</button>
        </div><br>"""
    
    return menu_items_html

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
    # Display the restaurants clickable images
    return html_content.replace("$$RES$$", restaurant_imgs)

# Route to restaurant page
@app.route("/restaurant")
def restaurant():
    html_content = get_html("restaurant")
    clicked_restaurant_id = -1
    clicked_restaurant = constants.restaurant_model.Restaurant("name", "img_src")
    # Check the parameters for the restaurant_id parameter.
    # If found, save it. If not, do nothing.
    clicked_restaurant_id = flask.request.args.get("restaurant_id") if flask.request.args.get("restaurant_id") != None else -1

    # If the parameter is found get the restaurant by its id.
    if clicked_restaurant_id != -1:
        for restaurant in constants.restaurants:
            if restaurant.id == clicked_restaurant_id:
                clicked_restaurant = restaurant
                menu_items_cards = create_menu_items(clicked_restaurant)

    # Display the restaurants content.
    return html_content.replace("$$MENU$$", menu_items_cards).replace("$$REST$$", clicked_restaurant.name)
