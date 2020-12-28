post_data(){
	ARRSZ=`jq .'customer|length' dataset.json`
	echo "Array Size: ${ARRSZ}"
	for (( i = 0; i < ${ARRSZ}; i++ ));
	do
		curl --location --request POST '139.59.147.182:3000/users' \
		--header 'Content-Type: text/plain' \
		--data-raw "$(jq ."customer[$i]" dataset.json)"
	done
}

get_data(){
	emailAddress=(`jq ."customer[]|.emailAddress" dataset.json`)
	for (( i=0;$i < ${#emailAddress[@]}; i++ ));
	do
		printf "${emailAddress[$i]}\n"
		curl --location --request GET "139.59.147.182:3000/users?emailAddress=${emailAddress[$i]}"
		printf "\n"
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
