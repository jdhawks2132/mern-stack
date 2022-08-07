require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const workoutRoutes = require('./routes/workouts');

// middleware
app.use(express.json());

// cors
app.use(
	cors({ origin: 'https://62efe7ae45349f367639b5c0--workout-mern.netlify.app' })
);

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db

mongoose
	.connect(process.env.MONG_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('connected to db & listening on port 4000!');
		});
	})
	.catch((err) => {
		console.log(err);
	});
