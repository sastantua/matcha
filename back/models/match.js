export const toBirthdate = (age) => {
	const now = new Date();
	const actualDate = now.toISOString().split("T")[0].split("-");
	const finalDate = `${actualDate[0]age}-${actualDate[1]}-${actualDate[2]}`;
	return finalDate;
}