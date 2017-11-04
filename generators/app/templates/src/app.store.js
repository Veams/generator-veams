import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import {composeWithDevTools} from 'redux-devtools-extension';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {routerReducer, routerMiddleware} from 'react-router-redux';

/**
 * Global Stuff
 */
const composeEnhancers = composeWithDevTools({
	// Specify here name, actionsBlacklist, actionsCreators and other options if needed
});

/**
 * Initial State
 */
const INITIAL_STATE = {
	// i18n: I18N_INITIAL_STATE,
	// ui: UI_INITIAL_STATE,
	router: '/'
};

/**
 * Epics (Async)
 */
export const ROOT_EPIC = combineEpics(
	// i18nFetchEpic
);

/**
 * Reducer
 */
const ROOT_REDUCER = combineReducers({
	// i18n: i18nReducer,
	// ui: uiReducer,
	router: routerReducer
});

/**
 * Store creation
 */
let store = createStore(
	ROOT_REDUCER,
	INITIAL_STATE,
	composeEnhancers(
		applyMiddleware(
			reduxImmutableStateInvariant(),
			createEpicMiddleware(ROOT_EPIC)
		)
	)
);

export default store;
