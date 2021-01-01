create_cart(){
  emailAddress="${1}"
	token="${2}"
  menu_items "${_emailAddress}" "${_token}"
  $curl_call POST "139.59.147.182:3000/cart" \
  --header 'Content-Type: text/json' \
  --header "token: ${token}" \
  --data-raw "{
    \"emailAddress\": \"${emailAddress}\",
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
}

view_cart(){
  emailAddress="${1}"
	token="${2}"
  $curl_call GET "139.59.147.182:3000/cart" \
	--header 'Content-Type: text/json' \
	--header "token: ${token}" \
	--data-raw "{
			\"emailAddress\": \"${emailAddress}\"
	}"
}
