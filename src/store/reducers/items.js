import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
    ADD_ITEM,
    DELETE_ITEM,
    CLEAR_ITEM,
    DELETE_CATEGORY_ITEM
} from '../types';

const initialState = {
    items: {}
};

const persistConfig = {
    storage,
    key: 'todoitem',
    whitelist: ['items']
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                items: {
                    ...state.items,
                    [action.payload.category] : action.payload.items
                }
            };
        case DELETE_ITEM:
            return {
                items: {
                    ...state.items,
                    [action.payload.category]: state.items[action.payload.category].filter(item => item !== action.payload.deleteItem)
                }
            };
        case DELETE_CATEGORY_ITEM:
            return {
                items: {
                    ...state.items
                }
            }
        case CLEAR_ITEM:
            return {
                items: {}
            };
        default:
            return state;
    }
};

export default persistReducer(persistConfig, reducer);
