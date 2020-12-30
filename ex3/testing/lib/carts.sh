create_cart(){
  emailAddress="${1}"
	token="${2}"
  menu_items "${_emailAddress}" "${_token}"
  $curl_call POST "139.59.147.182:3000/cart" \
  --header 'Content-Type: text/json' \
  --header "token: ${token}" \
  --data-raw "{
    \"emailAddress\": \"${emailAddress}\",
    \"itemList\": []
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
