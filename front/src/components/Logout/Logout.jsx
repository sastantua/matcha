import React, { useState } from 'react';
import api from '../../api/api'

function Logout() {
	const [userIsLog, setUserIsLog] = useState();

	console.log(`is user log ? ${userIsLog}`);
	if (userIsLog == true && localStorage.token)
	{
		api.post('/user/logout'); //pas de then ou quoi?
		localStorage.removeItem("token");
		setUserIsLog(false);
		return (
			<div>Logout Successfull</div>
		);
	}
	return (
		<div>Logout Failed</div>
	);
}
export default Logout;
