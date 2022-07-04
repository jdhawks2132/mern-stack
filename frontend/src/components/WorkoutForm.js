import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
	const { dispatch } = useWorkoutsContext();

	const [title, setTitle] = useState('');
	const [weight, setWeight] = useState('');
	const [sets, setSets] = useState('');
	const [reps, setReps] = useState('');
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(title, weight, sets, reps);
		const workout = {
			title,
			weight,
			sets,
			reps,
		};

		const response = await fetch('/api/workouts', {
			method: 'POST',
			body: JSON.stringify(workout),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
			setEmptyFields(json.emptyFields);
		} else {
			setTitle('');
			setWeight('');
			setSets('');
			setReps('');
			setError(null);
			setEmptyFields([]);
			dispatch({ type: 'CREATE_WORKOUT', payload: json });
		}
	};

	return (
		<form className='create' onSubmit={handleSubmit}>
			<h3>Add a New Workout</h3>
			<label>
				Exercise Title:
				<input
					className={emptyFields.includes('title') ? 'error' : ''}
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</label>
			<label>
				Weight:
				<input
					className={emptyFields.includes('weight') ? 'error' : ''}
					type='number'
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
				/>
			</label>
			<label>
				Sets:
				<input
					className={emptyFields.includes('sets') ? 'error' : ''}
					type='number'
					value={sets}
					onChange={(e) => setSets(e.target.value)}
				/>
			</label>
			<label>
				Reps:
				<input
					className={emptyFields.includes('reps') ? 'error' : ''}
					type='number'
					value={reps}
					onChange={(e) => setReps(e.target.value)}
				/>
			</label>
			<button className='btn'>Submit</button>
			{error && <div className='error'>{error}</div>}
		</form>
	);
};

export default WorkoutForm;
