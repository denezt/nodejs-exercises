menu_items(){
	emailAddress="${1}"
	token="${2}"
	$curl_call GET "139.59.147.182:3000/menu?emailAddress=${emailAddress}" \
	--header 'Content-Type: text/json' \
	--header "token: ${token}"
	printf "\n"
}
