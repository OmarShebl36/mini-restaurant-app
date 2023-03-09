import restaurant_model

restaurants = restaurant_model.Restaurant.read_restaurants()
menu = Menu_item.read_menu_items("Mcdonalds")