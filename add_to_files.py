import restaurant_model
import menu_item_model

"""
This file is made for a development purpose.
It can be used to add new restaurants and menu items.
"""

# Setup
restaurant_name = input("Restaurant name: ")
restaurant_img_name = input("Restaurant img name: ")
menu_itme_name = input("Menu itme name: ")
menu_itme_price = float(input("Menu itme price: "))

# Create a restaurant instance
restaurant_model.add_new_restaurant(
    name=restaurant_name,
    img_src=f"static/images/{restaurant_img_name}",
    )

# 
mcdonald = restaurant_model.Restaurant(restaurant_name, restaurant_img_name)

# Get restaurant's menu items
mcdonald.get_menu_items()

# Create a menu_item
item = menu_item_model.add_menu_item(
    restaurant=mcdonald,
    name=menu_itme_name,
    price=menu_itme_price,
    )