#!/bin/bash

nodejs -v

_ipaddr=($(ifconfig ens3 | grep 'inet' | awk '{print $2}'))

# if [ ${#_ipaddr[*]} -gt 0 ];
# then
#	NODE_ENV=production nodejs index.js --serverip=${_ipaddr[*]}
# else
#	printf "\033[35mError: \033[31mMissing IP Address\033[0m\n"
# fi

NODE_ENV=production nodejs index.js --server-url=$1
