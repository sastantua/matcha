function sortAge(ascending, descending, a, b) {
	if (ascending === true)
		return (new Date(b.birthdate)new Date(a.birthdate))
	else if (descending === true)
		return (new Date(a.birthdate)new Date(b.birthdate))
	return (0);
}

export default sortAge;