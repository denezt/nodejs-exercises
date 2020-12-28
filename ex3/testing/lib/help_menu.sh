usage(){
	printf "\033[36mUSAGE:\033[0m\n"
	printf "\033[35m$0 \033[32m--action=get\033[0m\n"
	printf "\033[35m$0 \033[32m--action=create-token\033[0m\n"
	printf "\033[35m$0 \033[32m--action=get-token \033[33m--token=9zy66v8ktl40fe7qv5f\033[0m\n"
	printf "\033[35m$0 \033[32m--action=update-token \033[33m--token=9zy66v8ktl40fe7qv5f\033[0m\n"
}

commands(){
	printf "\033[36mUSER COMMANDS:\033[36m\n"
	printf "\033[35mPost Data\t\033[32m[ post, insert ]\033[0m\n"
	printf "\033[35mGet Data\t\033[32m[ get, fetch ]\033[0m\n"
	printf "\033[35mPut Data\t\033[32m[ put, modify ]\033[0m\n"
	printf "\033[35mDelete Data\t\033[32m[ delete, remove ]\033[0m\n"
	printf "\n\033[36mTOKEN ACTIONS:\033[0m\n"
	printf "\033[35mCreate Token Data\t\033[32m[ create-token ]\033[0m\n"
	printf "\033[35mGet Token\t\t\033[32m[ get-token ]\033[0m\n"
	printf "\033[35mUpdate Token\t\t\033[32m[ update-token ]\033[0m\n"
	printf "\033[35mDelete Token\t\t\033[32m[ delete-token ]\033[0m\n"
}

help_menu(){
	printf "\033[36mCLI API Tester\033[0m\n"
	printf "\033[35mAction\t[ --action={COMMAND}, action:{COMMAND} ]\033[0m\n"
	printf "\033[35mToken\t[ --token={TOKEN}, token:{TOKEN} ]\033[0m\n"
	printf "\n"
	commands
	printf "\n"
	usage
	exit 0
}
