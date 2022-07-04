const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
	try {
		const workouts = await Workout.find({}).sort({ createdAt: -1 });
		res.status(200).json(workouts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// get a single workout

const getWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ message: 'Invalid ID' });
	}

	try {
		const workout = await Workout.findById(id);
		res.status(200).json(workout);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// create a new workout

const createWorkout = async (req, res) => {
	const { title, reps, sets, weight } = req.body;

	let emptyFields = [];
	if (!title) {
		emptyFields.push('title');
	}
	if (!reps) {
		emptyFields.push('reps');
	}
	if (!sets) {
		emptyFields.push('sets');
	}
	if (!weight) {
		emptyFields.push('weight');
	}

	if (emptyFields.length > 0) {
		return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
	}

	// add doc to db
	try {
		const workout = await Workout.create({
			title,
			reps,
			sets,
			weight,
		});
		res.status(200).json(workout);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// delete the workout
const deleteWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ message: 'Invalid ID' });
	}

	try {
		const workout = await Workout.findByIdAndDelete(id);
		res.status(200).json(workout);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// update a workout

const updateWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ message: 'Invalid ID' });
	}

	try {
		const workout = await Workout.findByIdAndUpdate(id, {
			...req.body,
		});
		res.status(200).json(workout);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	getWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
