#!/bin/bash
#
#

option="$1"

post_data(){
	ARRSZ=`jq .'customer|length' dataset.json`
	echo "Array Size: ${ARRSZ}"
	for (( i = 0; i < ${ARRSZ}; i++ )); do
		#statements
		curl --location --request POST '139.59.147.182:3000/users' \
		--header 'Content-Type: text/plain' \
		--data-raw "$(jq ."customer[$i]" dataset.json)"
	done

}

get_data(){
	emailAddress=(`jq ."customer[]|.emailAddress" dataset.json`)
	for (( i = 0; i < ${#emailAddress[@]}; i++ )); do
		printf "${emailAddress[$i]}\n"
		val=${emailAddress[$i]}
		curl --location --request GET "139.59.147.182:3000/users?emailAddress=${val}"
	done
}

put_data(){
	curl --location --request PUT '139.59.147.182:3000/users' \
	--header 'Content-Type: text/json' \
	--data-raw '{
		"firstName":"randy",
		"emailAddress" : "myemail@email.com"
	}'
}

delete_data(){
	curl --location --request DELETE \
	'139.59.147.182:3000/users?emailAddress=myemail@email.com'
}

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
	if [ ${#token} -eq 20 ];
	then
		curl --location --request GET \
		"139.59.147.182:3000/tokens?id=${token}"
	else
		error "Missing token"
	fi
}

help_menu(){
	printf "Mock Data Wrapper"

}

case $option in
	-post|--post) post_data;;
	-get|--get) get_data;;
	-put|--put) put_data;;
	-delete|--delete) delete_data;;
	-create-token|--create-token) create_token;;
	-get-token|--get-token) get_token;;
esac

printf '\n'
