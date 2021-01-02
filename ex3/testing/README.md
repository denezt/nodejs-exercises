## Command Line Interface Application Programming Interface Tester

<h4>Creating the token using CLIAPI</h4>
<pre>
./cliapi_tester.sh --action=cT --email=myemail@email.com --data=PASSWORD
</pre>
<h4>Creating the token using cURL</h4>
<pre>
curl -v -D- --location --request POST "localhost:3000/token" \
    --header 'Content-Type: text/plain' \
    --data-raw "{
            \"emailAddress\" : \"myemail@email.com\",
            \"password\" : \"PASSWORD\"
    }"
</pre>

<h4>View Cart using CLIAPI</h4>
<pre>
./cliapi_tester.sh --action=vC --email=myemail@email.com --token=bi8asjxhcur3ahxalia
</pre>

<h4>View cart using cURL</h4>
<pre>
  curl -v -D- --location --request GET "localhost:3000/cart" \
  --header "Content-Type: text/json" \
  --header "token: bi8asjxhcur3ahxalia" \
  --data-raw "{
      \"emailAddress\": \"myemail@email.com\"
    }"
</pre>
