import faker from 'faker';
import { retriveGenders, setGender} from '../models/gender';
import { retriveOrientations, setOrientation } from '../models/orientation';
import { retriveHobbies, setHobbies } from '../models/hobby';

import 'dotenv/config';
import { registerUser, savePicture, setLocation, editUser } from '../models/user';
import consola from 'consola';

export const newUser = async () => {
	const genders = await retriveGenders();
	const orientations = await retriveOrientations();
	const hobbies = await retriveHobbies();

	let gender = genders[Math.floor(Math.random() * genders.length)]
	let firstname = faker.name.firstName(gender.name === 'male' ? 0 : 1);
	let lastname = faker.name.lastName(gender.name === 'male' ? 0 : 1);

	const user = {
		main: {
			_id: undefined,
			firstname: firstname,
			lastname: lastname,
			username: faker.internet.userName(firstname, lastname),
			email: faker.internet.email(firstname, lastname),
			password: faker.internet.password(),
			birthdate: faker.date.past(30).toISOString().split('T')[0],
			biography: faker.lorem.paragraph(),
		},
		other: {
			gender: gender._id,
			orientation: orientations[Math.floor(Math.random() * orientations.length)]._id,
			hobbies: [
				hobbies[Math.floor(Math.random() * hobbies.length)]._id,
				hobbies[Math.floor(Math.random() * hobbies.length)]._id,
				hobbies[Math.floor(Math.random() * hobbies.length)]._id,
				hobbies[Math.floor(Math.random() * hobbies.length)]._id
			],
			pictures: [
				{ url: faker.image.avatar(), name: faker.system.fileName("jpg") },
				{ url: faker.image.avatar(), name: faker.system.fileName("jpg") },
				{ url: faker.image.avatar(), name: faker.system.fileName("jpg") },
				{ url: faker.image.avatar(), name: faker.system.fileName("jpg") },
				{ url: faker.image.avatar(), name: faker.system.fileName("jpg") }
			],
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
	await editNewUser(user);
}

const editNewUser = async (user) => {
	await setGender(user.main, user.other.gender);
	await setGender(user.main, user.other.gender);
	await setOrientation(user.main, user.other.orientation);
	await setHobbies(user.main, user.other.hobbies);
	for (let picture of user.other.pictures){
		await savePicture(user.main, picture.url, picture.name);
	}
	await setLocation(user.main, user.other.location);
	await editUser({"_id": user.main._id, birthdate: user.main.birthdate, biography: user.main.biography});
}

const generate = async (amount) => {
	for (let i = 0; i < amount; i++) {
		const user = await newUser()
		await toDb(user);
		consola.info(`Generated ${i + 1} users`);
	}
}

generate(50);