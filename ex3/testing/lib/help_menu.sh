usage(){
	printf "\033[36mUSAGE:\033[0m\n"
	printf "\033[35m$0 \033[32m--action=load\033[0m\n"
	printf "\033[35m$0 \033[32m--action=create-token\033[0m \033[33m--email=myemail@email.com  --password=thisIsAPassword\033[0m\n"
	printf "\033[35m$0 \033[32m--action=get \033[33m--email=myemail@email.com\033[0m \033[33m--token=9zy66v8ktl40fe7qv5f\033[0m\n"
	printf "\033[35m$0 \033[32m--action=get-token \033[33m--email=myemail@email.com\033[0m \033[33m--token=9zy66v8ktl40fe7qv5f\033[0m\n"
	printf "\033[35m$0 \033[32m--action=update-token \033[33m--email=myemail@email.com\033[0m \033[33m--token=9zy66v8ktl40fe7qv5f\033[0m\n"
	printf "\033[35m$0 \033[32m--action=create-cart \033[33m--email=myemail@email.com\033[0m \033[33m--token=9zy66v8ktl40fe7qv5f\033[0m\n"
	printf "\033[35m$0 \033[32m--action=update-cart \033[33m--email=myemail@email.com\033[0m \033[33m--token=9zy66v8ktl40fe7qv5f\033[0m \033[32m--item=1 --count=2\033[0m\n"

}

commands(){
	printf "\033[36mUSER COMMANDS:\033[36m\n"
	printf "\033[35mPost Data\t\t\033[32m[ load, insert, post ]\033[0m\n"
	printf "\033[35mGet Data\t\t\033[32m[ get, fetch ]\033[0m\n"
	printf "\033[35mPut Data\t\t\033[32m[ put, modify ]\033[0m\n"
	printf "\033[35mDelete Data\t\t\033[32m[ delete, remove ]\033[0m\n"
	printf "\n\033[36mTOKEN ACTIONS:\033[0m\n"
	printf "\033[35mCreate Token Data\t\033[32m[ create-token, cT ]\033[0m\n"
	printf "\033[35mGet Token\t\t\033[32m[ get-token, gT ]\033[0m\n"
	printf "\033[35mUpdate Token\t\t\033[32m[ update-token, uT ]\033[0m\n"
	printf "\033[35mDelete Token\t\t\033[32m[ delete-token, dT ]\033[0m\n"
	printf "\n\033[36mMENU ACTIONS:\033[0m\n"
	printf "\033[35mView Menu Items\t\t\033[32m[ view-menu,vM ]\033[0m\n"
	printf "\n\033[36mCART ACTIONS:\033[0m\n"
	printf "\033[35mCreate Cart\t\t\033[32m[ create-cart, cC ]\033[0m\n"
	printf "\033[35mUpdate Cart\t\t\033[32m[ update-cart, uC ]\033[0m\n"
	printf "\033[35mView Cart\t\t\033[32m[ view-cart, vC ]\033[0m\n"
}

help_menu(){
	printf "\033[96mCLI API Tester - Command Line Interface Application Programming Interface Tester\033[0m\n"
	printf "\033[36mSTANDARD PARAMETERS\033[0\n"
	printf "\033[35mAction\t\t\t\033[32m[ --action={COMMAND}, action:{COMMAND} ]\033[0m\n"
	printf "\033[35mToken\t\t\t\033[32m[ --token={TOKEN}, token:{TOKEN} ]\033[0m\n"
	printf "\033[35mEmail\t\t\t\033[32m[ --email={EMAIL_ADDRESS}, email:{EMAIL_ADDRESS} ]\033[0m\n"
	printf "\033[35mPassword\t\t\t\033[32m[ --password={EXTRA_DATA}, email:{EXTRA_DATA} ]\033[0m\n"
	printf "\033[35mItem ID\t\t\033[32m[ --password={EXTRA_DATA}, email:{EXTRA_DATA} ]\033[0m\n"
	printf "\033[35mItem Count\t\t\t\033[32m[ --password={EXTRA_DATA}, email:{EXTRA_DATA} ]\033[0m\n"
	printf "\n"
	commands
	printf "\n"
	usage
	exit 0
}
