import restaurant_model
import menu_item_model
import csv

"""
This app is made for a development purpose.
It can be used to add new restaurants and menu items.
"""

# Setup
restaurant_name = ''
restaurant_img_name = ''
menu_item_name = ''
menu_item_price = 0
stay = True

# Print list of restaurants with their ids to choose from
def show_restaurants():
    print("Which restaurant do you want to update its menu items? ")
    with open('static/csv_files/restaurants.csv', newline='') as f:
        reader = csv.DictReader(f)
        for line in reader:
            print(f"Choose {line['id']} for adding to {line['name']}")

# Updates the price of the item with the given id or delete based on the selected action
def update_or_del_menu_item(id, price, action):
    try:
        with open('static/csv_files/menu_items.csv',mode='r' ,newline='') as f:
            reader = csv.DictReader(f)
            updated_rows = []
            for line in reader:
                if line['id'] == str(id):
                    if action == 'update':
                        line['price'] = str(price)
                        print("Item updated successfully!")
                    else:
                        # If the action is delete, pass the item to delete it
                        continue
                # Save the updated menu
                updated_rows.append(line)

        with open('static/csv_files/menu_items.csv', mode='w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=['name', 'price', 'restaurant_name', 'id'])
            writer.writeheader()

            # Write the updated menu
            for line in updated_rows:
                writer.writerow(line)
    except Exception as e:
        print(e)

# Choose which menu item to update or delete from the menu
def choose_and_show_menu(restaurant, action):
    try:
        menu = []
        # Show the menu
        print("Choose the menu item's id to perform the action on: ")
        with open('static/csv_files/menu_items.csv', newline='') as f:
            reader = csv.DictReader(f)
            for line in reader:
                if line['restaurant_name'] == restaurant:
                    menu.append(int(line['id']))
                    print(f"Choose {line['id']} for editing {line['name']}'s price")
        # Get user's choice and validate it
        choice = int(input(""))
        if choice > max(menu) or choice < 0:
            raise Exception("Could not find the item id you choose!")
        for item in menu:
            # Update the item's price if the action selected is updated
            if int(item) == choice and action == "update":
                new_price = float(input("Enter the new price for the item: "))
                update_or_del_menu_item(choice, new_price, action)    
            # Else delete the item from the menu
            else:
                update_or_del_menu_item(choice, 0 , action)    

    except Exception as e:
                print(e)
        

# Implementation
# Take input till the user inputs 'q'
while True:
    answer = input("What do you want to do? \n(r for adding a new restaurant, m for adding a new menu item, u for updating a price of a menu item, d for deleting a menu item, q to quit):\n")
    # Use match statement to handle user input
    match answer:
        # User wants to add a new restaurant
        case 'r': 
            # Get restaurant name and image name
            restaurant_name = input("Restaurant name: ")
            restaurant_img_name = input("Restaurant img name: ")
            # Construct image src from input
            restaurant_img_name = f"static/images/{restaurant_img_name}"
            try:
                # Check if image file exists
                open(restaurant_img_name)           
                # Create a restaurant instance
                restaurant = restaurant_model.Restaurant(restaurant_name, restaurant_img_name)
                # Get the menu items of the new restaurant
                restaurant.get_menu_items()
                # Add the new restaurant to the csv file
                restaurant_model.add_new_restaurant(
                    name=restaurant_name,
                    img_src=restaurant_img_name,
                )
            except:
                # If the image file does not exist, prompt the user to try again
                print("The image is not available. Please try another.")
                continue
        # User wants to add a new menu item
        case 'm':
            # Get menu item name and price
            menu_item_name = input("Menu item name: ")
            try:
                menu_item_price = float(input("Menu item price: "))
                show_restaurants()
                # Get user's choice of restaurant and add the menu item to it
                choice = int(input(""))
                restaurants = restaurant_model.Restaurant.read_restaurants()
                for res in restaurants:
                    if choice > len(restaurants) - 1 or choice < 0:
                        raise Exception("Could not find the restaurant id you choose!")
                    elif int(res.id) == choice:
                        restaurant = res
                        menu_item_model.add_menu_item(
                            restaurant=restaurant,
                            name=menu_item_name,
                            price=menu_item_price,
                        )
            except Exception as e:
                print(e)
                continue
        case 'u':
            try:
                chosen_restaurant = ""
                show_restaurants()
                # Get user's choice of restaurant
                choice = int(input(""))
                restaurants = restaurant_model.Restaurant.read_restaurants()
                # Validate the input
                if choice > len(restaurants) - 1 or choice < 0:
                    raise Exception("Could not find the restaurant id you choose!")
                else:
                    for res in restaurants:
                        if int(res.id) == choice:
                            chosen_restaurant = res.name
                # Update an item in the chosen restaurant menu
                choose_and_show_menu(chosen_restaurant, "update")
                continue

            except Exception as e:
                print(e)
                continue
        case 'd':
            try:
                chosen_restaurant = ""
                show_restaurants()
                # Get user's choice of restaurant and update its price
                choice = int(input(""))
                restaurants = restaurant_model.Restaurant.read_restaurants()
                if choice > len(restaurants) - 1 or choice < 0:
                    raise Exception("Could not find the restaurant id you choose!")
                else:
                    for res in restaurants:
                        if int(res.id) == choice:
                            chosen_restaurant = res.name
                choose_and_show_menu(chosen_restaurant, "delete")
                continue
            except Exception as e:
                print(e)
                continue
            
        # User wants to quit the app
        case 'q':
            # Close the app
            break
        # User enters an invalid input
        case _:
            # Prompt the user to try again or quit
            print("Invalid value! Please try again.")
            boolean = True
            while boolean:
                answer = input("Try again? (y/n): ")
                if answer == "n":
                    boolean = False
                    break
                elif answer != "y":
                    print("Invalid answer! Please try again.")
                    continue
                else:
                    boolean = True
                    break
            if boolean:
                continue
            else:
                break
