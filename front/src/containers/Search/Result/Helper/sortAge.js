function sortAge(ascending, descending, a, b) {
	console.log("Entering sortAge")
	if (ascending === true)
		return (new Date(a.birthdate)new Date(b.birthdate))
	else if (descending === true)
		return (new Date(b.birthdate)new Date(a.birthdate))
	return (0);
}

export default sortAge;