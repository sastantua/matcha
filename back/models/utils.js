import uuidv1 from 'uuid/v1';
import consola from 'consola';

import { retriveGenders, initGenders } from './gender';
import { retriveHobbies, initHobbies } from './hobby';
import { retriveOrientations, initOrientations } from './orientation';
import { toBirthdate } from './match';

export const isEmpty = (obj) => {
	for (var key in obj) {
		if (obj[key] !== null && obj[key] != "") return false;
	}
    return true;
}

export const generateGenders = async () => {
	const genders = [
		{ _id: uuidv1(), name: 'male' },
		{ _id: uuidv1(), name: 'female' },
	]
	const dbGenders =  await retriveGenders();
	
	if (!dbGenders.length) {
		initGenders(genders);
		consola.success("Generated Genders");
	} else {
		consola.info("Genders already generated")
	}
}

export const generateHobbies = async () => {
	const hobbies = [
		{ _id: uuidv1(), name: 'bio' },
		{ _id: uuidv1(), name: 'geek' },
		{ _id: uuidv1(), name: 'piercing' },
		{ _id: uuidv1(), name: 'vegan' },
		{ _id: uuidv1(), name: 'PHP' }
	]
	const dbHobbies = await retriveHobbies();
	if (!dbHobbies.length) {
		initHobbies(hobbies);
		consola.success("Generated Hobbys");
	} else {
		consola.info("Hobbys already generated")
	}
}

export const generateOrientations = async () => {
	const orientations = [
		{ _id: uuidv1(), name: 'gay' },
		{ _id: uuidv1(), name: 'straight' },
		{ _id: uuidv1(), name: 'bisexual' }
	]
	const dbOrientations = await retriveOrientations();
	if (!dbOrientations.length) {
		initOrientations(orientations);
		consola.success("Generated Orientations");
	} else {
		consola.info("Orientations already generated")
	}
}

export const isEighteen = (birthdate) => {
	let now = new Date().toISOString().split('T')[0].split("-");
	now[0] = now[0]18;
	const legalDate = now.join('-');
	return new Date(birthdate) > new Date(legalDate) ? false : true;
}