require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const PORT = process.env.PORT;

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));
const morganCustomFunction = (tokens, req, res) => {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, "content-length"),
		"-",
		tokens["response-time"](req, res),
		"ms",
		tokens.body(req, res),
	].join(" ");
};
app.use(morgan(morganCustomFunction));

app.get("/api/persons", (req, res, next) => {
	Person.find({})
		.then((result) => {
			res.json(result);
		})
		.catch((e) => {
			next(e);
		});
});

app.get("/api/persons/:id", (req, res, next) => {
	const paramId = Number(req.params.id);
	Person.findById(req.params.id)
		.then((result) => {
			if (result) res.json(result);
			else res.status(404).end();
		})
		.catch((e) => {
			next(e);
		});
	//const person = persons.find((p) => p.id === paramId);
	//if (person) res.json(person).end();
});

app.get("/info", (req, res, next) => {
	res.setHeader("Content-Type", "text/html");
	const time = new Date();
	console.log(time.toUTCString());
	Person.countDocuments({})
		.then((result) => {
			res.send(
				`<p>Phonebook has info for ${result} people</p><p>${time}</p>`
			);
		})
		.catch((e) => {
			next(e);
		});
});

app.delete("/api/persons/:id", (req, res, next) => {
	/*
	const paramId = Number(req.params.id);
	for (let i = 0; i < persons.length; i++) {
		if (persons[i].id === paramId) {
			persons.splice(i, 1);
			res.json(persons).end();
			return;
		}
	}
	res.sendStatus(404).end();
	*/
	Person.findByIdAndRemove(req.params.id)
		.then((result) => {
			if (result) res.status(204).end();
			else res.status(400).end();
		})
		.catch((e) => {
			next(e);
		});
});

const generateId = (iter = 0) => {
	if (iter > 10) return -1;
	let newId = Math.floor(Math.random() * 1000000000);
	const person = persons.find((p) => p.id === newId);
	if (person) newId = generateId(iter + 1);
	return newId;
};

const checkNewPerson = (person) => {
	if (!person.name) return "Name undefined";
	if (!person.number) return "Number undefined";
	const existing = persons.find((p) => person.name === p.name);
	if (existing) return "Name already in phonebook";
	return null;
};

app.post("/api/persons", (req, res, next) => {
	const body = req.body;
	/*
	//Previous errorhandling, now mongoose does it
	const error = checkNewPerson(body);
	if (error) {
		res.status(403).json({ error: error }).end();
		return;
	}
	newPerson.id = generateId();
	if (newPerson.id === -1) {
		res.status(500).end();
		return;
	} else {
		persons.push(newPerson);
		res.status(200).send({ id: body.id });
	}
	*/
	const person = new Person({
		name: body.name,
		number: body.number,
	});
	person
		.save()
		.then((result) => {
			console.log(`${body.name} saved to mongodb`);
			res.json({ id: result.id });
		})
		.catch((e) => {
			next(e);
		});
});

app.put("/api/persons/:id", (req, res, next) => {
	const body = req.body;
	const newPerson = {
		name: body.name,
		number: body.number,
	};
	Person.findByIdAndUpdate(req.params.id, newPerson, { new: true })
		.then((result) => {
			res.json(result);
		})
		.catch((e) => {
			next(e);
		});
});

const unknownEndpoint = (req, res, next) => {
	res.status(404).send({ error: "unknown endpoint" });
	next();
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
	console.log(error.message);
	if (error.name === "CastError")
		return res.status(400).send({ error: "malformatted id" });
	else if (error.name === "ValidationError") {
		return res.status(400).send({ error: error.message });
	}
	next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Listening at port ${PORT}`);
});
