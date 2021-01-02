menu_items(){
	emailAddress="${1}"
	token="${2}"
	$curl_call GET "${target_server}:${target_port}/menu?emailAddress=${emailAddress}" \
	--header 'Content-Type: text/json' \
	--header "token: ${token}"
	printf "\n"
}
