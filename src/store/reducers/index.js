import { combineReducers } from 'redux';

import categoryReducer from './category';
import itemsReducer from './items';

export default combineReducers({
    category: categoryReducer,
    item: itemsReducer
});
