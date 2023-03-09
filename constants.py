import restaurant_model

restaurants = restaurant_model.Restaurant.read_restaurants()
for restaurant in restaurants:
    restaurant.get_menu_items()