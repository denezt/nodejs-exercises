
create_order(){
  emailAddress="${1}"
	token="${2}"
  $curl_call POST "${target_server}:${target_port}/order" \
  --header 'Content-Type: text/json' \
  --header "token: ${token}" \
  --data-raw "{
    \"emailAddress\": \"${emailAddress}\"
  }"
}

view_order(){
  emailAddress="${1}"
  token="${2}"
  $curl_call GET "${target_server}:${target_port}/order" \
  --header 'Content-Type: text/json' \
  --header "token: ${token}" \
  --data-raw "{
    \"emailAddress\": \"${emailAddress}\"
  }"
}

delete_order(){
  emailAddress="${1}"
  token="${2}"
  $curl_call DELETE "${target_server}:${target_port}/order" \
  --header 'Content-Type: text/json' \
  --header "token: ${token}" \
  --data-raw "{
    \"emailAddress\": \"${emailAddress}\"
  }"
}

submit_order(){
  emailAddress="${1}"
  token="${2}"
  $curl_call PUT "${target_server}:${target_port}/order" \
  --header 'Content-Type: text/json' \
  --header "token: ${token}" \
  --data-raw "{
    \"emailAddress\": \"${emailAddress}\",
    \"submit\" : true
  }"
}
