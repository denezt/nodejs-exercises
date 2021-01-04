#!/bin/bash
#

# Address for the target server - application server
target_server="139.59.147.182"
# Port for the target server - application port
target_port="3000"

source ../../config/settings.sh
source ./lib/error.sh
source ./lib/user.sh
source ./lib/token.sh
source ./lib/menu.sh
source ./lib/cart.sh
source ./lib/order.sh
source ./lib/help_menu.sh

for args in $@
do
	case $args in
		-d|-debug|--debug) _debug="on";;
	esac
done

case $_debug in
	on) export curl_call="curl -v -D- --location --request";;
	*) export curl_call="curl --silent --location --request";;
esac

for args in $@
do
	case $args in
		--action=*|action:*) _action=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		--email=*|email:*) _emailAddress=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		--token=*|token:*) _token=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		--password=*|password:*) _password=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		--item=*|item:*) _item=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		--count=*|count:*) _count=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		-h|-help|--help) help_menu;;
		*) error "The parameter ${args} is an invalid parameter (cowardly exiting execution)";;
	esac
done

case $_action in
	load|insert|post) post_data;;
	get|fetch) get_data "${_emailAddress}" "${_token}";;
	put|modify) put_data "${_emailAddress}" "${_token}" "${_password}";;
	delete|remove) delete_data  "${_emailAddress}" "${_token}";;
	create-token|cT) create_token "${_emailAddress}" "${_password}";;
	get-token|gT) get_token "${_token}";;
	update-token|uT) update_token "${_token}";;
	delete-token|dT) delete_token "${_token}";;
	view-menu|vM) menu_items "${_emailAddress}" "${_token}";;
	create-cart|cC) create_cart "${_emailAddress}" "${_token}";;
	update-cart|uC) update_cart "${_emailAddress}" "${_token}" "${_item}" "${_count}";;
	view-cart|vC) view_cart "${_emailAddress}" "${_token}";;
	delete-cart|dC) delete_cart "${_emailAddress}" "${_token}";;
	create-order|cO) create_order "${_emailAddress}" "${_token}";;
	view-order|vO) view_order "${_emailAddress}" "${_token}";;
	delete-order|dO) delete_order "${_emailAddress}" "${_token}";;
	submit-order|sO) submit_order "${_emailAddress}" "${_token}";;
	*) error "Missing or invalid 'action' parameter was given";;
esac

printf '\n'
