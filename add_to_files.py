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

# Implementation
# Take input till the user inputs 'q'
while True:
    answer = input("What do you want to do? \n(r for adding a new restaurant, m for adding a new menu item, q to quit):\n")
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
                # Print list of restaurants to choose from
                print("Which restaurant do you want to add the menu item to? ")
                with open('static/csv_files/restaurants.csv', newline='') as f:
                    reader = csv.DictReader(f)
                    for line in reader:
                        print(f"Choose {line['id']} for adding to {line['name']}")
                # Get user's choice of restaurant and add the menu item to it
                choice = int(input(""))
                restaurants = restaurant_model.Restaurant.read_restaurants()
                for res in restaurants:
                    if choice > len(restaurants) - 1:
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
