import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
	// debugger;
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk, reduxImmutableStateInvariant())
	);
}