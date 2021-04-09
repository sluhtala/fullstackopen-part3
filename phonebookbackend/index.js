const express = require("express");
const app = express();
const morgan = require("morgan");

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

const PORT = 3001;

const persons = [
	{
		name: "Arto Hellas",
		number: "040-123456",
		id: 1,
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: 2,
	},
	{
		name: "Dan Abramov",
		number: "12-43-234345",
		id: 3,
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: 4,
	},
];

app.get("/api/persons", (req, res) => {
	res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
	console.log(req.params.id);
	const paramId = Number(req.params.id);
	const person = persons.find((p) => p.id === paramId);
	if (person) res.json(person).end();
	res.sendStatus(404).end();
});

app.get("/info", (req, res) => {
	res.setHeader("Content-Type", "text/html");
	const time = new Date();
	console.log(time.toUTCString());
	res.send(
		`<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`
	);
});

app.delete("/api/persons/:id", (req, res) => {
	const paramId = Number(req.params.id);
	for (let i = 0; i < persons.length; i++) {
		if (persons[i].id === paramId) {
			persons.splice(i, 1);
			res.json(persons).end();
			return;
		}
	}
	res.sendStatus(404).end();
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

app.post("/api/persons", (req, res) => {
	const newPerson = req.body;
	const error = checkNewPerson(newPerson);
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
		res.sendStatus(200);
	}
});

const unknownEndpoint = (req, res, next) => {
	res.status(404).send({ error: "unknown endpoint" });
	next();
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
	console.log(`Listening at port ${PORT}`);
});
