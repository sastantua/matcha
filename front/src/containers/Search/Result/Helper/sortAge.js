import findAge from './findAge'

function sortAge(userArray) {
	let i = 0;
	let tmp = null;

	while (i < userArray.length) 
	{

		if (findAge(userArray[i].birthdate) < findAge(userArray[i + 1].birthdate))
		{
			tmp = userArray[i].age;
			userArray[i].age = userArray[i + 1].age;
			userArray[i + 1].age = tmp;
			i = 0;
		}
		i++;
	}
	return (userArray)
}

export default sortAge;