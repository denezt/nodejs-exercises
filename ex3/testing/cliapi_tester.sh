#!/bin/bash
#
#

source ./lib/error.sh
source ./lib/user.sh
source ./lib/token.sh
source ./lib/menu.sh
source ./lib/cart.sh
source ./lib/help_menu.sh

for args in $@
do
	case $args in
		-d|-debug|--debug) _debug="on";;
	esac
done

case $_debug in
	on) export curl_call="curl -v -D- --location --request";;
	*) export curl_call="curl --location --request";;
esac

for args in $@
do
	case $args in
		--action=*|action:*) _action=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		--email=*|email:*) _emailAddress=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		--token=*|token:*) _token=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		--data=*|data:*) _data=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		-h|-help|--help) help_menu;;
	esac
done

case $_action in
	load|insert|post) post_data;;
	get|fetch) get_data "${_emailAddress}" "${_token}";;
	put|modify) put_data "${_emailAddress}" "${_token}" "${_data}";;
	delete|remove) delete_data  "${_emailAddress}" "${_token}";;
	create-token|cT) create_token "${_emailAddress}" "${_data}";;
	get-token|gT) get_token "${_token}";;
	update-token|uT) update_token "${_token}";;
	delete-token|dT) delete_token "${_token}";;
	view-menu|vM) menu_items "${_emailAddress}" "${_token}";;
	create-cart|cC) create_cart "${_emailAddress}" "${_token}";;
	view-cart|vC) view_cart "${_emailAddress}" "${_token}";;
	*) error "Missing or invalid 'action' parameter was given";;
esac

printf '\n'
