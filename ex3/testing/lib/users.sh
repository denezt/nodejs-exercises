post_data(){
	ARRSZ=`jq .'customer|length' dataset.json`
	echo "Array Size: ${ARRSZ}"
	for (( i = 0; i < ${ARRSZ}; i++ ));
	do
		curl -D- --location --request POST '139.59.147.182:3000/users' \
		--header 'Content-Type: text/plain' \
		--data-raw "$(jq ."customer[$i]" dataset.json)"
	done
}

get_data(){
	emailAddress="${1}"
	token="${2}"
	printf "${emailAddress}\n"
	curl -v -D- --location --request GET "139.59.147.182:3000/users?emailAddress=${emailAddress}" \
	--header 'Content-Type: text/json' \
	--header "token: ${token}" \
	--header "emailAddress: ${emailAddress}"
	printf "\n"
}

put_data(){
	emailAddress="${1}"
	token="${2}"
	data="${3}"
	[ ${#data} -eq 0 ] && data="qwertz"
	curl -D- --location --request PUT '139.59.147.182:3000/users' \
	--header 'Content-Type: text/json' \
	--header "token: ${token}" \
	--data-raw "{
		\"firstName\" : \"${data}\",
		\"emailAddress\" : \"${emailAddress}\"
	}"
	printf "\n"
}

delete_data(){
	emailAddress="${1}"
	token="${2}"
	curl -D- --location --request DELETE \
	'139.59.147.182:3000/users?emailAddress=myemail@email.com' \
	--header "token: ${token}"
}
