function sortAge(ascending, descending, a, b) {
	if (ascending === true)
		return (new Date(a.birthdate)new Date(b.birthdate))
	else if (descending === true)
		return (new Date(b.birthdate)new Date(a.birthdate))
	else
		return (1);
}

export default sortAge;