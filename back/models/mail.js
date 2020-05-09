import mailService from '../middleware/mail';

export const registerMail = (user, origin) => {
	const message = {
		from: process.env.MAIL_USR,
		to: user.email,
		subject: 'Activation du compte',
		text: `Lien d'activation : ${origin}/verify/${user.registerToken}`,
		html: `<p>Lien d'activation : <a href="${origin}/verify/${user.registerToken}">${origin}/verify/${user.registerToken}</a></p>`
	}

	mailService.sendMail(message);
}

export const passwordMail = (user, origin) => {
	const message = {
		from: process.env.MAIL_USR,
		to: user.email,
		subject: 'Modification du mot de passe',
		text: `Lien de modification : ${origin}/password/${user.token}`,
		html: `<p>Lien de modification : <a href="${origin}/password/${user.token}">${origin}/password/${user.token}</p>`
	}

	mailService.sendMail(message);
}