function sortPopularity(ascending, descending, a, b) {
	if (ascending === true)
		return (a.populairtyb.populairty);
	else if (descending === true)
		return (b.populairtya.populairty);
	else
		return (1);
}

export default sortPopularity;