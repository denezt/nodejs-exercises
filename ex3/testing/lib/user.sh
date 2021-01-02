post_data(){
	ARRSZ=`jq .'customer|length' dataset.json`
	echo "Array Size: ${ARRSZ}"
	for (( i = 0; i < ${ARRSZ}; i++ ));
	do
		$curl_call POST "${target_server}:${target_port}/user" \
		--header 'Content-Type: text/plain' \
		--data-raw "$(jq ."customer[$i]" dataset.json)"
	done
}

get_data(){
	emailAddress=${1}
	token="${2}"
	$curl_call GET "${target_server}:${target_port}/user?emailAddress=${emailAddress}" \
	--header 'Content-Type: text/json' \
	--header "token: ${token}"
	printf "\n"
}

put_data(){
	emailAddress="${1}"
	token="${2}"
	data="${3}"
	[ ${#data} -eq 0 ] && data="qwertz"
	$curl_call PUT "${target_server}:${target_port}/user" \
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
	$curl_call DELETE "${target_server}:${target_port}/user?emailAddress=myemail@email.com" \
	--header "token: ${token}"
}
