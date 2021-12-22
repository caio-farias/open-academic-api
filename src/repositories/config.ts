const user = `${process.env.MONGO_USER || 'app-user'}`;
const password = `${process.env.MONGO_PASSWORD || 'app-pass'}`;
const dbName = `${process.env.MONGO_PASSWORD || 'open-academic-db'}`;
const dbHost = `${process.env.MONGO_HOST || 'localhost'}`;
const dbURI = `mongodb://${user}:${password}@${dbHost}:27017/${dbName}`;

export default dbURI;
