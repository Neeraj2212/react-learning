import { createStore } from 'redux';
import { initialState, Reducer } from './reducer';

export const ConfigureStore = () => {
	const store = createStore(
		Reducer, // reducer
		initialState // our initialState
	);

	return store;
};
