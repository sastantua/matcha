import mailService from '../middleware/mail';

export const registerMail = (user) => {
	const message = {
		from: process.env.MAIL_USR,
		to: user.email,
		subject: 'Activation du compte',
		text: `Lien d'activation : ${user.registerToken}`,
		html: `<p>Lien d'activation : ${user.registerToken}</p>`
	}

	mailService.sendMail(message);
}