import csv

# Setup
class Restaurant:
    def __init__(self, name, img_src, id, menu,):
        self.name = name
        self.img_src = img_src
        self.id = id
        self.menu = Menu_item()

    # Read restaurants from the csv file
    # This code is written with the help of the documentation
    @staticmethod
    def read_restaurants():
        with open("static/csv_files/restaurants.csv", newline='') as f:
            reader = csv.DictReader(f)
            restaurants = []
            for row in reader:
                restaurants.append(
                    Restaurant(
                        row['name'],
                        row['img_src'],
                        row['id'],
                        row['menu'],
                        )
                    )
            return restaurants
    
    # Get the restaurant's menu items
    def get_menu_items(self):
        with open("static/csv_files/menu_items.csv", newline='') as f:
            reader = csv.DictReader(f)
            menu_items = []
            for row in reader:
                menu_items.append(
                    Menu_item(
                        row['name'],
                        row['img_src'],
                        row['id'],
                        row['menu'],
                        )
                    )
            return restaurants
     
# Add the object to the restaurant csv file   
def add_to_file(restaurant):
        with open("static/csv_files/restaurants.csv", 'a', newline='') as f:
            field_names = [name, img_src, id, menu]
            csv_writer = csv.DictWriter(f, fieldnames=field_names)
            csv_writer.writeheader()
            csv_writer.writerow(
                {'name' : restaurant.name},
                {'img_src' : restaurant.img_src},
                {'id'   : restaurant.id},
                {'menu' : restaurant.menu}
                )
            
# Creare a restaurant
def add_new_restaurant(name, img_src, menu):
    restaurants = read_restaurants()
    id = len(restaurants)
    new_restaurant = Restaurant(name=name, img_src=img_src, menu=menu, id=id)
    add_to_file(new_restaurant)
    
# Build the restaurants list
add_new_restaurant("Mcdonalds", "static/images/Mcdonalds.png", )