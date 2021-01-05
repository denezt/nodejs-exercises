#!/bin/bash

option="${1}"

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
	else
		printf "`getrid`\n"
	fi
}

start_proc(){
	nohup node ./index.js >> ex3_input.log &
}



case $option in
	-stop|--stop) getpid;;
esac
