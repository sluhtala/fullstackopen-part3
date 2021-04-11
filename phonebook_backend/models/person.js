const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("connected to mongodb");
	})
	.catch((e) => {
		console.log("error connecting to mongodb");
	});

const personSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, minlength: 3 },
	number: {
		type: String,
		required: true,
		validate: {
			validator: (number) => {
				const onlyDigits = number.replace(/[-+\(\) ]/g, "");
				return onlyDigits.length >= 8;
			},
			message: "Number must have at least 8 digits",
		},
	},
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Person", personSchema);
