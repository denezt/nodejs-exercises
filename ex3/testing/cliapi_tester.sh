#!/bin/bash
#
#

source ./lib/error.sh
source ./lib/users.sh
source ./lib/tokens.sh
source ./lib/menu.sh
source ./lib/help_menu.sh

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
	post|insert) post_data;;
	get|fetch) get_data "${_emailAddress}" "${_token}";;
	put|modify) put_data "${_emailAddress}" "${_token}" "${_data}";;
	delete|remove) delete_data  "${_emailAddress}" "${_token}";;
	create-token) create_token;;
	get-token) get_token "${_token}";;
	update-token) update_token "${_token}";;
	delete-token) delete_token "${_token}";;
	view-menu) menu_items "${_emailAddress}" "${_token}";;
	*) error "Missing or invalid action parameter was given";;
esac

printf '\n'
