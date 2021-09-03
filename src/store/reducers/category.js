import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
    ADD_CATEGORY,
    DELETE_CATEGORY,
    CLEAR_CATEGORY,
} from '../types';

const initialState = {
    categories: [],
};

const persistConfig = {
    storage,
    key: 'todocategory',
    whitelist: ['categories']
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            return {
                categories: [...state.categories, action.payload]
            };
        case DELETE_CATEGORY:
            return {
                categories: state.categories.filter(item => item !== action.payload)
            };
        case CLEAR_CATEGORY:
            return {
                category: []
            };
        default:
            return state;
    }
};

export default persistReducer(persistConfig, reducer);
