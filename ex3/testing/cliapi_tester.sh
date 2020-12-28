#!/bin/bash -x
#
#

source ./lib/error.sh
source ./lib/users.sh
source ./lib/tokens.sh
source ./lib/help_menu.sh

for args in $@
do
	case $args in
		--action=*|action:*) _action=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		--token=*|token:*) _token=$(echo "$args" | cut -d'=' -f2 | cut -d':' -f2);;
		-h|-help|--help) help_menu;;
	esac
done

case $_action in
	post|insert) post_data;;
	get|fetch) get_data;;
	put|modify) put_data;;
	delete|remove) delete_data;;
	create-token) create_token;;
	get-token) get_token "${_token}";;
	update-token) update_token "${_token}";;
	delete-token) delete_token "${_token}";;
	*) error "Missing or invalid action parameter was given";;
esac

printf '\n'
