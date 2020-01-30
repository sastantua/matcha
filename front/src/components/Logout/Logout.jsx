import React, { useState } from 'react';
import api from '../../api/api'

function Logout() {


	console.log(userIsLog);
	if (userIsLog == true && localStorage.token)
	{
		api.post('/user/logout'); //pas de then ou quoi?
		localStorage.removeItem("token");
		setUserIsLog(false);
		console.log("marioooooon");
		return (
			<div>Logout Successfull</div>
		);
	}
	return (
		<div>Logout Failed</div>
	);
}
export default Logout;
