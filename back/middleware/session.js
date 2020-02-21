import neo4j from 'neo4j-driver';

export const mode = {READ: neo4j.session.READ, WRITE: neo4j.session.WRITE};

export const session = (mode = mode.READ) => {
	const driver = neo4j.driver(process.env.DB_URL, neo4j.auth.basic(process.env.DB_USR, process.env.DB_PWD));
	const session = driver.session({defaultAccessMode: mode});

	return {driver, session};
}

export const closeBridge = async (bridge) => {
	bridge.session.close();
	await bridge.driver.close();
}