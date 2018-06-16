import { combineReducers } from 'redux';
import posts from './posts';
import regions from './regions';
import search from './search';
import sortView from './sortView';

const rootReducers = combineReducers({
    posts,
    regions,
    search,
    sortView,
});

export default rootReducers;