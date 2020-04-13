export const colors = {
	pink: '#EFB1FF',
	purple: '#481380',
	lightpink: '#FFE2FF',
	lightpurple: '#7F78D2',
}

const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '2560px'
}

export const device = {
	mobileS: `(min-width: ${size.mobileS})`,
	mobileM: `(min-width: ${size.mobileM})`,
	mobileL: `(min-width: ${size.mobileL})`,
	tablet: `(min-width: ${size.tablet})`,
	laptop: `(min-width: ${size.laptop})`,
	laptopL: `(min-width: ${size.laptopL})`,
	desktop: `(min-width: ${size.desktop})`,
	desktopL: `(min-width: ${size.desktop})`
};

export const SPACING = {
	XS: '10px',
	SM: '15px',
	BASE: '20px',
	MD: '30px',
	LG: '50px',
	XL: '100px'
}

export const BREAK_POINTS = {
	SCREEN_XS: '512px',
	SCREEN_SM: '850px',
	SCREEN_MD: '1080px',
	SCREEN_LG: '1280px',
	SCREEN_XL: '1440px',
	SCREEN_XXL: '1600px'
};