function sortProximity(userPosition, ascending, descending, a, b) {
	let latDiff_A = userPosition.latitudea.location.lat;
	let lngDiff_A = userPosition.longitudea.location.lng;
	let latDiff_B = userPosition.latitudeb.location.lat;
	let lngDiff_B = userPosition.longitudeb.location.lng;

	let scoreA = latDiff_A + lngDiff_A;
	let scoreB = latDiff_B + lngDiff_B;

	if (ascending === true)
		return (scoreAscoreB);
	else
		return (scoreBscoreA);
}

export default sortProximity;