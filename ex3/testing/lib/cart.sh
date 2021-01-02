create_cart(){
  emailAddress="${1}"
	token="${2}"
  menu_items "${_emailAddress}" "${_token}"
  $curl_call POST "${target_server}:${target_port}/cart" \
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

update_cart(){
  emailAddress="${1}"
  token="${2}"
  itemId="${3}"
  itemCount="${4}"

  curl -v -D- --location --request PUT "${target_server}:${target_port}/cart" \
	--header 'Content-Type: text/json' \
	--header "token: ${token}" \
	--data-raw "{
				\"emailAddress\": \"${emailAddress}\",
				\"itemId\" : \"${itemId}\",
				\"itemCount\" : ${itemCount}
			}"
}


view_cart(){
  emailAddress="${1}"
	token="${2}"
  $curl_call GET "${target_server}:${target_port}/cart" \
	--header 'Content-Type: text/json' \
	--header "token: ${token}" \
	--data-raw "{
			\"emailAddress\": \"${emailAddress}\"
	}"
}
