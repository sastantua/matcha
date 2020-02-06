import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import api from '../../api/api'

function Logout() {
	// const [userIsLog, setUserIsLog] = useState();
	const history = useHistory();
	history.push("/login");

	if (localStorage.token)
	{
		api.post('/user/logout'); //pas de then ou quoi?
		localStorage.removeItem("token");
		return (
			<div>Logout Successfull</div>
		);
	}
	else
		return (
			<div>Logout Failed</div>
		);
}
export default Logout;
