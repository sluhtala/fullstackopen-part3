const mongoose = require("mongoose");

const password = process.argv[2];
const url = `mongodb+srv://sluhtala:${password}@cluster0.6ernc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const usage = `Usage: node ${__filename.slice(
	__dirname.length + 1
)} <password (<name> <number>)>`;
if (process.argv.length !== 3 || process.argv.length !== 5) {
	console.log(usage);
	process.exit();
}

mongoose.connect(
	url,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	(e) => {
		if (e) {
			console.log(e);
			mongoose.disconnect();
			console.log("error exiting");
			process.exit(1);
		}
	}
);

const personScema = new mongoose.Schema({
	name: String,
	number: String,
	id: Number,
});

const Person = mongoose.model("Persons", personScema);

const person = new Person({
	name: process.argv[3],
	number: process.argv[4],
	id: Math.floor(Math.random() * 100000000),
});

if (process.argv.length === 3) {
	Person.find({}).then((result) => {
		console.log("phonebook:");
		result.forEach((p) => {
			console.log(`${p.name} ${p.number}`);
		});
		mongoose.connection.close();
	});
} else {
	person
		.save()
		.then((result) => {
			console.log(
				`added ${person.name} number ${person.number} to phonebook`
			);
			mongoose.connection.close();
		})
		.catch((e) => {
			console.log(e);
			mongoose.disconnect();
		});
}
