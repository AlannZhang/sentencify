import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Albums from './reducers/albums';
import Artists from './reducers/artists';
import Playlists from './reducers/playlists';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    albums: Albums,
    artists: Artists,
    playlist: Playlists,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;