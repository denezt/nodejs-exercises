# JSHandler Framework using NodeJS API for 
## Frontend and Backend Application

### Application Usage

## Start the application

``` sh
# Start the application as a background service
$ node index.js
```

``` sh
# Start the application as a background service
$ node index.js --server-url=[SERVER_IP_ADDRESS]
```

``` sh
# Run Unit test for the application
$ node test
```

### Features

| Id  | Feature                                                   | Description                 | Status      |
| :-  | :-----------------------                                  | :-------------------------- | :---------- |
| 1   | User Administration                                       | Create, edit, remove user.  | Implemented |
| 2   | Token Administration                                      | Create, edit, delete token. | Implemented |
| 3   | SignUp for Site                                           | Submit                      | Implemented |
| 4   | Edit User Name                                            | Submit                      | Implemented |
| 5   | Change Password                                           | Submit                      | Implemented |
| 6   | Delete User                                               | Submit                      | Implemented |
| 7   | Lookup the details of a specific user by email address    | CLI Output                  | Implemented |


### Using the Command Line Interface for Application Query
``` sh
The CLI is running
# Display the Help Menu
help
Show Help Menu       - help
Show Menu Items      - menu items
Show Recent SignUps  - recent signups
Find specific Users  - user details --email EMAIL_ADDRESS
Exit CLI             - exit

# Usage Examples

# Get a specific user information
user --email kgwinn@yahoo.com
First Name:	Kevin
Last Name:	Gwinn
Email Address:	kgwinn@yahoo.com

```
