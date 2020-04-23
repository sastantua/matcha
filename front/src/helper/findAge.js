function findAge(birthdate) {
	let age = null;
	let year = birthdate.split("-")[0];
	let month = birthdate.split("-")[1];
	let day = birthdate.split("-")[2];
	let today = new Date();
	let birth = new Date(year, month, day);
	today = today.getTime();
	birth = birth.getTime();
	age = Math.round(((((((((todaybirth) / 1000) / 60) / 60) / 24) / 7) / 4) / 12));
	return (age);
}

export default findAge;