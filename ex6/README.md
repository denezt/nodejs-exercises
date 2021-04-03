# NodeJS API for Pizza Delivery Company
## Backend application for pizza delivery Company

### Application Usage

``` sh
# Start the application as a background service
$ node index.js
```

### Features

| Id  | Feature                                                   | Description                 | Status      |
| :-  | :-----------------------                                  | :-------------------------- | :---------- |
| 1   | User Administration                                       | Create, edit, remove user.  | Implemented |
| 2   | Token Administration                                      | Create, edit, delete token. | Implemented |
| 3   | Menu Viewer                                               | View the current menu.      | Implemented |
| 4   | Shopping Cart                                             | Add, Remove, View           | Implemented |
| 5   | Create Order                                              | Add, Remove, Submit         | Implemented |
| 6   | SignUp for Site                                           | Submit                      | Implemented |
| 7   | Edit User Name                                            | Submit                      | Implemented |
| 8   | Change Password                                           | Submit                      | Implemented |
| 9   | Delete User                                               | Submit                      | Implemented |
| 10  | View all the menu items                                   | Submit                      | Implemented |
| 11  | Fill up a shopping cart                                   | Add, Remove, Submit         | Implemented |
| 12  | Place order/Send Email                                    | Add, Remove, Submit         | Implemented |
| 13  | View current menu items                                   | CLI Output                  | Implemented |
| 14  | View orders placed in the last 24 hours                   | CLI Output                  | Implemented |
| 15  | Lookup details of a specific order by order ID            | CLI Output                  | Implemented |
| 16  | View all the users who have signed up in the last 24 hours| CLI Output                  | Implemented |
| 17  | Lookup the details of a specific user by email address    | CLI Output                  | Implemented |


### Using the Command Line Interface for Application Query
``` sh
The CLI is running
# Display the Help Menu
help
Show Help Menu       - help
Show Menu Items      - menu items
Show Recent SignUps  - recent signups
Show Recent Orders   - recent orders
Find specific Order  - order, order details --id ORDER_ID
Find specific Users  - user, user details --email EMAIL_ADDRESS
Exit CLI             - exit

# Usage Examples
# Get a specific order
order --id l3x7jc3a2jx7epfiv1vr
Order Item:	Pepperoni Pizza
Order Item:	Happy Sparkling Juice
Order Item:	New World Lemonade
Order Cost:	 $20.10

# Get a specific user information
user --email kgwinn@yahoo.com
First Name:	Kevin
Last Name:	Gwinn
Email Address:	kgwinn@yahoo.com

```
