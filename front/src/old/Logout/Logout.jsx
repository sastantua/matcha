import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import api from '../../api/api'

function Logout() {
	// const [userIsLog, setUserIsLog] = useState();
	const history = useHistory();
	history.push("/login");

	if (localStorage.token)
	{
		api.post('/user/logout')
		.then(localStorage.removeItem("token"))
		.catch((err) => console.log(`${err.response.data.message}`));
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
