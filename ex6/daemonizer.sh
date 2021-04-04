#!/bin/bash

option="${1}"
process="node index.js"
logfile="nodejs_ex5.log"

error(){
	printf "\x1b[35mError:\t\x1b[31m${1}\x1b[0m\n"
	exit 1
}

getpid(){
	_pid=$(ps axww | egrep "${process}" | egrep -v 'grep' | awk '{print $1}')
	if [ ! -z "${_pid}" ];
	then
		echo ${_pid}
	else
		echo 0
	fi
}

kill_proc(){
	for args in $@
	do
		case $args in
			force:*) _force=$(echo $args | cut -d':' -f2);;
		esac
	done

	if [ `getpid` -gt 0 ];
	then
		printf "`getpid`\n"
		kill -9 "`getpid`"
		case $_force in
			'true') _confirm="yes";;
			*) read -p "Remove old logs? [yes, no] " _confirm;;
		esac
		case $_confirm in
			y|yes) [ -e "${logfile}" ] && rm ${logfile};;
			n|no) printf "\x1b[32mDone!\x1b[0m\n";;
			*) printf "\x1b[35mExiting, no action was taken\x1b[0m\n";;
		esac
	else
		printf "No running process for ${process} was found.\n"
	fi
}

start_proc(){
	if [ `getpid` -eq 0 ];
	then
		printf "Starting, process ${process} as daemon.\n"
		nohup ${process} >> ${logfile} &> /dev/null &
		printf "\x1b[36mApplication is now accessible via\x1b[0m \x1b[35m=> \x1b[32mlocalhost:3000\x1b[0m\n"
		printf "Done\n"
	else
		printf "\x1b[35mProcess already running \x1b[32m[`getpid`]\x1b[0m\n"
	fi
}

restart_proc(){
	git pull origin main --ff
	printf "Attempting to restart process \`${process}\`...\n"
	kill_proc force:true
	start_proc
}

query_proc(){
	if [ `getpid` -eq 0 ];
	then
		printf "No process running for ${process}\n"
	else
		printf "Process (${process}) running\nPID [`getpid`]\n"
	fi
}

help_menu(){
	printf "\x1b[36mProcess Daemonizer\x1b[0m\n"
	printf "\x1b[35mStart Process\t\x1b[32m[ -s, -start, --start ]\x1b[0m\n"
	printf "\x1b[35mKill Process\t\x1b[32m[ -k, -kill, --kill ]\x1b[0m\n"
	printf "\x1b[35mQuery Process\t\x1b[32m[ -q, -query, --query ]\x1b[0m\n"
	printf "\x1b[35mHelp Menu\t\x1b[32m[ -h, -help, --help ]\x1b[0m\n"
	exit 0
}

case ${option} in
	-s|-start|--start) start_proc;;
	-k|-kill|--kill) kill_proc;;
	-q|-query|--query) query_proc;;
	-r|-restart|--restart) restart_proc;;
	-h|-help|--help) help_menu;;
	*) error "Missing or invalid parameter was given";;
esac
