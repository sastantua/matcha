function spin() {
	let btn = document.getElementsByClassName("App-btn");
	let logo = document.getElementsByClassName("App-logo");
	       
	if (!logo[0].style.animation)
	{
		btn[0].innerHTML = "😆";
		logo[0].style.animation = "App-logo-spin infinite 2s linear";
	}	
	else if (logo[0].style.animation == "2s linear 0s infinite normal none running App-logo-spin")
	{
		btn[0].innerHTML = "🤣";
		logo[0].style.animation = "App-logo-spin infinite 1s linear"; 
	}
	else if (logo[0].style.animation == "1s linear 0s infinite normal none running App-logo-spin")
	{
		btn[0].innerHTML = "😝";
		logo[0].style.animation = "App-logo-spin infinite 0.5s linear";
	}
	else if (logo[0].style.animation == "0.5s linear 0s infinite normal none running App-logo-spin")
	{
		btn[0].innerHTML = "🤪";
		logo[0].style.animation = "App-logo-spin infinite 0.3s linear";
	}
	else if (logo[0].style.animation == "0.3s linear 0s infinite normal none running App-logo-spin")
	{
		btn[0].innerHTML = "🤢";
		logo[0].style.animation = "App-logo-spin infinite 0.2s linear";
	}
	else if (logo[0].style.animation == "0.2s linear 0s infinite normal none running App-logo-spin")
	{
		btn[0].innerHTML = "🤮";
		logo[0].style.animation = "App-logo-spin infinite 0.15s linear";
	}
	else if (logo[0].style.animation == "0.15s linear 0s infinite normal none running App-logo-spin")
	{
		btn[0].innerHTML = "🤯";
		logo[0].style.animation = "App-logo-spin infinite 0.1s linear";
	}
	else if (logo[0].style.animation == "0.1s linear 0s infinite normal none running App-logo-spin")
	{
		btn[0].innerHTML = "😈";
		logo[0].style.animation = "App-logo-spin infinite 0.05s linear";
	}	
	else if (logo[0].style.animation == "0.05s linear 0s infinite normal none running App-logo-spin")
	{
		btn[0].innerHTML = "🤫";
		logo[0].style.animation = "App-logo-spin infinite 2s linear";
	}	
}

export default spin;