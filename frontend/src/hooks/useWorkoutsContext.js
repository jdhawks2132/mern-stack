import { WorkoutsContext } from '../context/WorkoutsContex';
import { useContext } from 'react';

export const useWorkoutsContext = () => {
	const context = useContext(WorkoutsContext);

	if (!context) {
		throw new Error('useWorkoutsContext must be used within a WorkoutsContextProvider');
	}

	return context;
};
