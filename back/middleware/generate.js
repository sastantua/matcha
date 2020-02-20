import faker from 'faker/locale/fr';
import { retriveGenders, setGender } from '../models/gender';
import { retriveOrientations, setOrientation } from '../models/orientation';
import { retriveHobbies, setHobbies } from '../models/hobby';

import 'dotenv/config';
import { registerUser, savePicture, setLocation } from '../models/user';
import uuidv1 from 'uuid/v1';
import consola from 'consola';

export const generateUsers = async () => {
	const genders = await retriveGenders();
	const orientations = await retriveOrientations();
	const hobbies = await retriveHobbies();
	for (let i = 0; i < 50; i++) {
		let firstname = faker.name.firstName();
		let lastname = faker.name.lastName();

		let user = {
			main: {
				_id: uuidv1(),
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
		if (!user.other.orientation || !user.other.hobbies || !user.other.gender) continue;
		await registerUser(user.main);
		await setGender(user.main, user.other.gender);
		await setOrientation(user.main, user.other.orientation);
		await setHobbies(user.main, [user.other.hobbies]);
		await savePicture(user.main, user.other.picture.url, user.other.picture.name);
		await setLocation(user.main, user.other.location);
		consola.info(`Generated ${i + 1} users`);
	}
}

generateUsers();