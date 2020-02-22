import faker from 'faker/locale/fr';
import { retriveGenders, setGender, getGender } from '../models/gender';
import { retriveOrientations, setOrientation } from '../models/orientation';
import { retriveHobbies, setHobbies } from '../models/hobby';

import 'dotenv/config';
import { registerUser, savePicture, setLocation, editUser } from '../models/user';
import uuidv1 from 'uuid/v1';
import consola from 'consola';

export const newUser = async () => {
	const genders = await retriveGenders();
	const orientations = await retriveOrientations();
	const hobbies = await retriveHobbies();

	let firstname = faker.name.firstName();
	let lastname = faker.name.lastName();

	const user = {
		main: {
			firstname: firstname,
			lastname: lastname,
			username: faker.internet.userName(firstname, lastname),
			email: faker.internet.email(firstname, lastname),
			password: faker.internet.password(),
			birthdate: faker.date.past(30).toISOString().split('T')[0],
			biography: faker.lorem.paragraph()
		},
		other: {
			gender: genders[Math.floor(Math.random() * genders.length)]._id,
			orientation: orientations[Math.floor(Math.random() * orientations.length)]._id,
			hobbies: hobbies[Math.floor(Math.random() * hobbies.length)]._id,
			picture: {
				url: faker.image.avatar(),
				name: faker.system.fileName("jpg")
			},
			location: {
				lat: faker.address.latitude(),
				lng: faker.address.longitude(),
			}
		}
	}
	return user;
}

const toDb = async (user) => {
	user.main._id = await registerUser(user.main);
	console.log(user.main._id);
	await editUser({_id: user.main._id, birthdate: user.main.birthdate, biography: user.main.biography});
	await setGender(user.main, user.other.gender);
	await setOrientation(user.main, user.other.orientation);
	await setHobbies(user.main, [user.other.hobbies]);
	await savePicture(user.main, user.other.picture.url, user.other.picture.name);
	await setLocation(user.main, user.other.location);
}

const generate = async (amount) => {
	for (let i = 0; i < amount; i++) {
		await toDb(await newUser());
		consola.info(`Generated ${i + 1} users`);
	}
}

generate(50);