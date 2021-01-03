## Command Line Interface Application Programming Interface Tester

<!-- Token Features -->
<h3>Token Controller</h3>
<h4>Creating the token using CLIAPI</h4>

<pre>
$ ./cliapi_tester.sh --action=cT --email=myemail@email.com --data=PASSWORD
</pre>

<h4>Creating the token using cURL</h4>

<h4>
curl -v -D- --location --request POST "localhost:3000/token" \
    --header 'Content-Type: text/plain' \
    --data-raw "{
            \"emailAddress\" : \"myemail@email.com\",
            \"password\" : \"PASSWORD\"
    }"
</h4>

<!-- Create Features -->

<h4>Create Cart using CLIAPI</h4>
<pre>
./cliapi_tester.sh --action=cC --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
</pre>

<h4>Create cart using cURL</h4>
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

<h4>View Cart using CLIAPI</h4>
<pre>
./cliapi_tester.sh --action=vC --email=myemail@email.com --token=9zy66v8ktl40fe7qv5f
</pre>

<h4>View cart using cURL</h4>
<pre>
  curl -v -D- --location --request GET "localhost:3000/cart" \
  --header "Content-Type: text/json" \
  --header "token: 9zy66v8ktl40fe7qv5f" \
  --data-raw "{
      \"emailAddress\": \"myemail@email.com\"
    }"
</pre>
