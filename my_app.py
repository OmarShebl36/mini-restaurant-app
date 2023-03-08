import flask

# Setup
app = flask.Flask("my_app")

# Functions
# Get the content of the webpage
def get_html(page_name):
    html_file = open(page_name + ".html")
    content = html_file.read()
    html_file.close()
    return content

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
    return html_content.replace("$$RES$$", "restaurant_imgs")
