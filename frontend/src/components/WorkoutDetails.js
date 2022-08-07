import React from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
	const BASE_URL = 'https://mern-workout-app.herokuapp.com/api/workouts';
	const { dispatch } = useWorkoutsContext();
	const handleClick = async () => {
		const res = await fetch(`${BASE_URL}/${workout._id}`, {
			method: 'DELETE',
		});
		const data = await res.json();
		if (res.ok) {
			dispatch({ type: 'DELETE_WORKOUT', payload: data });
		}
	};
	return (
		<div className='workout-details'>
			<h4>{workout.title}</h4>
			<p>
				<strong>Weight: </strong>
				{workout.weight}
			</p>
			<p>
				<strong>Sets: </strong>
				{workout.sets}
			</p>
			<p>
				<strong>Reps: </strong>
				{workout.reps}
			</p>
			<p>
				<strong>Date: </strong>
				{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
			</p>
			<span className='material-symbols-outlined' onClick={handleClick}>
				Delete
			</span>
		</div>
	);
};

export default WorkoutDetails;
