import React, {useContext} from 'react';

import { UserContext } from '../../context/UserContext';

function Account() {
	// const {userData, setUserData} = useContext(UserContext);

	return (
        <div>{userData}</div>
	);
}

export default Account;