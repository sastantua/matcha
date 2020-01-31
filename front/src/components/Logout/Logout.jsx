import React, { useState } from 'react';
import api from '../../api/api'

function Logout() {
	// const [userIsLog, setUserIsLog] = useState();

	if (localStorage.token)
	{
		api.post('/user/logout'); //pas de then ou quoi?
		localStorage.removeItem("token");
		return (
			<div>Logout Successfull</div>
		);
	}
	return (
		<div>Logout Failed</div>
	);
}
export default Logout;
