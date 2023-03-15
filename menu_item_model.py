import csv
import restaurant_model
    
class Menu_item:
    
    def __init__(self, name, price, restaurant_name, id=0):
        self.name = name
        self.id = id
        self.price = price
        self.restaurant_name = restaurant_name
    
# Add new items to menu_items file
def add_to_file(name, price, restaurant_name, id,):
    field_names = ["name", "price", "restaurant_name", "id"]

    # Checks if the item is already in the file or not
    try:
        with open('static/csv_files/menu_items.csv', newline='') as f:
            csv_reader = csv.DictReader(f, fieldnames=field_names)
            for row in csv_reader:
                if row['name'] == name and row['restaurant_name'] == restaurant_name:
                    return
    except:
        print("File not found")

    # If not add, it to the file
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
    counter = 0
    
    try:
        with open("static/csv_files/menu_items.csv", newline='') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row['name']:
                    # Count the number of items in the file
                    counter += 1
    except:
        # Set the counter to 0
        counter = 0
        print("File not found")
    
    # Give the item an ID based on the number of items found
    id = counter
    new_menu_item = Menu_item(name, price, restaurant.name, id)
    # Adds item to the file
    add_to_file(name=name, price=price, restaurant_name=restaurant.name, id=id)