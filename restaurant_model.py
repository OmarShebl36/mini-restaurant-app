import csv
import logging
import os
from menu_item_model import MenuItem

# Setup
class Restaurant:
    
    def __init__(self, name, img_src, id=0, menu=[]):
        self.name = name
        self.img_src = img_src
        self.id = id
        self.menu = menu

    # Read restaurants from the csv file
    # This code is written with the help of the documentation
    @staticmethod
    def read_restaurants():
        """
        Reads restaurants from the csv file.
        Returns A list of Restaurant objects.
        """
        with open(os.path.abspath("static\\csv_files\\restaurants.csv"), newline='') as f:
            reader = csv.DictReader(f)
            restaurants = []
            for row in reader:
                restaurants.append(
                    Restaurant(
                        row['name'],
                        row['img_src'],
                        row['id'],
                        )
                    )
            return restaurants
    
    # Get the restaurant's menu items
    def get_menu_items(self):
        """
        Reads the menu items from the csv file and adds the menu items
        to the restaurant's menu list.
        """
        self.menu.clear()
        with open(os.path.abspath("static\\csv_files\\menu_items.csv"), newline='') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row['restaurant_name'] == self.name:
                    self.menu.append(
                        MenuItem(
                            name=row['name'],
                            price=row['price'],
                            restaurant_name=row['restaurant_name'],
                            id=row['id'],
                            )
                        )
     
# Add the object to the restaurant csv file 
# This code is written with the help of the documentation and ChatGPT  
def add_to_file(restaurant):
    # Adds a restaurant object to the restaurants.csv file.
    field_names = ["name", "img_src", "id", "menu"]
    # Check if the restaurant is already in the file
    try:
        with open(os.path.abspath("static\\csv_files\\restaurants.csv"), 'r', newline='') as f:
            csv_reader = csv.DictReader(f, fieldnames=field_names)
            for row in csv_reader:
                if row['name'] == restaurant.name:
                    # If restaurant is already in file, do not add again
                    return 
    except Exception as e:
        logging.error(e)

    # Add the restaurant to the file
    with open(os.path.abspath("static\\csv_files\\restaurants.csv"), 'a', newline='') as f:
        csv_writer = csv.DictWriter(f, fieldnames=field_names)
        csv_writer.writerow(
        {
            'name' : restaurant.name,
            'img_src' : restaurant.img_src,
            'id'   : restaurant.id,
            'menu' : restaurant.menu # This will be empty until get_menu_items() is called
        })

# Create a restaurant
def add_new_restaurant(name, img_src):
    # Creates a new restaurant object and adds it to the csv file using add_to_file()
    restaurants = Restaurant.read_restaurants()
     # Sets id to be the next integer after the number of existing restaurants
    id = len(restaurants) 
    new_restaurant = Restaurant(name=name, img_src=img_src)
    new_restaurant.id = id
    # Adds the restaurant to the csv file
    add_to_file(new_restaurant)
