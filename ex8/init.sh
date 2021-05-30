#!/bin/sh

ipaddr=$1

if [ ! -z "$ipaddr" ];
then
	node index.js --serverip=$ipaddr
else
	printf "\033[35mError: \033[31mMissing IP Address\033[0m\n"
fi
