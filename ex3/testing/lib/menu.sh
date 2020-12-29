menu_items(){
	emailAddress="${1}"
	token="${2}"
	printf "${emailAddress}\n"
	curl -D- --location --request GET "139.59.147.182:3000/menu" \
	--header 'Content-Type: text/json' \
	--header "token: ${token}" \
  --header "emailAddress: ${emailAddress}"
	printf "\n"
}
