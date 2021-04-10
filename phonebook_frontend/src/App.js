import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import backEnd from "./backend";
import Notification from "./Notification";

const Number = (props) => {
	const { person, pattern, deleteNumber } = props;
	if (!pattern.test(person.name)) return "";
	return (
		<p>
			{person.name} {person.number}{" "}
			<button onClick={() => deleteNumber(person)}>delete</button>
		</p>
	);
};

const Numbers = (props) => {
	const { persons, filter, deleteNumber } = props;
	const pattern = RegExp("(^.* |^)" + filter, "i");
	if (!persons) return null;
	if (persons.length === 0) {
		return "";
	}
	return (
		<>
			{persons.map((person, i) => {
				return (
					<Number
						pattern={pattern}
						key={person.id}
						person={person}
						deleteNumber={(arg) => deleteNumber(arg)}
					/>
				);
			})}
		</>
	);
};

const Form = (props) => {
	//console.log(props);
	const {
		handleSubmit,
		setNewName,
		setNewNumber,
		newName,
		newNumber,
	} = props;
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					name:{" "}
					<input
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
					/>
				</div>
				<div>
					number:{" "}
					<input
						value={newNumber}
						onChange={(e) => setNewNumber(e.target.value)}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</>
	);
};

const Filter = (props) => {
	const { filter, setFilter } = props;
	return (
		<>
			<div>filter shown with </div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					value={filter}
					onChange={(e) => {
						setFilter(e.target.value);
					}}
				></input>
			</form>
		</>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [notification, setNotification] = useState(null);
	const [useError, setUseError] = useState(false);

	const getDataHook = () => {
		axios
			.get(backEnd.baseURL)
			.then((res) => {
				setPersons(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	useEffect(getDataHook, []);

	const updateNumber = (person) => {
		if (
			!window.confirm(
				`${person.name} is already added to phonebook, replace the old number with new one?`
			)
		)
			return;
		const newObject = { ...person, number: newNumber };
		backEnd.updateNumber(newObject).then((result) => {
			console.log(result);
			const newPersons = [...persons];
			const currentPerson = newPersons.find((p) => p.id === person.id);
			currentPerson.number = newObject.number;
			setPersons(newPersons);
			setNotification(`Number of ${currentPerson.name} updated`);
			setTimeout(() => {
				setNotification(null);
			}, 4000);
		});
	};

	const addNumber = () => {
		const findMaxId = () => {
			let biggest = 0;
			persons.forEach((person) => {
				if (person.id > biggest) biggest = person.id;
			});
			return biggest;
		};
		const newPerson = {
			name: newName,
			number: newNumber,
			id: findMaxId() + 1,
		};
		backEnd
			.addNumber(newPerson)
			.then(() => {
				setPersons(persons.concat(newPerson));
				setNotification(`${newPerson.name} added`);
				setTimeout(() => {
					setNotification(null);
				}, 6000);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!newNumber || !newName) {
			console.log("Fill both fields");
			return;
		}
		if (!/[0-9\s+-]+/.test(newNumber)) {
			console.log("Not a valid number");
			return;
		}
		const checkName = persons.find((person) => {
			return person.name === newName;
		});
		if (checkName) updateNumber(checkName);
		else addNumber();
		setNewName("");
		setNewNumber("");
	};

	const deleteNumber = (person) => {
		if (window.confirm(`Delete ${person.name}?`) === false) return;
		backEnd
			.deleteNumber(person)
			.then((result) => console.log(result))
			.catch((e) => {
				console.log(e);
				setUseError(true);
				setNotification(
					`Information of ${person.name} has already removed from the server`
				);
				setTimeout(() => {
					setNotification(null);
					setUseError(false);
				}, 5000);
			});
		const newPersons = persons.filter((p) => {
			return p.id !== person.id;
		});
		setPersons(newPersons);
	};
	return (
		<div>
			<h2>Phonebook</h2>
			<Notification notification={notification} error={useError} />
			<Filter
				filter={filter}
				setFilter={(arg) => {
					setFilter(arg);
				}}
			/>
			<h3>Add a new</h3>
			<Form
				setNewNumber={(arg) => setNewNumber(arg)}
				setNewName={(arg) => setNewName(arg)}
				newName={newName}
				newNumber={newNumber}
				handleSubmit={(e) => handleSubmit(e)}
			/>
			<h3>Numbers</h3>
			<Numbers
				persons={persons}
				filter={filter}
				deleteNumber={(arg) => {
					deleteNumber(arg);
				}}
			/>
		</div>
	);
};

export default App;
