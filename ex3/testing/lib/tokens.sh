create_token(){
	curl --location --request POST '139.59.147.182:3000/tokens' \
        --header 'Content-Type: text/plain' \
        --data-raw '{
                "emailAddress" : "myemail@email.com",
                "password" : "thisIsAPassword"
        }'
}

get_token(){
	token=${1}
	if [ ${#token} -ge 19 ];
	then
		curl --location --request GET \
		"139.59.147.182:3000/tokens?id=${token}"
	else
		error "Missing token"
	fi
}

update_token(){
	token=${1}
	if [ ${#token} -ge 19 ];
	then
		curl --location --request PUT \
		'139.59.147.182:3000/tokens' \
		--header 'Content-Type: text/json' \
		--data-raw "{
			\"id\" : \"${token}\",
			\"extend\" : true
		}"
	else
		error "Missing token or invalid parameter was given"
	fi
}
