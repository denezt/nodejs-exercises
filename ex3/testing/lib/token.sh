create_token(){
	emailAddress=${1}
	userPassword=${2}
	if [ ${#emailAddress} -gt 1 -a ${#userPassword} -gt 1 ];
	then
		$curl_call POST "${target_server}:${target_port}/token" \
        --header 'Content-Type: text/plain' \
        --data-raw "{
                \"emailAddress\" : \"${emailAddress}\",
                \"password\" : \"${userPassword}\"
        }"
	else
		error "Missing a parameter required for token creation"
	fi
}

get_token(){
	token=${1}
	if [ ${#token} -ge 19 ];
	then
		$curl_call GET \
		"${target_server}:${target_port}/token?id=${token}"
	else
		error "Missing token"
	fi
}

update_token(){
	token=${1}
	if [ ${#token} -ge 19 ];
	then
		$curl_call PUT "${target_server}:${target_port}/token" \
		--header 'Content-Type: text/json' \
		--data-raw "{
			\"id\" : \"${token}\",
			\"extend\" : true
		}"
	else
		error "Missing token or invalid parameter was given"
	fi
}

delete_token(){
	token="${1}"
	if [ ${#token} -ge 19 ];
	then
		$curl_call DELETE "${target_server}:${target_port}/token?id=${token}"
	else
		error "Missing token or invalid parameter was given"
	fi
}
