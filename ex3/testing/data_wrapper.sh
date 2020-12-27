#!/bin/bash

option="$1"

post_data(){
curl --location --request POST '139.59.147.182:3000/users' \
--header 'Content-Type: text/plain' \
--data-raw '{
	"firstName":"richard",
	"lastName" : "jackson",
	"emailAddress" : "myemail@email.com",
	"streetAddress" : "123 Rottweiler Ln",
	"password" : "thisIsAPassword",
	"tosAgreement" : true
}'

}

get_data(){
	curl --location --request GET \
	'139.59.147.182:3000/users?emailAddress=myemail@email.com'
}

case $option in
-post|--post) post_data;;
-get|--get) get_data;;
esac


printf '\n'
