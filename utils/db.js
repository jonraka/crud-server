const mongoose = require("mongoose");
const db = mongoose.connection;//.useDb("codeacad-final");

db.on('connecting', () => {
	console.log('connecting to MongoDB...');
});

db.on('error', (error) => {
	console.error('Error in MongoDb connection: ' + error);
	mongoose.disconnect();
});

db.on('connected', () => {
	console.log('MongoDB connected!');
});

db.once('open', () => {
	console.log('MongoDB connection opened!');
});

db.on('reconnected',  () => {
	console.log('MongoDB reconnected!');
});

db.on('disconnected', () => {
	console.log('MongoDB disconnected!');
	setTimeout(() => {
		mongoose.connect(process.env.MONGODB_URI);
	}, 10000);
});

mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose,
    db
}