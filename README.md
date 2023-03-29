# MY FINAL PROJECT
It is a restaurant platform that you can order food from after selecting the restaurant you want to dine in.


- What does it do?  
  It has a terminal app called add_to_files.py which is the app the developer can use to add new restaurants and menu items to the database (The CSV files).

- What is the "new feature" which you have implemented that we haven't seen before?  
  Using the session storage and exchanging data between Flask and JS.
  Used CSV files DictReader and DictWriter as the database of the app.
  Used staticmethod
  Raised error


## Prerequisites
Did you add any additional modules that someone needs to install (for instance anything in Python that you `pip install-ed`)? 
List those here (if any).
only flask

## Project Checklist
- [x] It is available on GitHub.
- [x] It uses the Flask web framework.
- [x] It uses at least one module from the Python Standard Library other than the random module.
  Please provide the name of the module you are using in your app.
  - Module name:
  csv

- [x] It contains at least one class written by you that has both properties and methods. This includes instantiating the class and using the methods in your app. Please provide below the file name and the line number(s) of at least one example of a class definition in your code as well as the names of two properties and two methods.
  - File name: restaurant_model.py, menu_item_model.py
  - Line number(s): 5, 4
  - Name of two properties: Restaurant(name, img_src), MenuItem(price, id)
  - Name of two methods: Restaurant(read_restaurants, get_menu_items)
- [x] It makes use of JavaScript in the front end and uses the localStorage of the web browser.
- [x] It uses modern JavaScript (for example, let and const rather than var).
- [x] It makes use of the reading and writing to a file feature.
- [x] It contains conditional statements. Please provide below the file name and the line number(s) of at least
  one example of a conditional statement in your code.
  - File name: add_to_files.py
  - Line number(s): 22 (match), 63 (if)
- [x] It contains loops. Please provide below the file name and the line number(s) of at least
  one example of a loop in your code.
  - File name: my_app.py
  - Line number(s): 20 (for)
- [x] It lets the user enter a value in a text box at some point.
  This value is received and processed by your back end Python code.
- [x] It doesn't generate any error message even if the user enters a wrong input.
- [x] The code follows the code and style conventions as introduced in the course, is fully documented using comments and doesn't contain unused or experimental code. 
  In particular, the code should not use `print()` or `console.log()` for any information the app user should see. Instead, all user feedback needs to be visible in the browser.  
- [x] All exercises have been completed as per the requirements and pushed to the respective GitHub repository.