#!/bin/bash

option="${1}"
process='node ./index.js'
logfile='nodejs_ex3.log'

error(){
	printf "\033[35mError:\t\033[31m${1}\033[0m\n"
	exit 1
}

getpid(){
	_pid=$(ps axww | egrep 'node ./index.js' | egrep -v 'grep' | awk '{print $1}')
	if [ ! -z "${_pid}" ];
	then
		echo ${_pid}
	else
		echo 0
	fi
}

stop_proc(){
	if [  `getpid` -gt 0 ];
	then
		printf "`getrid`\n"
		kill -9 "`getrid`"
		read -p "Remove old logs? [yes, no] " _confirm
		case $_confirm in
			y|yes) [ -e "$logfile" ] && rm $logfile;;
			*) printf "\033[35mExiting, no action was taken\033[0m\n";;
		esac
	else
		printf "`getrid`\n"
	fi
}

start_proc(){
	if [  `getpid` -gt 0 ];
	then
		nohup $process >> $logfile &
	else
		printf "\033[35mProcess already running \033[32m[`getpid`]\033[0m\n"
	fi
}

help_menu(){
	printf "Process Daemonizer\n"
	printf "\033[35mStart Process\t\033[32m[ -start, --start ]\033[0m\n"
	printf "\033[35mKill Process\t\033[32m[ -stop, --stop ]\033[0m\n"
}

case $option in
	-start|--start) start_proc;;
	-stop|--stop) stop_proc;;
	*) error "Missing or invalid parameter was given";;
esac
