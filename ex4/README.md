# NodeJS API for Pizza Delivery Company
## Backend application for pizza delivery Company

### Usage

``` sh
# Start the application as a background service
$ ./daemonizer.sh --start
```





### Features

| Id  | Feature                   | Description                  | Status      |
| :-  | :-----------------------  | :--------------------------  | :---------- |
| 1   | User Administration       | Create, edit, remove user.   | Implemented |
| 2   | Token Administration      | Create, edit, delete token.  | Implemented |
| 3   | Menu Viewer               | View the current menu.       | Implemented |
| 4   | Shopping Cart             | Add, Remove, View            | Implemented |
| 5   | Create Order              | Add, Remove, Submit          | Implemented |
| 6   | SignUp for Site           | Submit                       | Implemented |
| 7   | Edit User Name            | Submit                       | Implemented |
| 8   | Change Password           | Submit                       | Implemented |
| 9   | Delete User               | Submit                       | Implemented |
| 10  | View all the menu items   | Submit                       | Implemented |
| 11  | Fill up a shopping cart   | Add, Remove, Submit          | Implemented |
| 12  | Place order/Send Email    | Add, Remove, Submit          | Implemented |

### Command Line Interface for Testing API

<h5>Use this extensible script located in the 'testing' directory to test the API</h5>

<pre>
CLI API Tester
Action            [ --action={COMMAND}, action:{COMMAND} ]
Token             [ --token={TOKEN}, token:{TOKEN} ]
Email             [ --email={EMAIL_ADDRESS}, email:{EMAIL_ADDRESS} ]
Item ID           [ --item={ITEM_ID}, item:{ITEM_ID} ]
Item Count        [ --count={ITEM_COUNT}, count:{ITEM_COUNT} ]

USER COMMANDS:
Post Data         [ load, insert, post ]
Get Data          [ get, fetch ]
Put Data          [ put, modify ]
Delete Data       [ delete, remove ]

TOKEN ACTIONS:
Create Token Data [ create-token, cT ]
Get Token         [ get-token, gT ]
Update Token      [ update-token, uT ]
Delete Token      [ delete-token, dT ]

CART ACTIONS:
Create Cart       [ create-cart, cC ]
Update Cart       [ update-cart, uC ]
View Cart         [ view-cart, vC ]
Delete Cart       [ delete-cart, dC ]

MENU ACTIONS:
View Menu Items   [ view-menu ]

USAGE:
./cliapi_tester.sh --action=load
./cliapi_tester.sh --action=create-token --email=myemail@email.com
./cliapi_tester.sh --action=get --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
./cliapi_tester.sh --action=get-token --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
./cliapi_tester.sh --action=update-token --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
</pre>


<p>
Current Demo Server: http://139.59.147.182:3000
</p>
