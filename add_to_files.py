import restaurant_model
import menu_item_model
from constants import restaurants
import csv

"""
This file is made for a development purpose.
It can be used to add new restaurants and menu items.
"""

# Setup
restaurant_name = ''
restaurant_img_name = ''
menu_item_name = ''
menu_item_price = 0
stay = True

# Implementation
# Take input till the using q
while True:
    answer = input("What do you want to do? \n(r for adding a new restaurant, m for adding a new menu item, q to quit):\n")
    match answer:
        case 'r': 
            restaurant_name = input("Restaurant name: ")
            restaurant_img_name = input("Restaurant img name: ")
            restaurant_img_name = f"static/images/{restaurant_img_name}"
            try:
                open(restaurant_img_name)           
                # Create a restaurant
                restaurant = restaurant_model.Restaurant(restaurant_name, restaurant_img_name)
                # Get restaurant's menu items
                restaurant.get_menu_items()
                # Create a restaurant instance
                restaurant_model.add_new_restaurant(
                    name=restaurant_name,
                    img_src=restaurant_img_name,
                    )
            except:
                # If choosen wrong image src
                print("The image is not available. Please try another.")
                continue
        case 'm':
            menu_item_name = input("Menu item name: ")
            try:
                # If entered a non numeric value
                menu_item_price = float(input("Menu item price: "))
                print("Which restaurant do you want to add the menu item to? ")
                # Loop over the restaurants to let the user choose the targeted restaurant using the ids
                with open('static/csv_files/restaurants.csv', newline='') as f:
                    reader = csv.DictReader(f)
                    for line in reader:
                        print(f"Choose {line['id']} for adding to {line['name']}")
                # Get the choice and add the item to it
                choice = input("")
                for res in restaurants:
                    if res.id == choice:
                        restaurant = res
                # Create a menu_item
                menu_item_model.add_menu_item(
                    restaurant=restaurant,
                    name=menu_item_name,
                    price=menu_item_price,
                )
            except:
                print("Invalid value! Please use numbers for the menu item prices.")
                continue
        case 'q':
            # Close the app
            break
        case _:
            # Incase entered an invalid value
            print("Invalid value! Please try again.")
            boolean = True
            # Choose to try again or close
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
