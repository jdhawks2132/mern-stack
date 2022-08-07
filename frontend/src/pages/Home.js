import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext();
	const BASE_URL = 'https://mern-workout-app.herokuapp.com/api/workouts';

	useEffect(() => {
		const fetchWorkouts = async () => {
			const res = await fetch(BASE_URL);
			const data = await res.json();
			if (res.ok) {
				dispatch({ type: 'SET_WORKOUTS', payload: data });
			}
		};
		fetchWorkouts();
	}, [dispatch]);

	const workoutList = workouts?.map((workout) => (
		<WorkoutDetails key={workout._id} workout={workout} />
	));

	return (
		<div className='home'>
			<div className='workouts'>{workouts && workoutList}</div>
			<WorkoutForm />
		</div>
	);
};

export default Home;
