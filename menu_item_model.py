import csv
    
class Menu_item:
    
    # selected_counter is used to determine the number of times the item is selected
    def __init__(self, name, price, restaurant_name, id):
        self.name = name
        self.id = id
        self.price = price
        self.restaurant_name = restaurant_name
        self.selected_counter = 0
        
    # Read the menu items from the file
    @staticmethod
    def read_menu_items(restaurant_name):
        with open("static/csv_files/menu_items.csv", newline='') as f:
            reader = csv.DictReader(f)
            menu_items = []
            for row in reader:
                if restaurant_name == row['restaurant_name']:
                    menu_items.append(
                        Menu_item(
                            name=row['name'],
                            price=row['price'],
                            restaurant_name=row['restaurant_name'],
                            id=row['id'],
                            )
                    )
            return menu_items
    
# Add new items to menu_items file
def add_to_file(name, price, restaurant_name, id,):
    with open('static/menu_items.csv', 'a', newline='') as f:
        field_names = ["name", "price", "restaurant_name", "id"]
        csv_writer = csv.DictWriter(f, fieldnames=field_names)
        csv_writer.writeheader()
        csv_writer.writerow(
            {
                'name' : name,
                'price' : price,
                'restaurant_name' : restaurant_name,
                'id' : id
            })

# Add new menu_item
def add_menu_item(name, price, restaurant_name):
    menu_items = Menu_item.read_menu_items("Mcdonalds")
    id = len(menu_items)
    new_menu_item = Menu_item(name, price, restaurant_name, id)
    add_to_file(name=name, price=price, restaurant_name=restaurant_name, id=id)
    
# Create menu_items
