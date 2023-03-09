import csv
import restaurant_model
    
class Menu_item:
    # selected_counter is used to determine the number of times the item is selected
    def __init__(self, name, price, restaurant_name, id):
        self.name = name
        self.id = id
        self.price = price
        self.restaurant_name = restaurant_name
        self.selected_counter = 0
    
# Add new items to menu_items file
def add_to_file(name, price, restaurant_name, id,):
    field_names = ["name", "price", "restaurant_name", "id"]
    with open('static/csv_files/menu_items.csv', newline='') as f:
        csv_reader = csv.DictReader(f, fieldnames=field_names)
        for row in csv_reader:
            if row['name'] == name and row['restaurant_name'] == restaurant_name:
                return
        
    with open('static/csv_files/menu_items.csv', 'a', newline='') as f:
        csv_writer = csv.DictWriter(f, fieldnames=field_names)
        csv_writer.writerow(
            {
                'name' : name,
                'price' : price,
                'restaurant_name' : restaurant_name,
                'id' : id
            })

# Add new menu_item
def add_menu_item(name, price, restaurant):
    id = len(restaurant.menu)
    new_menu_item = Menu_item(name, price, restaurant.name, id)
    add_to_file(name=name, price=price, restaurant_name=restaurant.name, id=id)