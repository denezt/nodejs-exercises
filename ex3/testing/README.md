# Command Line Interface Application Programming Interface Tester

| Item ID     | Using CLIAPI      | Using cURL     |
| :---------- | :-------------    | :------------- |
| 1       | [creating the token using cliapi](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#creating-the-token-using-cliapi)  | [creating the token using curl](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#creating-the-token-using-curl) |
| 2       | [create cart using cliapi](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#create-cart-using-cliapi)  | [create-cart-using-curl](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#create-cart-using-curl) |
| 3       | [add item in cart using cliapi](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#add-item-in-cart-using-cliapi) | [add item in cart using curl](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#add-item-in-cart-using-curl) |
| 4       | [view cart using cliapi](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#view-cart-using-cliapi) | [view cart using curl](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#view-cart-using-curl) |
| 5       | [remove all items from cart using cliapi](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#remove-all-items-from-cart-using-cliapi) | [remove all items from cart using curl](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#remove-all-items-from-cart-using-curl) |
| 6       | [create order using cliapi](https://github.com/denezt/nodejs-exercises/tree/main/ex3/testing#create-order-using-cliapi) | [create order cart using curl](https://github.com/denezt/nodejs-exercises/tree/main/ex3/testing#create-order-using-curl) |
| 7       | [view order using cliapi](https://github.com/denezt/nodejs-exercises/tree/main/ex3/testing#view-order-using-cliapi) | [view order cart using curl](https://github.com/denezt/nodejs-exercises/tree/main/ex3/testing#view-order-using-curl) |
| 8       | [submit order using cliapi](https://github.com/denezt/nodejs-exercises/tree/main/ex3/testing#view-order-using-cliapi) | [submit order cart using curl](https://github.com/denezt/nodejs-exercises/tree/main/ex3/testing#view-order-using-curl) |
| 9       | [delete order using cliapi](https://github.com/denezt/nodejs-exercises/tree/main/ex3/testing#delete-order-using-cliapi) | [delete order cart using curl](https://github.com/denezt/nodejs-exercises/tree/main/ex3/testing#delete-order-using-curl) |



<!-- Token Features -->
<h2>Token Controller</h2>
<!-- Token Features 1 -->
<h3>Creating the token using CLIAPI</h3>
<pre>
$ ./cliapi_tester.sh --action=cT --email=myemail@email.com --data=PASSWORD
</pre>
<h3>Creating the token using cURL</h3>
<pre>
curl -v -D- --location --request POST "localhost:3000/token" \
    --header 'Content-Type: text/plain' \
    --data-raw "{
            \"emailAddress\" : \"myemail@email.com\",
            \"password\" : \"PASSWORD\"
    }"
</pre>

[Back to top](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#command-line-interface-application-programming-interface-tester)

<!-- Cart Features -->
<h2>Cart Controller</h2>
<!-- Cart Features 1 -->
<h3>Create Cart using CLIAPI</h3>
<h4>Need to run this before adding anything into the cart</h4>
<pre>
$ ./cliapi_tester.sh --action=cC --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
</pre>
<h3>Create cart using cURL</h3>
<pre>
  curl -v -D- --location --request POST "localhost:3000/cart" \
  --header "Content-Type: text/json" \
  --header "token: 9zy66v8ktl40fe7qv5f" \
  --data-raw "{
      \"emailAddress\": \"myemail@email.com\",
      \"shoppingCart\" : {
          \"items\": [
          {
            \"itemid\" : 1,
            \"count\": 0
          },
          {
            \"itemid\" : 2,
            \"count\": 0
          },
          {
            \"itemid\" : 3,
            \"count\": 0
          },
          {
            \"itemid\" : 4,
            \"count\": 0
          },
          {
            \"itemid\" : 5,
            \"count\": 0
          }
        ]
      }
    }"
</pre>

[Back to top](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#command-line-interface-application-programming-interface-tester)

<!-- Cart Features 2 -->
<h3>Add item in cart using CLIAPI</h3>
<pre>
$ ./cliapi_tester.sh --action=uC --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
</pre>
<h3>Add item in cart using cURL</h3>
<pre>
curl -v -D- --location PUT "localhost:3000/cart" \
--header "Content-Type: text/json" \
--header "token: 9zy66v8ktl40fe7qv5f" \
--data-raw "{
      \"emailAddress\": \"myemail@email.com\",
      \"itemId\" : \"1\",
      \"itemCount\" : \"2\"
    }"
</pre>

[Back to top](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#command-line-interface-application-programming-interface-tester)

<!-- Cart Features 3 -->
<h3>View Cart using CLIAPI</h3>
<pre>
$ ./cliapi_tester.sh --action=vC --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
</pre>

<h3>View cart using cURL</h3>
<pre>
  curl -v -D- --location --request GET "localhost:3000/cart" \
  --header "Content-Type: text/json" \
  --header "token: 9zy66v8ktl40fe7qv5f" \
  --data-raw "{
      \"emailAddress\": \"myemail@email.com\"
    }"
</pre>

[Back to top](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#command-line-interface-application-programming-interface-tester)

<!-- Cart Features 4 -->
<h3>Remove all items from cart using CLIAPI</h3>
<pre>
$ ./cliapi_tester.sh --action=dC --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
</pre>

<h3>Remove all items from cart using cURL</h3>
<pre>
  curl -v -D- --location --request DELETE "localhost:3000/cart" \
  --header "Content-Type: text/json" \
  --header "token: 9zy66v8ktl40fe7qv5f" \
  --data-raw "{
      \"emailAddress\": \"myemail@email.com\"
    }"
</pre>

[Back to top](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#command-line-interface-application-programming-interface-tester)


<!-- Order Features 1 -->
<h3>Create order using CLIAPI</h3>
<pre>
$ ./cliapi_tester.sh --action=cO --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
</pre>

<h3>Create order using cURL</h3>
<pre>
  curl -v -D- --location --request POST "localhost:3000/cart" \
  --header "Content-Type: text/json" \
  --header "token: 9zy66v8ktl40fe7qv5f" \
  --data-raw "{
      \"emailAddress\": \"myemail@email.com\"
    }"
</pre>

[Back to top](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#command-line-interface-application-programming-interface-tester)


<!-- Order Features 2 -->
<h3>View order using CLIAPI</h3>
<pre>
$ ./cliapi_tester.sh --action=vO --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
</pre>

<h3>View order using cURL</h3>
<pre>
  curl -v -D- --location --request GET "localhost:3000/cart" \
  --header "Content-Type: text/json" \
  --header "token: 9zy66v8ktl40fe7qv5f" \
  --data-raw "{
      \"emailAddress\": \"myemail@email.com\"
    }"
</pre>

[Back to top](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#command-line-interface-application-programming-interface-tester)


<!-- Order Features 3 -->
<h3>Delete order using CLIAPI</h3>
<pre>
$ ./cliapi_tester.sh --action=dO --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
</pre>

<h3>Delete order using cURL</h3>
<pre>
  curl -v -D- --location --request DELETE "localhost:3000/cart" \
  --header "Content-Type: text/json" \
  --header "token: 9zy66v8ktl40fe7qv5f" \
  --data-raw "{
      \"emailAddress\": \"myemail@email.com\"
    }"
</pre>

[Back to top](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#command-line-interface-application-programming-interface-tester)


<!-- Order Features 4 -->
<h3>Submit order using CLIAPI</h3>
<pre>
$ ./cliapi_tester.sh --action=sO --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
</pre>

<h3>Submit order using cURL</h3>
<pre>
curl -v -D- --location --request PUT "localhost:3000/cart" \
--header "Content-Type: text/json" \
--header "token: 9zy66v8ktl40fe7qv5f" \
--data-raw "{
  \"emailAddress\": \"myemail@email.com\",
  \"apiKey\": \"[MAILGUN_API_KEY]\",
  \"submit\" : true
  }"
  </pre>

  [Back to top](https://github.com/denezt/nodejs-exercises/blob/main/ex3/testing/README.md#command-line-interface-application-programming-interface-tester)
